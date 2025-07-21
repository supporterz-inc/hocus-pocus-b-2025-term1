import 'dotenv/config';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Knowledge } from './core-domain/knowledge.model.js';
import { FileBasedKnowledgeRepository } from './repositories/file-based-knowledge.repository.js';
import { verifyIapJwt } from './services/jwt.service.js';
import { DetailPage } from './ux-domain/pages/DetailPage.js';
import { EditPage } from './ux-domain/pages/EditPage.js';
import { ListPage } from './ux-domain/pages/ListPage.js';
import { NewPage } from './ux-domain/pages/NewPage.js';
import { LoginPage } from './ux-domain/pages/LoginPage.js';

const app = new Hono();
// biome-ignore lint/complexity/useLiteralKeys: tsc の挙動と一貫性を保つため
const isDebug = process.env['NODE_ENV'] === 'development';
// biome-ignore lint/complexity/useLiteralKeys: tsc の挙動と一貫性を保つため
const iapAudience = process.env['IAP_AUDIENCE'];
// biome-ignore lint/complexity/useLiteralKeys: tsc の挙動と一貫性を保つため
const port = parseInt(process.env['PORT'] ?? '8080');

app.use('/index.css', serveStatic({ path: 'target/index.css' }));
app.use(trimTrailingSlash());
app.use('*', async (ctx, next) => {
  const iapJwt = ctx.req.header('X-Goog-IAP-JWT-Assertion');
  const isVerified = await verifyIapJwt(iapJwt!, iapAudience!);

  if (!isVerified && !isDebug) {
    throw new HTTPException(401, { message: 'IAP-JWT is Unauthorized :(' });
  }

  await next();
});

app.get('/login',async(c) => {
  return c.html(<LoginPage />);
});
app.post('/login',async(c)=>{
  const { mailAddress, password, action} = await c.req.parseBody();
  //console.log(action)
  //console.log(mailAddress);
  //console.log(password);
  if (!mailAddress) {
    throw new HTTPException(400, { message: 'Content is required' });
  }
  if (!password) {
    throw new HTTPException(400, { message: 'title is required' });
  }
  
  /*if(action === 'login'){

  }else{

  }*/
  return c.redirect('/')
});

// ナレッジ一覧
app.get('/', async (c) => {
  const knowledgeList = await FileBasedKnowledgeRepository.getAll();
  if (!knowledgeList) {
    return c.notFound();
  }
  return c.html(<ListPage knowledgeList={knowledgeList} />);
});

// 新規投稿ページ
app.get('/new', (c) => {
  return c.html(<NewPage />);
});

// 新規投稿処理
app.post('/new', async (c) => {
  const { content } = await c.req.parseBody();
  const { title } = await c.req.parseBody();

  if (!content) {
    throw new HTTPException(400, { message: 'Content is required' });
  }
  if (!title) {
    throw new HTTPException(400, { message: 'title is required' });
  }

  const newKnowledge = Knowledge.create(
    title.toString(),
    content.toString(),
    //authorどうやろうか？
    'test-author',
  );

  await FileBasedKnowledgeRepository.upsert(newKnowledge);
  return c.redirect('/');
});

// 詳細ページ
app.get('/knowledge/:id', async (c) => {
  const { id } = c.req.param();
  const knowledge = await FileBasedKnowledgeRepository.getById(id);
  if (!knowledge) {
    return c.notFound();
  }
  return c.html(<DetailPage knowledge={knowledge} />);
});

// 編集ページ
app.get('/knowledge/:id/edit', async (c) => {
  const { id } = c.req.param();
  const knowledge = await FileBasedKnowledgeRepository.getById(id);
  if (!knowledge) {
    return c.notFound();
  }
  return c.html(<EditPage knowledge={knowledge} />);
});

// 更新処理
app.post('/knowledge/:id/edit', async (c) => {
  const { id } = c.req.param();
  const { content } = await c.req.parseBody();

  if (!content) {
    throw new HTTPException(400, { message: 'Content is required' });
  }

  const knowledge = await FileBasedKnowledgeRepository.getById(id);
  if (!knowledge) {
    return c.notFound();
  }
  const updateknowledge = Knowledge.update(knowledge, content.toString());
  await FileBasedKnowledgeRepository.upsert(updateknowledge);
  return c.redirect(`/knowledge/${id}`);
});

// 削除処理
app.post('/knowledge/:id/delete', async (c) => {
  const { id } = c.req.param();
  await FileBasedKnowledgeRepository.deleteById(id);
  return c.redirect('/');
});

const server = serve({
  fetch: app.fetch,
  port,
});

function handleShutdown() {
  server.close(() => process.exit(0));

  setTimeout(() => {
    console.error('The process did not exit gracefully after 1,000 milli-seconds. Exiting forcefully X(');
    process.exit(1);
  }, 1000);
}

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

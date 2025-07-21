import type { FC } from 'hono/jsx';
import { Layout } from '../Layout.js';

// TODO: (学生向け) 適切な型定義に変更する
type Knowledge = {
  id: string;
  content: string;
  title: string;
};

export const ListPage: FC<{ knowledgeList: Knowledge[] }> = ({ knowledgeList }) => {
  return (
    <Layout>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">ナレッジ一覧</h1>
        <a class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" href="/new">
          新規投稿
        </a>
        <ul class="mt-4 space-y-2">
          {knowledgeList.map((knowledge) => (
            <li class="border p-2 rounded" key={knowledge.id}>
              <a class="text-blue-700 hover:underline" href={`/knowledge/${knowledge.id}`}>
                {knowledge.title.substring(0, 50)}...
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

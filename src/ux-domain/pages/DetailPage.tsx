import type { FC } from 'hono/jsx';
//import { marked } from 'marked';
import { Layout } from '../Layout.js';

// TODO: (学生向け) 適切な型定義に変更する
type Knowledge = {
  id: string;
  content: string;
};

export const DetailPage: FC<{ knowledge: Knowledge }> = async ({ knowledge }) => {
  //const html = await marked(knowledge.content);

  return (
    <Layout>
      <div class="p-4">
        <div className="prose lg:prose-xl max-w-none mb-4">
          {/* MarkdownをHTMLに変換して表示 */}
          <div
            className="prose lg:prose-xl max-w-none mb-4 bg-gray-100 p-4 rounded border"
            //dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
        <div class="flex space-x-2">
          <a
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            href={`/knowledge/${knowledge.id}/edit`}
          >
            編集
          </a>
          {/* TODO: (学生向け) 削除機能の実装 */}
          <form action={`/knowledge/${knowledge.id}/delete`} method="post">
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" type="submit">
              削除
            </button>
          </form>
        </div>
        <a class="text-blue-700 hover:underline mt-4 inline-block" href="/">
          一覧へ戻る
        </a>
      </div>
    </Layout>
  );
};

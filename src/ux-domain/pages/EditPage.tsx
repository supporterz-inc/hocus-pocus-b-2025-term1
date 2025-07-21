import type { FC } from 'hono/jsx';
import { Layout } from '../Layout.js';

// TODO: (学生向け) 適切な型定義に変更する
type Knowledge = {
  id: string;
  content: string;
};

export const EditPage: FC<{ knowledge: Knowledge }> = ({ knowledge }) => {
  return (
    <Layout>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">ナレッジ編集</h1>
        {/* TODO: (学生向け) 更新機能の実装 */}
        <form action={`/knowledge/${knowledge.id}/edit`} class="space-y-4" method="post">
          <div>
            <label class="block text-sm font-medium text-gray-700" for="content">
              内容 (Markdown対応)
            </label>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              id="content"
              name="content"
              rows={10}
            >
              {knowledge.content}
            </textarea>
          </div>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="submit">
            更新する
          </button>
        </form>
        <a class="text-blue-700 hover:underline mt-4 inline-block" href={`/knowledge/${knowledge.id}`}>
          キャンセル
        </a>
      </div>
    </Layout>
  );
};

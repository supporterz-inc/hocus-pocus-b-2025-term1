import type { FC } from 'hono/jsx';
import { Layout } from '../Layout.js';

export const NewPage: FC = () => {
  return (
    <Layout>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">新規ナレッジ投稿</h1>
        {/* TODO: (学生向け) 投稿機能の実装 */}
        <form action="/new" class="space-y-4" method="post">
          <div>
            <label class="block text-sm font-medium text-gray-700" for="title">
              タイトル
            </label>
            <input
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              id="title"
              name="title"
              type="text"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700" for="content">
              内容 (Markdown対応)
            </label>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              id="content"
              name="content"
              rows={10}
            ></textarea>
          </div>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
            投稿する
          </button>
        </form>
        <a class="text-blue-700 hover:underline mt-4 inline-block" href="/">
          一覧へ戻る
        </a>
      </div>
    </Layout>
  );
};

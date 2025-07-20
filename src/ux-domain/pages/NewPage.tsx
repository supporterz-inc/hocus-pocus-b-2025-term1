
import type { FC } from "hono/jsx";
import { Layout } from "../Layout.js";

export const NewPage: FC = () => {
  return (
    <Layout>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">新規ナレッジ投稿</h1>
        {/* TODO: (学生向け) 投稿機能の実装 */}
        <form action="/new" method="post" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">タイトル</label>
            <input type="text" id="title" name="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">内容 (Markdown対応)</label>
            <textarea id="content" name="content" rows={10} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            投稿する
          </button>
        </form>
        <a href="/" class="text-blue-700 hover:underline mt-4 inline-block">一覧へ戻る</a>
      </div>
    </Layout>
  );
};

import type { FC } from 'hono/jsx';
import { Layout } from '../Layout.js';

export const LoginPage: FC = () => {
  return (
    <Layout>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">ログイン情報の入力</h1>
        <form action="/login" class="space-y-4" method="post">
          <div>
            <label class="block text-sm font-medium text-gray-700" for="title">
              メールアドレス
            </label>
            <input
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              id="mailAddreass"
              name="mailAddress"
              type="text"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700" for="content">
              パスワード
            </label>
            <input
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              id="password"
              name="password"
              type="text"
            />
          </div>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
            name="action"
            value="login"
          >
            ログイン
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
            name="action"
            value="signup"
          >
            新規登録
          </button>
        </form>
        <a class="text-blue-700 hover:underline mt-4 inline-block" href="/">
          一覧へ戻る
        </a>
      </div>
    </Layout>
  );
};

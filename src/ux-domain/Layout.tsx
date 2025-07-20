import type { Child } from 'hono/jsx';

interface LayoutProps {
  children?: Child;
}

export function Layout({ children }: LayoutProps = {}) {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Hocus Pocus | Knowledge Sharing Platform for GEEK-Project</title>
        <link href="/index.css" rel="stylesheet" />
      </head>

      <body class="bg-gray-50 text-gray-900 min-h-screen">
        <div class="w-[375px] mx-auto bg-white min-h-screen shadow-sm">
          {children || <div class="p-4">TODO: (学生向け) ベースアプリケーションのスコープを実装する</div>}
        </div>
      </body>
    </html>
  );
}
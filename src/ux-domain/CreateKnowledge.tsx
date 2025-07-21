export function CreateKnowledge() {
  return (
    <div>
    <div class="w-[375px] mx-auto"><h2>投稿作成ページ</h2></div>
    <div class="w-[375px] mx-auto">
      <form action="/create/submit" method="post">
      <div>
        <label class="block mb-2" for="content">記事の内容</label>
        <textarea class="w-full" type="text" id="content" name="content" placeholder="Markdown形式で書いてください" required rows={20}></textarea>
      </div>
      <div class="text-right">
        <button class="flex-1 px-4 py-2" type="submit">投稿</button>
      </div>
      </form>
      <div class="text-center">
        <a href="/">キャンセル</a>
      </div>
    </div>
    </div>
  );
}
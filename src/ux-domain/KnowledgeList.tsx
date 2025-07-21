import { Knowledge } from "../core-domain/knowledge.model.js";

// なんでこれがないといけないかわからなかった
interface KnowledgeListPageProps {
  knowledgeList: Knowledge[];
}

export function KnowledgeList(knowledgeList : KnowledgeListPageProps) {
  return (
    <div class="w-[375px] mx-auto">
      <h2>投稿一覧</h2>

      <a href="/">トップに戻る</a>
    </div>
  );
}
import { randomUUID } from 'node:crypto';

/**
 * ナレッジのドメインモデル
 */
export interface Knowledge {
  readonly __tag: 'Knowledge';

  /**
   * ナレッジの一意な ID
   */
  readonly id: string;

  /**
   * ナレッジの一意な ID
   */
  readonly title: string;

  /**
   * ナレッジの作成者の ID
   */
  readonly authorId: string;

  /**
   * ナレッジの本文 (Markdown)
   *
   * @todo: (学生向け) 空白の場合は不正な Knowledge とみなす
   */
  readonly content: string;

  /**
   * ナレッジの作成日時 (UNIX タイムスタンプ)
   */
  readonly createdAt: number;

  /**
   * ナレッジの更新日時 (UNIX タイムスタンプ)
   */
  readonly updatedAt: number;
}

export interface UserData{
  readonly __tag: 'userdata';
  /**
   * ユーザーの一意なID
   */
  readonly id: string;  
  /**
   * ユーザーの一意なメールアドレス 
   */
  readonly mailAddress: string;
  /**
   * ユーザーのパスワード 
   */
  readonly password: string;
}

/**
 * ナレッジを新規作成する
 * @param title ナレッジタイトル
 * @param content ナレッジの本文
 * @param authorId ナレッジの作成者の ID
 * @returns 新規作成されたナレッジ
 */
function create(title: Knowledge['title'], content: Knowledge['content'], authorId: Knowledge['authorId']): Knowledge {
  const now = Math.floor(Date.now() / 1000);

  return {
    __tag: 'Knowledge',
    id: randomUUID(),
    title,
    content,
    authorId,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * ナレッジを更新する
 *
 * @param knowledge 更新対象のナレッジ
 * @param content 新しいナレッジの本文
 * @returns 更新されたナレッジ
 */
function update(self: Knowledge, content: Knowledge['content']): Knowledge {
  return {
    ...self,
    content,
    updatedAt: Math.floor(Date.now() / 1000),
  };
}

export const Knowledge = {
  create,
  update,
};

/*function usercreate(mailAddress: UserData['mailAddress'],password: UserData['password']): UserData {
  return {
    __tag: 'userdata',
    id: randomUUID(),
    mailAddress,
    password,
  };
}*/
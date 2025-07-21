import type { KnowledgeRepository } from './knowledge.repository.js';

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { Knowledge } from '../core-domain/knowledge.model.js';

const STORAGE_DIR = 'storage';
const KNOWLEDGE_JSON = join(STORAGE_DIR, 'knowledge.json');

export const FileBasedKnowledgeRepository: KnowledgeRepository = {
  // @ts-ignore TODO: (学生向け) 実装する
  getById: async (id) => {},
  // @ts-ignore TODO: (学生向け) 実装する
  getAll: async () => {
    return await readKnowledgeJSON();
  },
  // @ts-ignore TODO: (学生向け) 実装する
  upsert: async (knowledge : Knowledge) : Promise<void> => {
    const KnowledgeList = await readKnowledgeJSON();
    const existingIndex = KnowledgeList.findIndex((k) => k.id === knowledge.id);
    if (existingIndex >= 0) {
      KnowledgeList[existingIndex] = knowledge;
    } else {
      KnowledgeList.push(knowledge);
    }
    await writeKnowledgeList(KnowledgeList);
  },
  // @ts-ignore TODO: (学生向け) 実装する
  deleteById: async (id) => {},
};

async function readKnowledgeJSON() : Promise<Knowledge[]> {
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR);
  }
  if (!existsSync(KNOWLEDGE_JSON)) {
    return [];
  }

  const JSONObject = JSON.parse(readFileSync(KNOWLEDGE_JSON, 'utf-8'));
  return JSONObject as Knowledge[];
}

async function writeKnowledgeList(knowledgeList : Knowledge[]) : Promise<void>{
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR);
  }

  const knowledgeJSON = JSON.stringify(knowledgeList, null, 2);
  writeFileSync(KNOWLEDGE_JSON, knowledgeJSON);
}

import type { KnowledgeRepository } from './knowledge.repository.js';
import type { Knowledge } from '../core-domain/knowledge.model.js';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const STORAGE_DIR = 'data-source';
const KNOWLEDGE_FILE = join(STORAGE_DIR, 'knowledge.json');

export const FileBasedKnowledgeRepository: KnowledgeRepository = {
  // @ts-ignore TODO: (学生向け) 実装する
  getById: async (id) => {
    const knowledgeList = await readKnowledgeList();
    const knowledge = knowledgeList.find((k) => k.id === id);
    if(!knowledge){
      throw new Error(`Knowledge with id ${id} not found`);
    }
    return knowledge;
  },

  // @ts-ignore TODO: (学生向け) 実装する
  getAll: async () => {
    return await readKnowledgeList();
  },

  // @ts-ignore TODO: (学生向け) 実装する
  upsert: async (knowledge) => {
    const knowledgeList = await readKnowledgeList();
    const existingIndex = knowledgeList.findIndex((k) => k.id === knowledge.id);

    if(existingIndex !== -1){
      knowledgeList[existingIndex] = knowledge;
    }else{
      knowledgeList.push(knowledge);
    }
    await writeKnowledgeList(knowledgeList);
  },

  // @ts-ignore TODO: (学生向け) 実装する
  deleteById: async (id) => {
    const knowledgeList = await readKnowledgeList();
    const filteredList = knowledgeList.filter((k) => k.id !== id);

    if(filteredList.length === knowledgeList.length){
      throw new Error(`Knowledge with id ${id} not found`);
    }
    await writeKnowledgeList(filteredList);
  },
};

async function readKnowledgeList(): Promise<Knowledge[]> {
  try {
    // ストレージディレクトリが存在しない場合は作成
    if (!existsSync(STORAGE_DIR)) {
      await mkdir(STORAGE_DIR, { recursive: true });
    }

    // ファイルが存在しない場合は空の配列を返す
    if (!existsSync(KNOWLEDGE_FILE)) {
      return [];
    }

    const data = await readFile(KNOWLEDGE_FILE, 'utf-8');
    return JSON.parse(data) as Knowledge[];
  } catch (error) {
    console.error('Error reading knowledge list:', error);
    return [];
  }
}

async function writeKnowledgeList(knowledgeList: Knowledge[]): Promise<void> {
  try {
    // ストレージディレクトリが存在しない場合は作成
    if (!existsSync(STORAGE_DIR)) {
      await mkdir(STORAGE_DIR, { recursive: true });
    }

    const data = JSON.stringify(knowledgeList, null, 2);
    await writeFile(KNOWLEDGE_FILE, data, 'utf-8');
  } catch (error) {
    console.error('Error writing knowledge list:', error);
    throw error;
  }
}
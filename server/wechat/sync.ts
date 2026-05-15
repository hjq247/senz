import type { ArticleCategory } from "../../drizzle/schema";
import { upsertArticlesFromWechat } from "../db/articles";
import { fetchAllPublishedItems } from "./client";
import { mapPublishedItemToRecords, toInsertArticles } from "./mapArticles";

export type SyncWechatOptions = {
  /** 同步写入的分类，默认 stories（深至故事） */
  category?: ArticleCategory;
};

export type SyncWechatResult = {
  fetched: number;
  records: number;
  created: number;
  updated: number;
  syncedAt: string;
};

export async function syncWechatArticles(
  options: SyncWechatOptions = {},
): Promise<SyncWechatResult> {
  const category = options.category ?? "stories";
  const items = await fetchAllPublishedItems();
  const records = items.flatMap(mapPublishedItemToRecords);
  const { created, updated } = await upsertArticlesFromWechat(
    toInsertArticles(records, category),
  );

  return {
    fetched: items.length,
    records: records.length,
    created,
    updated,
    syncedAt: new Date().toISOString(),
  };
}

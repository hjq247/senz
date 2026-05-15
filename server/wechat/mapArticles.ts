import type { ArticleCategory } from "../../drizzle/schema";
import type { InsertArticle } from "../../drizzle/schema";
import type { WechatArticleRecord, WechatPublishedItem } from "./types";

export function mapPublishedItemToRecords(item: WechatPublishedItem): WechatArticleRecord[] {
  const newsItems = item.content?.news_item ?? [];
  const baseTime = item.update_time ? new Date(item.update_time * 1000) : new Date();
  const records: WechatArticleRecord[] = [];

  newsItems.forEach((news, index) => {
    if (news.is_deleted) return;
    const link = news.url?.trim();
    const title = news.title?.trim();
    if (!link || !title) return;

    records.push({
      wechatArticleId: `${item.article_id}#${index}`,
      title,
      summary: news.digest?.trim() || null,
      coverUrl: news.thumb_url?.trim() || null,
      link,
      publishedAt: baseTime,
    });
  });

  return records;
}

export function toInsertArticles(
  records: WechatArticleRecord[],
  category: ArticleCategory = "stories",
): InsertArticle[] {
  return records.map(r => ({
    wechatArticleId: r.wechatArticleId,
    title: r.title,
    summary: r.summary,
    coverUrl: r.coverUrl,
    link: r.link,
    category,
    publishedAt: r.publishedAt,
  }));
}

import { and, count, desc, eq, type SQL } from "drizzle-orm";
import {
  articles,
  type Article,
  type ArticleCategory,
  type InsertArticle,
} from "../../drizzle/schema";
import { getDb } from "../db";

export type ArticleListQuery = {
  page?: number;
  pageSize?: number;
  category?: ArticleCategory;
};

export type ArticleDto = {
  id: number;
  title: string;
  summary: string | null;
  coverUrl: string | null;
  link: string;
  category: ArticleCategory;
  publishedAt: string;
  /** 与静态 news-data 一致的展示格式：`YYYY · MM` */
  date: string;
};

function formatDisplayDate(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(d);
  const y = parts.find(p => p.type === "year")?.value ?? "0000";
  const m = parts.find(p => p.type === "month")?.value ?? "01";
  return `${y} · ${m}`;
}

export function toArticleDto(row: Article): ArticleDto {
  const publishedAt =
    row.publishedAt instanceof Date ? row.publishedAt : new Date(row.publishedAt);
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    coverUrl: row.coverUrl,
    link: row.link,
    category: row.category,
    publishedAt: publishedAt.toISOString(),
    date: formatDisplayDate(publishedAt),
  };
}

export async function listArticles(
  query: ArticleListQuery = {},
): Promise<{ items: ArticleDto[]; total: number; page: number; pageSize: number }> {
  const db = await getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 20));
  const offset = (page - 1) * pageSize;

  const filters: SQL[] = [];
  if (query.category) {
    filters.push(eq(articles.category, query.category));
  }
  const where = filters.length > 0 ? and(...filters) : undefined;

  const [rows, totalRow] = await Promise.all([
    db
      .select()
      .from(articles)
      .where(where)
      .orderBy(desc(articles.publishedAt), desc(articles.id))
      .limit(pageSize)
      .offset(offset),
    db.select({ total: count() }).from(articles).where(where),
  ]);

  return {
    items: rows.map(toArticleDto),
    total: totalRow[0]?.total ?? 0,
    page,
    pageSize,
  };
}

export async function getArticleById(id: number): Promise<ArticleDto | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  const rows = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return rows[0] ? toArticleDto(rows[0]) : null;
}

export async function upsertArticlesFromWechat(
  batch: InsertArticle[],
): Promise<{ created: number; updated: number }> {
  const db = await getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  let created = 0;
  let updated = 0;

  for (const row of batch) {
    const existing = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.wechatArticleId, row.wechatArticleId))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(articles).values(row);
      created += 1;
    } else {
      await db
        .update(articles)
        .set({
          title: row.title,
          summary: row.summary,
          coverUrl: row.coverUrl,
          link: row.link,
          publishedAt: row.publishedAt,
        })
        .where(eq(articles.wechatArticleId, row.wechatArticleId));
      updated += 1;
    }
  }

  return { created, updated };
}

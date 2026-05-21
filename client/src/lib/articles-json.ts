import {
  buildNewsFeed,
  newsDateSortKey,
  type NewsCategory,
  type NewsFeedItem,
} from "@/lib/news-data";

type ArticleCategory = "stories" | "csr" | "media";

type ApiArticle = {
  title?: string;
  date?: string;
  link?: string;
  cover?: string;
  coverUrl?: string | null;
  category?: ArticleCategory;
  publishedAt?: string;
};

type ArticlesListResponse = {
  items?: ApiArticle[];
  total?: number;
  page?: number;
  pageSize?: number;
};

type ArticlesJsonFile = {
  items?: ApiArticle[];
};

/** 首页 / 关于页新闻展示条数上限 */
export const NEWS_FEED_DISPLAY_LIMIT = 100;

const CATEGORY_LABEL: Record<ArticleCategory, NewsCategory> = {
  stories: "深至故事",
  csr: "社会责任",
  media: "媒体报道",
};

function apiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
}

function normalizeLink(link: string): string {
  return link.trim().replace(/^http:/i, "https:").replace(/#.*$/, "");
}

function dateFromPublishedAt(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(d);
  const y = parts.find(p => p.type === "year")?.value ?? "";
  const m = parts.find(p => p.type === "month")?.value ?? "";
  return y && m ? `${y} · ${m}` : "";
}

function toNewsFeedItem(article: ApiArticle): NewsFeedItem | null {
  if (!article.title || !article.link) return null;
  const date = article.date?.trim() || dateFromPublishedAt(article.publishedAt);
  return {
    title: article.title,
    date,
    link: article.link,
    cover: article.cover || article.coverUrl || "/manus-storage/news-cover-01_45c30059.png",
    tag: CATEGORY_LABEL[article.category ?? "stories"],
  };
}

function articlesJsonUrl(): string {
  const configured = import.meta.env.VITE_ARTICLES_JSON_URL as string | undefined;
  if (configured) return configured;
  const base = apiBaseUrl();
  return base ? `${base}/articles.json` : "/articles.json";
}

function articlesApiUrl(page: number, pageSize: number): string {
  const base = apiBaseUrl();
  const q = `page=${page}&pageSize=${pageSize}`;
  return base ? `${base}/api/articles?${q}` : `/api/articles?${q}`;
}

async function fetchApiArticlesFromJson(): Promise<NewsFeedItem[]> {
  const res = await fetch(articlesJsonUrl(), { cache: "no-store" });
  if (!res.ok) throw new Error(`articles.json: ${res.status}`);
  const data = (await res.json()) as ArticlesJsonFile;
  const raw = Array.isArray(data.items) ? data.items : [];
  return raw.map(toNewsFeedItem).filter((item): item is NewsFeedItem => Boolean(item));
}

/** 分页拉全量 API 文章（单页最多 100 条） */
async function fetchApiArticlesPaginated(): Promise<NewsFeedItem[]> {
  const pageSize = 100;
  const all: NewsFeedItem[] = [];
  let page = 1;
  let total = Infinity;

  while (all.length < total) {
    const res = await fetch(articlesApiUrl(page, pageSize), { cache: "no-store" });
    if (!res.ok) throw new Error(`api/articles: ${res.status}`);
    const data = (await res.json()) as ArticlesListResponse;
    const batch = Array.isArray(data.items)
      ? data.items.map(toNewsFeedItem).filter((item): item is NewsFeedItem => Boolean(item))
      : [];
    all.push(...batch);
    total = typeof data.total === "number" ? data.total : all.length;
    if (batch.length < pageSize) break;
    page += 1;
  }

  return all;
}

async function fetchApiArticles(): Promise<NewsFeedItem[]> {
  try {
    return await fetchApiArticlesFromJson();
  } catch {
    return fetchApiArticlesPaginated();
  }
}

/** 后端 + 静态合并，同链接以后端为准，按时间倒序取前 N 条 */
export function buildMergedNewsFeed(
  apiItems: NewsFeedItem[],
  staticItems: NewsFeedItem[],
  limit = NEWS_FEED_DISPLAY_LIMIT,
): NewsFeedItem[] {
  const byLink = new Map<string, NewsFeedItem>();

  for (const item of staticItems) {
    byLink.set(normalizeLink(item.link), item);
  }
  for (const item of apiItems) {
    byLink.set(normalizeLink(item.link), item);
  }

  return Array.from(byLink.values())
    .sort((a, b) => {
      const ka = newsDateSortKey(a.date);
      const kb = newsDateSortKey(b.date);
      if (kb !== ka) return kb - ka;
      return a.title.localeCompare(b.title, "zh");
    })
    .slice(0, limit);
}

export async function fetchNewsFeed(): Promise<NewsFeedItem[]> {
  const staticItems = buildNewsFeed();
  let apiItems: NewsFeedItem[] = [];
  try {
    apiItems = await fetchApiArticles();
  } catch {
    /* 后端不可用时仅用静态 */
  }
  return buildMergedNewsFeed(apiItems, staticItems);
}

export function fallbackNewsFeed(): NewsFeedItem[] {
  return buildMergedNewsFeed([], buildNewsFeed());
}

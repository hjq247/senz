import {
  buildNewsFeed,
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
};

type ArticlesResponse = {
  items?: ApiArticle[];
};

const CATEGORY_LABEL: Record<ArticleCategory, NewsCategory> = {
  stories: "深至故事",
  csr: "社会责任",
  media: "媒体报道",
};

function apiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
}

function articlesUrl(): string {
  const configured = import.meta.env.VITE_ARTICLES_JSON_URL as string | undefined;
  if (configured) return configured;
  const base = apiBaseUrl();
  return `${base}/api/articles?pageSize=100`;
}

function toNewsFeedItem(article: ApiArticle): NewsFeedItem | null {
  if (!article.title || !article.link) return null;
  return {
    title: article.title,
    date: article.date || "",
    link: article.link,
    cover: article.cover || article.coverUrl || "/manus-storage/news-cover-01_45c30059.png",
    tag: CATEGORY_LABEL[article.category ?? "stories"],
  };
}

export async function fetchNewsFeed(): Promise<NewsFeedItem[]> {
  const res = await fetch(articlesUrl(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);

  const data = (await res.json()) as ArticlesResponse;
  const items = Array.isArray(data.items)
    ? data.items.map(toNewsFeedItem).filter((item): item is NewsFeedItem => Boolean(item))
    : [];

  return items.length > 0 ? items : buildNewsFeed();
}

export function fallbackNewsFeed(): NewsFeedItem[] {
  return buildNewsFeed();
}

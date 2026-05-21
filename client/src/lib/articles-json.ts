import { buildNewsFeed, type NewsFeedItem } from "@/lib/news-data";

/** 首页 / 关于页新闻展示条数上限 */
export const NEWS_FEED_DISPLAY_LIMIT = 100;

/** 暂时仅用 news-data.ts 静态稿，不请求后端 */
function staticNewsFeed(limit = NEWS_FEED_DISPLAY_LIMIT): NewsFeedItem[] {
  return buildNewsFeed().slice(0, limit);
}

export async function fetchNewsFeed(): Promise<NewsFeedItem[]> {
  return staticNewsFeed();
}

export function fallbackNewsFeed(): NewsFeedItem[] {
  return staticNewsFeed();
}

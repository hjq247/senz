export type WechatAccessTokenResponse = {
  access_token?: string;
  expires_in?: number;
  errcode?: number;
  errmsg?: string;
};

export type WechatNewsItem = {
  title?: string;
  author?: string;
  digest?: string;
  content?: string;
  content_source_url?: string;
  thumb_media_id?: string;
  thumb_url?: string;
  url?: string;
  is_deleted?: boolean;
};

export type WechatPublishedItem = {
  article_id: string;
  content?: {
    news_item?: WechatNewsItem[];
  };
  update_time?: number;
};

export type WechatBatchGetResponse = {
  total_count?: number;
  item_count?: number;
  item?: WechatPublishedItem[];
  errcode?: number;
  errmsg?: string;
};

export type WechatArticleRecord = {
  wechatArticleId: string;
  title: string;
  summary: string | null;
  coverUrl: string | null;
  link: string;
  publishedAt: Date;
};

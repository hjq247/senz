import type {
  WechatAccessTokenResponse,
  WechatBatchGetResponse,
  WechatPublishedItem,
} from "./types";

const TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";
const BATCHGET_URL = "https://api.weixin.qq.com/cgi-bin/freepublish/batchget";

let cachedToken: { token: string; expiresAt: number } | null = null;

function requireCredentials(): { appId: string; appSecret: string } {
  const appId = process.env.WECHAT_APP_ID?.trim();
  const appSecret = process.env.WECHAT_APP_SECRET?.trim();
  if (!appId || !appSecret) {
    throw new Error("WECHAT_APP_ID and WECHAT_APP_SECRET must be set");
  }
  return { appId, appSecret };
}

function assertWechatOk<T extends { errcode?: number; errmsg?: string }>(
  payload: T,
  context: string,
): void {
  if (payload.errcode && payload.errcode !== 0) {
    throw new Error(`${context}: ${payload.errmsg ?? "unknown"} (${payload.errcode})`);
  }
}

export async function getWechatAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.token;
  }

  const { appId, appSecret } = requireCredentials();
  const url = new URL(TOKEN_URL);
  url.searchParams.set("grant_type", "client_credential");
  url.searchParams.set("appid", appId);
  url.searchParams.set("secret", appSecret);

  const res = await fetch(url);
  const data = (await res.json()) as WechatAccessTokenResponse;
  assertWechatOk(data, "WeChat token");

  if (!data.access_token || !data.expires_in) {
    throw new Error("WeChat token response missing access_token");
  }

  cachedToken = {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return data.access_token;
}

/** 测试时可注入 mock */
export function clearWechatTokenCache(): void {
  cachedToken = null;
}

export async function fetchPublishedBatch(
  offset: number,
  count: number,
): Promise<WechatBatchGetResponse> {
  const token = await getWechatAccessToken();
  const url = `${BATCHGET_URL}?access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      offset,
      count: Math.min(20, Math.max(1, count)),
      no_content: 1,
    }),
  });
  const data = (await res.json()) as WechatBatchGetResponse;
  assertWechatOk(data, "freepublish/batchget");
  return data;
}

export async function fetchAllPublishedItems(): Promise<WechatPublishedItem[]> {
  const pageSize = 20;
  const first = await fetchPublishedBatch(0, pageSize);
  const total = first.total_count ?? 0;
  const all: WechatPublishedItem[] = [...(first.item ?? [])];

  for (let offset = pageSize; offset < total; offset += pageSize) {
    const page = await fetchPublishedBatch(offset, pageSize);
    if (page.item?.length) all.push(...page.item);
  }

  return all;
}

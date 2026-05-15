/**
 * 将官网「联系意向」表单写入飞书多维表格（Bitable）。
 *
 * 环境变量（生产环境必填）：
 * - FEISHU_APP_ID、FEISHU_APP_SECRET：自建应用凭证
 * - FEISHU_BITABLE_APP_TOKEN：多维表格 app_token（URL 中 base 的 token）
 * - FEISHU_BITABLE_TABLE_ID：数据表 table_id
 * - FEISHU_OPEN_BASE（可选）：默认 https://open.feishu.cn/open-apis
 *
 * 在多维表格中新建 7 个「文本」列，列名须与默认一致，或通过 FEISHU_BITABLE_CONTACT_FIELD_MAP 覆盖：
 * 名字、姓氏、电子邮箱、公司名称、职位、感兴趣事宜（中文）、Interested topics (EN)
 *
 * FEISHU_BITABLE_CONTACT_FIELD_MAP 示例（JSON 字符串，键为内部字段名）：
 * {"firstName":"名","lastName":"姓","email":"Email","company":"公司","jobTitle":"Title","interestZh":"意向中文","interestEn":"意向英文"}
 */
import type { ContactLeadPayload } from "@shared/contactLead";

const OPEN_BASE = (process.env.FEISHU_OPEN_BASE ?? "https://open.feishu.cn/open-apis").replace(/\/$/, "");

type FieldMap = Record<keyof ContactLeadPayload, string>;

const DEFAULT_FIELD_MAP: FieldMap = {
  firstName: "名字",
  lastName: "姓氏",
  email: "电子邮箱",
  company: "公司名称",
  jobTitle: "职位",
  interestZh: "感兴趣事宜（中文）",
  interestEn: "Interested topics (EN)",
};

function parseFieldMap(): FieldMap {
  const raw = process.env.FEISHU_BITABLE_CONTACT_FIELD_MAP?.trim();
  if (!raw) return DEFAULT_FIELD_MAP;
  try {
    const parsed = JSON.parse(raw) as Partial<FieldMap>;
    return { ...DEFAULT_FIELD_MAP, ...parsed };
  } catch {
    return DEFAULT_FIELD_MAP;
  }
}

let tokenCache: { token: string; expiresAtMs: number } | null = null;

async function getTenantAccessToken(appId: string, appSecret: string): Promise<string> {
  const now = Date.now();
  if (tokenCache && now < tokenCache.expiresAtMs - 60_000) {
    return tokenCache.token;
  }

  const res = await fetch(`${OPEN_BASE}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const json = (await res.json()) as { code?: number; msg?: string; tenant_access_token?: string; expire?: number };

  if (!res.ok || json.code !== 0 || !json.tenant_access_token) {
    throw new Error(json.msg ?? `Feishu auth HTTP ${res.status}`);
  }

  const ttlSec = typeof json.expire === "number" ? json.expire : 7200;
  tokenCache = {
    token: json.tenant_access_token,
    expiresAtMs: now + ttlSec * 1000,
  };
  return json.tenant_access_token;
}

export function isContactBitableConfigured(): boolean {
  return Boolean(
    process.env.FEISHU_APP_ID?.trim() &&
      process.env.FEISHU_APP_SECRET?.trim() &&
      process.env.FEISHU_BITABLE_APP_TOKEN?.trim() &&
      process.env.FEISHU_BITABLE_TABLE_ID?.trim()
  );
}

export async function appendContactLeadToBitable(payload: ContactLeadPayload): Promise<void> {
  const appId = process.env.FEISHU_APP_ID?.trim();
  const appSecret = process.env.FEISHU_APP_SECRET?.trim();
  const appToken = process.env.FEISHU_BITABLE_APP_TOKEN?.trim();
  const tableId = process.env.FEISHU_BITABLE_TABLE_ID?.trim();

  if (!appId || !appSecret || !appToken || !tableId) {
    throw new Error("Feishu Bitable env is not configured");
  }

  const fieldMap = parseFieldMap();
  const fields: Record<string, string> = {
    [fieldMap.firstName]: payload.firstName,
    [fieldMap.lastName]: payload.lastName,
    [fieldMap.email]: payload.email,
    [fieldMap.company]: payload.company,
    [fieldMap.jobTitle]: payload.jobTitle,
    [fieldMap.interestZh]: payload.interestZh,
    [fieldMap.interestEn]: payload.interestEn,
  };

  const accessToken = await getTenantAccessToken(appId, appSecret);
  const url = `${OPEN_BASE}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ fields }),
  });

  const json = (await res.json()) as { code?: number; msg?: string };

  if (!res.ok || json.code !== 0) {
    throw new Error(json.msg ?? `Feishu bitable HTTP ${res.status}`);
  }
}

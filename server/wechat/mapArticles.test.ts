import { describe, expect, it } from "vitest";
import { mapPublishedItemToRecords, toInsertArticles } from "./mapArticles";

describe("mapPublishedItemToRecords", () => {
  it("maps multi-graphic posts with stable ids", () => {
    const records = mapPublishedItemToRecords({
      article_id: "AID1",
      update_time: 1_700_000_000,
      content: {
        news_item: [
          {
            title: "第一篇",
            url: "https://mp.weixin.qq.com/s/a",
            thumb_url: "https://mmbiz.qpic.cn/a.jpg",
            digest: "摘要 A",
          },
          {
            title: "第二篇",
            url: "https://mp.weixin.qq.com/s/b",
            is_deleted: true,
          },
          {
            title: "第三篇",
            url: "https://mp.weixin.qq.com/s/c",
          },
        ],
      },
    });

    expect(records).toHaveLength(2);
    expect(records[0]?.wechatArticleId).toBe("AID1#0");
    expect(records[1]?.wechatArticleId).toBe("AID1#2");
    expect(records[0]?.title).toBe("第一篇");

    const rows = toInsertArticles(records, "csr");
    expect(rows[0]?.category).toBe("csr");
  });

  it("skips items without title or url", () => {
    const records = mapPublishedItemToRecords({
      article_id: "X",
      content: { news_item: [{ title: "无链接" }, { url: "https://mp.weixin.qq.com/s/x" }] },
    });
    expect(records).toHaveLength(0);
  });
});

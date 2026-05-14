import { z } from "zod";
import { fetchLinkPreviews } from "./_core/linkPreview";
import { publicProcedure, router } from "./_core/trpc";

export const linkPreviewRouter = router({
  /** 批量抓取 OG / Twitter 元数据，用于新闻卡片等（单请求合并多条链接） */
  batch: publicProcedure
    .input(
      z.object({
        /** 每条经服务端校验后再抓取；允许 http(s) 长链，避免个别历史脏链导致整批失败 */
        urls: z.array(z.string().min(1).max(2048)).min(1).max(48),
      })
    )
    .query(async ({ input }) => fetchLinkPreviews(input.urls)),
});

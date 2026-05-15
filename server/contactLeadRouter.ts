import { TRPCError } from "@trpc/server";
import { appendContactLeadToBitable, isContactBitableConfigured } from "./feishuContactBitable";
import { contactLeadInputSchema } from "@shared/contactLead";
import { publicProcedure, router } from "./_core/trpc";

export const contactLeadRouter = router({
  /** 是否已配置飞书写入（未配置时前端可隐藏或提示发邮件） */
  status: publicProcedure.query(() => ({
    enabled: isContactBitableConfigured(),
  })),

  submit: publicProcedure.input(contactLeadInputSchema).mutation(async ({ input }) => {
    if (!isContactBitableConfigured()) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "意向表单暂未开通，请通过页面上的邮箱或电话联系我们。",
      });
    }

    try {
      await appendContactLeadToBitable(input);
      return { ok: true as const };
    } catch (err) {
      console.error("[contactLead.submit]", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "提交失败，请稍后重试，或直接发送邮件与我们联系。",
      });
    }
  }),
});

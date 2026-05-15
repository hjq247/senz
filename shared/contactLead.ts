import { z } from "zod";

export const contactLeadInputSchema = z.object({
  firstName: z.string().trim().min(1, "请填写名字").max(120),
  lastName: z.string().trim().min(1, "请填写姓氏").max(120),
  email: z.string().trim().email("请填写有效电子邮箱").max(320),
  company: z.string().trim().min(1, "请填写公司名称").max(200),
  jobTitle: z.string().trim().min(1, "请填写职位").max(200),
  interestZh: z.string().trim().min(1, "请用中文简述您关心的事项").max(4000),
  interestEn: z.string().trim().min(1, "Please describe your interest in English").max(4000),
});

export type ContactLeadPayload = z.infer<typeof contactLeadInputSchema>;

/**
 * HomeBrandReel
 *  · 首页 Hero 下方品牌视频区，参考 Tempus Anthem reel 布局
 *  · 左：标题 + 4 个动作动词（让 / 替 / 与 / 把）+ CTA
 *  · 右：16:9 自动循环品牌视频
 *  · 设计哲学：用一段「确定性」的视觉，回应 Hero 的文字主张
 */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import VideoCard from "./VideoCard";
import { VIDEOS, VIDEO_POSTERS, VIDEO_PREVIEWS } from "@/lib/videos";

const VERBS = [
  { en: "ACCELERATE", zh: "加速", v: "让 AI 把分散的医疗服务，变成一套可感知的完整流程。" },
  { en: "PREDICT",    zh: "预测", v: "替每一位患者，提前看见下一次复查与下一步决策。" },
  { en: "CONNECT",    zh: "连接", v: "与医生、患者、药企共建院内外协同的健康基础设施。" },
  { en: "DELIVER",    zh: "交付", v: "把不确定的等待，换成有结论、可验证的健康结果。" },
];

export default function HomeBrandReel() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* 背景光斑 */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FF77C3]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#1E6BFF]/10 blur-3xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center">
          {/* 左：动词矩阵 */}
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.28em] text-foreground/55 font-display">
              01.5 · The Senz Way
            </div>
            <h2 className="mt-4 font-zh text-[32px] lg:text-[48px] leading-[1.1] font-black tracking-tight">
              用 AI 的力量，<br />
              我们正在拥有这样的能力
            </h2>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {VERBS.map((it, i) => (
                <motion.div
                  key={it.en}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-2xl border border-border bg-white p-5 hover:shadow-[0_30px_60px_-40px_rgba(80,70,180,0.35)] transition-shadow"
                >
                  <div className="font-display text-[11px] uppercase tracking-[0.28em] text-foreground/45">
                    {it.en}
                  </div>
                  <div className="mt-1.5 font-zh text-[18px] font-black text-foreground">
                    {it.zh}
                  </div>
                  <div className="mt-2.5 text-[12.5px] leading-[1.7] text-foreground/65 font-zh">
                    {it.v}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/platform"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] font-medium text-white hover:bg-foreground/90 transition-colors"
              >
                了解平台技术
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 py-3 text-[13px] font-medium text-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                观看我们的故事
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* 右：16:9 品牌视频 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <VideoCard
              src={VIDEOS.aiCapability}
              previewSrc={VIDEO_PREVIEWS.aiCapability}
              poster={VIDEO_POSTERS.aiCapability}
              aspect="16 / 9"
              radius="rounded-[28px]"
              className="shadow-[0_40px_100px_-40px_rgba(80,70,180,0.45)]"
              label="AI 能力 · 深至 Senz · Models"
            />
            <div className="absolute -bottom-4 -right-4 hidden lg:block rounded-2xl bg-white border border-border px-4 py-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]">
              <div className="font-display text-[10px] uppercase tracking-[0.24em] text-foreground/45">
                Senz · AI Capability
              </div>
              <div className="mt-0.5 font-zh text-[13px] font-black text-foreground">
                让 AI 看懂影像 · 也看懂结果
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

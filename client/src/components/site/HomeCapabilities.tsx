/**
 * 首页 · 核心能力 + 解决方案 — 深 / 浅 双条 + 平行同尺寸方块背图卡
 *
 * 区块 A（深色横条 · 02 Core Capabilities）：
 *   标题"深至科技：构建下一代健康结果确定性体系"一行不换行
 *   3 张同尺寸方块卡（背景图 + 深色蒙层 + 编号 + 标题 + 双行能力点）
 *
 * 区块 B（浅色横条 · 03 Solutions Cx / Dx / Px）：
 *   3 张同尺寸方块卡（业务实拍背图 + 顶部彩色细条 + 编号 + 标题 + 描述 + 跳转）
 *
 * 设计：两区块卡片圆角 / 内边距 / 排版位置平行；
 * 能力卡：三列同宽；桌面端同一行内等高（取最高卡为行高）。
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { ABILITY_TITLE, ABILITIES } from "@/lib/copy";

// 深色条三能力卡 — 抽象设计感背景（不使用实拍图，避免与下方 03 重复）
// 主色按 算法蓝 / 数据紫 / 演化粉 区分，整体使用渐变 + 网格 + 光带 + 大色斑光晕
// 浅色版 · 三卡用低饱和粉彩，文字色用同色系深墨保证可读
const CAP_ACCENT = ["#6B9FFF", "#B8A3FF", "#FFB3D6"];
const CAP_INK = ["#4A7ADB", "#7D62D4", "#D97AA3"];
const CAP_GRADIENT = [
  // 01 · 算法（更淡天蓝）
  "linear-gradient(155deg, #FAFCFF 0%, #F0F5FF 55%, #E6EEFF 100%)",
  // 02 · 数据（更淡紫）
  "linear-gradient(155deg, #FAF9FF 0%, #F4F0FF 50%, #EBE4FF 100%)",
  // 03 · 演化（更淡粉）
  "linear-gradient(155deg, #FFFBFD 0%, #FFF5F9 50%, #FFE8F2 100%)",
];


export default function HomeCapabilities() {
  const abilities = ABILITIES.slice(0, 3);

  return (
    <section id="capabilities" className="relative">
      {/* ======================== 深色 band · 三大能力 ======================== */}
       <div
        className="relative overflow-hidden text-foreground pt-24 lg:pt-32 pb-20 lg:pb-28"
        style={{
          background:
            "linear-gradient(135deg, #FCFCFE 0%, #F7F5FD 50%, #FFF9FC 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute -top-40 left-1/3 h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(138,107,255,0.12), transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-[-180px] right-[-120px] h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,119,195,0.10), transparent)",
          }}
        />
        <div className="relative container">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <div className="text-[12px] font-medium uppercase tracking-[0.28em] text-foreground/55 font-display">
                02 · Core Capabilities
              </div>
              <h2
                className="mt-4 font-zh font-black leading-[1.05] tracking-tight whitespace-nowrap text-foreground"
                style={{ fontSize: "clamp(20px, 5.4vw, 64px)" }}
              >
                {ABILITY_TITLE}
              </h2>
            </div>
            <Link
              href="/platform"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 py-2.5 text-[13px] font-medium text-foreground hover:bg-foreground hover:text-white transition-colors"
            >
              进入 平台技术
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* 三列铺满 container；Grid 默认 stretch，sm+ 三卡同宽等高 */}
          <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {abilities.map((ab, i) => (
              <motion.div
                key={ab.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative flex h-full min-h-0 w-full flex-col rounded-[18px] overflow-hidden border border-foreground/10 bg-white"
                style={{
                  boxShadow:
                    "0 30px 60px -32px rgba(40,30,80,0.10), inset 0 1px 0 rgba(255,255,255,0.75)",
                }}
              >
                {/* 1) 主渐变背景 — 三卡同形不同色（浅色版） */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: CAP_GRADIENT[i] }}
                />
                {/* 2) 细网格层 — 体现"结构 / 算法 / 数据"感 */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.28] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      `linear-gradient(${CAP_ACCENT[i]}44 1px, transparent 1px), linear-gradient(90deg, ${CAP_ACCENT[i]}44 1px, transparent 1px)`,
                    backgroundSize: "42px 42px",
                    maskImage:
                      "radial-gradient(ellipse at 70% 30%, black 35%, transparent 75%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at 70% 30%, black 35%, transparent 75%)",
                  }}
                />
                {/* 3) 光带 — 不同卡有不同方向，避免雷同 */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      i === 0
                        ? `radial-gradient(closest-side at 75% 22%, ${CAP_ACCENT[i]}40, transparent 70%)`
                        : i === 1
                        ? `conic-gradient(from 200deg at 30% 35%, ${CAP_ACCENT[i]}40, transparent 30%, transparent 60%, ${CAP_ACCENT[i]}40, transparent 90%)`
                        : `radial-gradient(closest-side at 25% 75%, ${CAP_ACCENT[i]}40, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                />
                {/* 4) 大色斑光晕 + 顶部高光 */}
                <div
                  aria-hidden
                  className="absolute -top-24 -right-16 h-[300px] w-[300px] rounded-full blur-3xl opacity-[0.32]"
                  style={{ background: CAP_ACCENT[i] }}
                />
                {/* 5) 底部稳读蒙层（浅色版 — 让文字落在白色雾上）*/}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.82) 65%, rgba(255,255,255,0.97) 100%)",
                  }}
                />
                {/* 6) 颗粒 */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(20,15,60,0.6) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                  }}
                />
                {/* 顶部细色条 */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, ${CAP_ACCENT[i]}, transparent)`,
                  }}
                />

                {/* 内容区铺满卡片高度（同行卡片等高） */}
                <div className="relative flex min-h-0 flex-1 flex-col px-5 pt-5 pb-4 lg:px-6 lg:pt-6 lg:pb-5">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-[10px] sm:text-[10.5px] uppercase tracking-[0.26em]"
                      style={{ color: CAP_INK[i] }}
                    >
                      Capability 0{i + 1}
                    </span>
                    <span className="font-display text-[10px] sm:text-[10.5px] tracking-[0.18em] text-foreground/45">
                      / 03
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-zh text-[19px] lg:text-[22px] font-black leading-[1.22] text-foreground">
                    {ab.name}
                  </h3>

                  {/* 能力点列表 */}
                  <ul className="mt-3 space-y-2.5">
                    {ab.items.map((it) => (
                      <li key={it.k}>
                        <div
                          className="text-[12.5px] font-bold font-zh"
                          style={{ color: CAP_INK[i] }}
                        >
                          · {it.k}
                        </div>
                        <div className="mt-0.5 text-[12px] leading-[1.65] text-foreground/72 font-zh">
                          {it.v}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

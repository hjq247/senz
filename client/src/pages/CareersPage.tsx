/**
 * 招贤纳士
 *  · 办公环境 / 员工活动 / 开放职位
 *
 * 配图地址（核对用）——
 * 办公环境（完整路径，与下方 OFFICE_PHOTOS 一致）：
 *   /manus-storage/DSC09169_9007c2f5.webp
 *   /manus-storage/DSC09177_675f7bd2.webp
 *   /manus-storage/DSC09222_e67d9ed7.webp
 *   /manus-storage/DSC09218_93b9f715.webp
 *   /manus-storage/DSC09206_06e365cd.webp
 *   /manus-storage/DSC09240_9e0b1472.webp
 *   /manus-storage/DSC09269_5a5bf0c6.webp
 *   /manus-storage/DSC09255_e93a65fe.webp
 * 员工活动（与 WECHAT_CULTURE_CAROUSEL_IMAGES 一致，完整 URL）：
 *   https://mmecoa.qpic.cn/mmecoa_jpg/85XF10FZBBzhggwsfZkD4rODESQOicuumc1yoHYLqdqCBEKxBa2WKcUZpjaLJ1SJUa0dNiau3B5sKr9uSndfDgK4nNM2Uzo5VVR3WicvPSjjq8/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/mmecoa_jpg/85XF10FZBBxLtBnQ7Tb9gdqQJAVJTECCm8ibWpP5YWLYSwQPXh0ZxdEdbggjqnaSUia3xicMuPvMILoicz4PIBAX92WHCK0O216V5o13BbRS8Fc/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/mmecoa_jpg/85XF10FZBBwjYFicmpGVh9WAtG1zNlSkkngWB5ozibI030pmicjibzIxWpXiakyRVQNg4E9mnQNIfuanzicwZrhbg1l8KiarWFAaCP3ZdibrLQAXtia0/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/mmecoa_jpg/85XF10FZBBz6nuibkdCxycFQJZRiaLLtYrMguHhIarJpXNGPnpS5kDEBXgiao4Y4ibxBibvibia1yDl5YaqwzTveLS4828CC0hytTQO1WceyheoP54/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/sz_mmecoa_jpg/85XF10FZBBzUje2dxKD9ZumTCtuGVt9nYWuO3ic7uCe0RkeVJAoqQgpB6SypkWDzCXIxehwoRSIpXsaLvzU8wekkcALTKYg4icia7iaeHUwyUgI/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/sz_mmecoa_jpg/85XF10FZBByFKUWNicwbO9YazZiaBib7koo9bZZCBibAypuCOenQyd0Il0k6ySo7H3Yy1yhoqY8YbYHcx3mscO89bMegj0uDkg2sDbNHp7vZyeQ/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/mmecoa_jpg/85XF10FZBByCXmqOqgfK6ianJw6s5S8OJYZkqx5pDCdyhQ5KNGMK6ewiby6xICC8bsFmcwmSj6Cs0rvF3DjJvp1ZujZbOUIjVJ0P7nibMUHUIE/640?wx_fmt=jpeg&from=appmsg
 *   https://mmecoa.qpic.cn/sz_mmecoa_png/85XF10FZBByLbhkUiakBxQ7eqBcD01dicpX2ibRAH03iawO8RvpQ0AKNzRQrS5riciaCQzpvkLvZZJjdF7aKUOTviczJnbNpFXLPuwo1Ykslq606kc/640?wx_fmt=png&from=appmsg
 */
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import { CAREERS, CAREERS_SECTIONS } from "@/lib/copy";
import { WECHAT_CULTURE_CAROUSEL_IMAGES } from "@/lib/careers-culture";
import { CAREERS_OPENINGS, FEISHU_RECRUIT_PORTAL_URL } from "@/lib/careersOpenings";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";

const OFFICE_PHOTOS = [
  "/manus-storage/DSC09169_9007c2f5.webp",
  "/manus-storage/DSC09177_675f7bd2.webp",
  "/manus-storage/DSC09222_e67d9ed7.webp",
  "/manus-storage/DSC09218_93b9f715.webp",
  "/manus-storage/DSC09206_06e365cd.webp",
  "/manus-storage/DSC09240_9e0b1472.webp",
  "/manus-storage/DSC09269_5a5bf0c6.webp",
  "/manus-storage/DSC09255_e93a65fe.webp",
];


const TEAM_LIFE_PHOTOS = WECHAT_CULTURE_CAROUSEL_IMAGES;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        index="05"
        en="Careers"
        title={CAREERS.title}
        desc={CAREERS.ending[0] + " — " + CAREERS.ending[1]}
        subs={CAREERS_SECTIONS}
        variant="mix"
        videoSrc={HERO_VIDEOS.careers}
        posterSrc={HERO_POSTERS.careers}
        tone="light"
        subAnchorBase="/careers"
      />

      {/* 三组文化 */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader
            index="05.0"
            en="Culture · Hiring Spirit"
            title="医疗 AI 赛道寻破局者，敢想敢干你就来"
            titleClassName="whitespace-nowrap text-[clamp(16px,4.2vw,46px)]"
            className="max-w-full w-full overflow-x-auto pb-1"
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {CAREERS.groups.map((g, gi) => (
              <motion.div
                key={g.heading}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={gi}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-gradient-to-br from-white via-[#F8F6FF] to-white p-7"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-display">
                  0{gi + 1}
                </div>
                <h3 className="mt-2 font-zh text-[20px] font-black text-foreground">{g.heading}</h3>
                <ul className="mt-5 space-y-4">
                  {g.items.map((it) => (
                    <li key={it.k}>
                      <div className="text-[13.5px] font-bold text-[#1E6BFF] font-zh">· {it.k}</div>
                      <div className="mt-1.5 text-[13px] leading-[1.85] text-foreground/70 font-zh">{it.v}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. 办公环境 — 纯图横向无限滚动 */}
      <section id="office" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="05.1" en="Workspace" title="办公环境" />
        </div>
        {/* full-bleed marquee */}
        <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max gap-5 px-5 animate-office-marquee hover:[animation-play-state:paused]">
            {[...OFFICE_PHOTOS, ...OFFICE_PHOTOS].map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 h-[260px] sm:h-[320px] lg:h-[400px] aspect-[3/2] overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_60px_-50px_rgba(30,107,255,0.45)]"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 员工活动：与办公环境同宽横滚，方向相反（视觉向右） */}
      <section id="life" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader
            index="05.2"
            en="Team Life"
            title="员工活动"
            desc="让每一个人在健康的长路上，都能拥有专业且温暖的 AI 伙伴长期守护"
          />
        </div>
        <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max gap-5 px-5 animate-office-marquee-reverse hover:[animation-play-state:paused]">
            {[...TEAM_LIFE_PHOTOS, ...TEAM_LIFE_PHOTOS].map((src, i) => (
              <div
                key={`life-${i}`}
                className="relative shrink-0 h-[260px] sm:h-[320px] lg:h-[400px] aspect-[3/2] overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_60px_-50px_rgba(30,107,255,0.45)]"
              >
                <img
                  src={src}
                  alt=""
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 开放职位 */}
      <section id="openings" className="relative scroll-mt-24 bg-gradient-to-b from-white to-[#F4F1FF] py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeader
              index="05.3"
              en="Openings"
              title="开放职位"
              desc="以下职位与飞书招聘官网同步，点击职位可前往官网查看详情并投递。"
            />
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={FEISHU_RECRUIT_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E6BFF] via-[#8A6BFF] to-[#FF77C3] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(30,107,255,0.55)] hover:shadow-[0_14px_36px_-10px_rgba(138,107,255,0.55)] transition-shadow"
              >
                飞书官网投递
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => toast("欢迎同时发送简历至 JoinUs@senzco.com")}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-[13px] font-medium text-foreground/80 shadow-sm transition-colors hover:bg-[#F8F6FF]"
              >
                邮箱投递
              </button>
            </div>
          </div>

          <ul className="mt-12 divide-y divide-border rounded-3xl border border-border bg-white overflow-hidden">
            {CAREERS_OPENINGS.map((o, i) => (
              <motion.li
                key={o.href}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="transition-colors hover:bg-[#F8F6FF]"
              >
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-12 gap-4 items-center px-6 lg:px-8 py-5 text-inherit no-underline"
                >
                  <div className="col-span-12 lg:col-span-5 flex items-center gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6BFF] to-[#8A6BFF] text-white shrink-0">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="font-zh text-[15.5px] font-bold text-foreground group-hover:text-[#1E6BFF]">
                      {o.k}
                    </div>
                  </div>
                  <div className="col-span-8 lg:col-span-5 text-[13px] text-foreground/70 font-zh">{o.v}</div>
                  <div className="col-span-4 lg:col-span-2 inline-flex items-center justify-end gap-1 text-[12.5px] text-foreground/60 font-zh">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {o.loc}
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-[#F4F1FF] via-[#FFF1F6] to-[#EAF2FF] px-8 lg:px-14 py-10 lg:py-14">
            <div className="font-display text-[20px] lg:text-[24px] font-bold text-foreground/85 leading-snug">
              {CAREERS.ending[0]}
            </div>
            <div className="mt-2 font-zh text-[20px] lg:text-[24px] font-bold text-foreground">
              {CAREERS.ending[1]}
            </div>
            <div className="mt-5 font-zh text-[14.5px] text-foreground/65">
              {CAREERS.ending[2]}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

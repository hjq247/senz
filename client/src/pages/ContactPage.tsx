/**
 * 联系我们
 *  · 公司地址 · 地图（嵌入 OpenStreetMap，不依赖 Google Maps API Key）
 */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import { CONTACT_INFO } from "@/lib/copy";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";

/** 前滩世贸中心一期 A 座附近（OSM 标注点） */
const HQ_LAT = 31.17035;
const HQ_LNG = 121.48725;
const OSM_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${HQ_LNG - 0.015}%2C${HQ_LAT - 0.01}%2C${HQ_LNG + 0.015}%2C${HQ_LAT + 0.01}&layer=mapnik&marker=${HQ_LAT}%2C${HQ_LNG}`;
const OSM_FULL_MAP = `https://www.openstreetmap.org/?mlat=${HQ_LAT}&mlon=${HQ_LNG}#map=16/${HQ_LAT}/${HQ_LNG}`;

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        index="06"
        en="Contact"
        title="联系我们"
        variant="blue"
        videoSrc={HERO_VIDEOS.contact}
        posterSrc={HERO_POSTERS.contact}
        tone="dark"
      />

      {/* 地图 + 总部信息 */}
      <section id="address" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="06.1" en="Headquarters" title="总部地址" />

          <div className="mt-12 grid lg:grid-cols-12 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-border bg-white shadow-[0_24px_60px_-40px_rgba(30,107,255,0.2)]"
            >
              <iframe
                title="深至科技 · 总部位置地图"
                src={OSM_EMBED_SRC}
                className="block h-[min(52vh,520px)] w-full min-h-[360px] border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="flex items-center justify-between gap-3 border-t border-border bg-[#FAFAFA] px-4 py-2.5 text-[11px] text-foreground/55">
                <span className="font-zh">地图数据 © OpenStreetMap 贡献者</span>
                <a
                  href={OSM_FULL_MAP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-medium text-[#1E6BFF] hover:underline"
                >
                  放大查看
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" as const }}
              className="lg:col-span-4 rounded-3xl border border-border bg-white p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E6BFF] to-[#8A6BFF] text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">
                Senz · Shanghai HQ
              </div>
              <div className="mt-1.5 font-zh text-[20px] font-black text-foreground leading-snug">
                上海 · 浦东新区 · 前滩
              </div>
              <ul className="mt-6 space-y-4 text-[13.5px] font-zh">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#1E6BFF] mt-0.5 shrink-0" />
                  <span className="text-foreground/75">{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-[#8A6BFF] mt-0.5 shrink-0" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-foreground/75 hover:text-[#1E6BFF] break-all">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-[#FF77C3] mt-0.5 shrink-0" />
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="text-foreground/75 hover:text-[#1E6BFF]">
                    {CONTACT_INFO.phone}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

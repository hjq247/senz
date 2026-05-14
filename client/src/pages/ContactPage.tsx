/**
 * 联系我们
 *  · 联系邮箱 / 联系方式 / 公司地址 / 地图 / 公众号
 */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, QrCode, Building2, MessageSquare } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import SectionHeader from "@/components/layout/SectionHeader";
import { CONTACT_INFO, CONTACT_SECTIONS } from "@/lib/copy";
import { MapView } from "@/components/Map";
import { HERO_VIDEOS, HERO_POSTERS } from "@/lib/videos";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

const QUICK = [
  { id: "email",   icon: <Mail className="h-5 w-5" />,        label: "联系邮箱",   value: CONTACT_INFO.email,   color: "#1E6BFF" },
  { id: "phone",   icon: <Phone className="h-5 w-5" />,       label: "联系方式",   value: CONTACT_INFO.phone,   color: "#8A6BFF" },
  { id: "address", icon: <MapPin className="h-5 w-5" />,      label: "公司地址",   value: CONTACT_INFO.address, color: "#FF77C3" },
  { id: "wechat",  icon: <MessageSquare className="h-5 w-5" />, label: "官方公众号", value: "Senz · 深至科技", color: "#2AC58E" },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        index="06"
        en="Contact"
        title="联系我们"
        desc="期待与产业伙伴、医疗机构、投资人、媒体一起，重塑医疗 AI 的未来。"
        subs={CONTACT_SECTIONS}
        variant="blue"
        videoSrc={HERO_VIDEOS.contact}
        posterSrc={HERO_POSTERS.contact}
        tone="dark"
      />

      {/* 联系方式快速入口 */}
      <section id="email" className="relative scroll-mt-24 bg-white py-20 lg:py-24 overflow-hidden">
        <div className="container">
          <SectionHeader index="06.1" en="Channels" title="联系方式" desc="可通过以下任一方式与我们取得联系。" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK.map((q, i) => (
              <motion.a
                key={q.id}
                href={q.id === "email" ? `mailto:${q.value}` : "#" + q.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-border bg-gradient-to-br from-white to-[#F8F6FF] p-6 overflow-hidden"
                style={{ boxShadow: `0 24px 60px -36px ${q.color}55` }}
              >
                <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${q.color}, transparent)` }} />
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                  style={{ background: `linear-gradient(135deg, ${q.color}, ${q.color}AA)` }}
                >
                  {q.icon}
                </div>
                <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-foreground/45 font-display">
                  {q.label}
                </div>
                <div className="mt-1.5 font-zh text-[16px] font-bold text-foreground break-words">
                  {q.value}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 地图 + 总部信息 */}
      <section id="address" className="relative scroll-mt-24 bg-gradient-to-b from-[#F7F5FF] to-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="06.2" en="Headquarters" title="总部地址 · 地图" desc="深至总部位于上海浦东张江产研一体化园区。" />

          <div className="mt-12 grid lg:grid-cols-12 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-border bg-white"
              style={{ height: 460 }}
            >
              <MapView
                className="h-full w-full"
                initialCenter={{ lat: 31.2058, lng: 121.6063 }}
                initialZoom={14}
                onMapReady={(map) => {
                  // place a centered marker
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const g: any = (window as any).google;
                  if (g?.maps) {
                    new g.maps.Marker({
                      map,
                      position: { lat: 31.2058, lng: 121.6063 },
                      title: "深至科技 · 上海总部",
                    });
                  }
                }}
              />
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
                上海 · 浦东新区 · 张江
              </div>
              <ul className="mt-6 space-y-4 text-[13.5px] font-zh">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#1E6BFF] mt-0.5" />
                  <span className="text-foreground/75">{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-[#8A6BFF] mt-0.5" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-foreground/75 hover:text-[#1E6BFF]">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-[#FF77C3] mt-0.5" />
                  <span className="text-foreground/75">{CONTACT_INFO.phone}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 公众号 */}
      <section id="wechat" className="relative scroll-mt-24 bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container">
          <SectionHeader index="06.3" en="Official Accounts" title="官方公众号" desc="关注 Senz 深至科技公众号，获取一手动态。" />
          <div className="mt-12 grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 rounded-3xl border border-border bg-gradient-to-r from-[#F4F1FF] via-[#FFF1F6] to-[#EAF2FF] p-8 lg:p-12">
              <div className="font-display text-[11px] tracking-[0.22em] uppercase text-foreground/45">
                WeChat Official Account
              </div>
              <div className="mt-3 font-zh text-[26px] lg:text-[34px] font-black text-foreground leading-snug">
                Senz · 深至科技
              </div>
              <p className="mt-5 text-[14px] leading-[1.95] text-foreground/70 font-zh">
                公众号定期发布产品发布、行业洞察、医生临床案例与基层公益项目。
                你也可以通过公众号留言，与团队建立连接。
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              className="lg:col-span-5 rounded-3xl border border-border bg-white p-8 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="mx-auto h-44 w-44 rounded-2xl bg-gradient-to-br from-[#0B0F1E] via-[#1B1E3D] to-[#0B0F1E] flex items-center justify-center text-white">
                  <QrCode className="h-20 w-20" />
                </div>
                <div className="mt-5 font-zh text-[14px] text-foreground/65">
                  扫码关注「Senz · 深至科技」
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { WECHAT_CULTURE_CAROUSEL_IMAGES } from "@/lib/careers-culture";

/** 固定比例外框 + 绝对定位铺满，尺寸与图源无关 */
const SLIDE_FRAME = "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#EAE4FF]/40 via-white to-[#FFF1F6]/50";

export default function CareersCultureCarousel() {
  if (WECHAT_CULTURE_CAROUSEL_IMAGES.length === 0) return null;

  return (
    <div className="careers-culture-swiper relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={700}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full rounded-2xl [&_.swiper-pagination]:!bottom-3 [&_.swiper-pagination-bullet]:!h-1.5 [&_.swiper-pagination-bullet]:!w-1.5 [&_.swiper-pagination-bullet-active]:!w-5 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!bg-[#1E6BFF]"
      >
        {WECHAT_CULTURE_CAROUSEL_IMAGES.map((src, i) => (
          <SwiperSlide key={`culture-slide-${i}`}>
            <div className={SLIDE_FRAME}>
              <img
                src={src}
                alt=""
                referrerPolicy="no-referrer"
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

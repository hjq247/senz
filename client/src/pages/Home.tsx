/**
 * Senz · v1.6 Home — 精简首页（加入视频化呈现）
 * 顺序：
 *  · Hero（战略主张主视觉）
 *  · HomeBrandReel（品牌片 16:9 全宽视频，参考 Tempus Anthem）
 *  · Strategy（我们解决什么样的问题）
 *  · HomeCapabilities（核心能力速览）
 *  · HomeAudienceVideos（三端方形循环视频：患者→医生→药企）
 *  · HomeNewsTeaser（最新动态单行滚动）
 *  · HomeNowDoing（深至正在做的）
 */
import PageShell from "@/components/layout/PageShell";
import Hero from "@/components/site/Hero";
import HomeStatsBand from "@/components/site/HomeStatsBand";
import HomeBrandReel from "@/components/site/HomeBrandReel";
import StrategySection from "@/components/site/StrategySection";
import HomeCapabilities from "@/components/site/HomeCapabilities";
import HomeAudienceVideos from "@/components/site/HomeAudienceVideos";
import HomeNewsTeaser from "@/components/site/HomeNewsTeaser";
import HomeNowDoing from "@/components/site/HomeNowDoing";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <HomeStatsBand />
      <HomeBrandReel />
      <StrategySection />
      <HomeCapabilities />
      <HomeAudienceVideos />
      <HomeNewsTeaser />
      <HomeNowDoing />
    </PageShell>
  );
}

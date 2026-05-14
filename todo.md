# Senz Q2 文档对齐 TODO（基于《2026深至科技官网改版规划Q2.docx》）

## 内容（依据 docx 全量替换 / 不增不减）
- [ ] copy.ts 写入战略主张/挑战/产品体系/核心保障 完整文本（3.1.1）
- [ ] copy.ts CORE_VALUE / ABILITY 文案对齐 3.1.2 + 3.1.3
- [ ] DOING 改为 3.1.6 三行
- [ ] PLATFORM 模块对齐 3.2.1 / 3.2.2（Neuro + Cx + Dx + Px 段落）
- [ ] PRODUCTS 增加每款的 3 类问题、4 步流程、典型场景、CTA（3.3.1/2/3）
- [ ] 协同闭环（3.3.4）+ 全生命周期闭环（第四层）
- [ ] About 公司介绍/文化/发展历程 完整对齐（3.4）
- [ ] News/招贤纳士/联系我们 文案对齐（3.5/3.6/3.7）
- [ ] 三款智能体用户案例：林女士 / 陈医生 / 沈女士 完整呈现

## 视觉
- [ ] Hero "确定性" 三字 渐变动效升级
- [ ] Hero 下方 4 项数据 in-view 滚动出现
- [ ] StrategySection 删去 AI flowlight 大图，扩展 CHALLENGES 三块
- [ ] HomeNewsTeaser 改为横向滚动全部新闻（marquee 风格）

## 验证 + Checkpoint
- [ ] 全站 build 无错
- [ ] checkpoint 提交


## 新一轮：视频化呈现（参考 Tempus）
### Phase 1 · 调研 Tempus
- [ ] 浏览 https://www.tempus.com/，记录视频出现位置 / 尺寸 / 是否 muted+loop / hover 触发
- [ ] 提炼至少 3 种可复用 video pattern

### Phase 2 · 视频素材
- [ ] 列出 4-6 段需要的题材（医患场景 / AI 数据流 / 超声扫描 / 终端硬件 / 三端协同）
- [ ] 用 generate 模式生成短视频（4-6s 可 loop）
- [ ] 上传到 webdev 静态库

### Phase 3 · 通用组件
- [ ] VideoCard.tsx：autoplay+muted+loop+playsInline + IntersectionObserver 暂停
- [ ] VideoMosaic.tsx：Tempus 风格错落多卡片视频网格
- [ ] poster 兜底图

### Phase 4 · 页面落地
- [ ] Home：StrategySection 与 HomeNewsTeaser 之间加 VideoStories 区
- [ ] PlatformPage：Neuro 下加全宽视频背景条
- [ ] ProductsPage：SYNERGY 每端配一段产品场景视频
- [ ] NewsPage：头条故事改为视频封面卡片

### Phase 5 · 验证 + Checkpoint
- [ ] 移动端降级 poster
- [ ] webdev_save_checkpoint


## 新一轮：全站 Hero 视频化（真人实拍风格）+ 关于页时间线纵向化
- [ ] 1. 列出需要 Hero 视频的页面 & 镜头脚本：Home / Platform / Products / 三个 SolutionDetail / About / News / Careers / Contact
- [ ] 2. 生成真人实拍风格 hero 视频（医生扫超声、患者使用 App、医院走廊、研发实验室、办公协作、握手签约等）
- [ ] 3. 上传 + 汇总到 lib/videos.ts
- [ ] 4. PageHero 组件支持 videoSrc/posterSrc 主背景；Home Hero 同步改造
- [ ] 5. 关于页 milestones 改为竖向时间线
- [ ] 6. 验证 + checkpoint


## 新一轮：Hero 视频静态首帧 Poster
- [ ] ffmpeg 抽取所有 hero_*.mp4 第 0 帧
- [ ] 转成 webp（宽 1600，质量 78）
- [ ] manus-upload-file --webdev 上传 → 写入 lib/videos.ts 的 HERO_POSTERS
- [ ] Hero / PageHero / SolutionDetail Hero 的 <video> 加 poster
- [ ] 保存 checkpoint


## 新一轮：Hero Poster + 黑白底交错
- [ ] ffmpeg 抽帧 hero_home / platform / products / patient / doctor / industry / about / news / careers / contact
- [ ] 压成 1600 宽 webp 上传 webdev
- [ ] PageHero 新增 tone="dark" | "light"；Hero 同步开放 tone
- [ ] 排布：home=dark, platform=light, products=dark, patient=light, doctor=dark, industry=light, about=dark, news=light, careers=dark, contact=light
- [ ] <video> 加 poster
- [ ] checkpoint


## 新一轮：首页 Hero 改浅色系
- [ ] Hero.tsx：bg 改 #F4F1EA / 蒙层改白雾 / 字深色
- [ ] Pill / CTA / 统计卡 / Doing 信息条 联动深色
- [ ] checkpoint


## 新一轮：顶部导航重命名
- [ ] 平台与技术 → 平台技术
- [ ] 产品与解决方案 → 解决方案
- [ ] 招贤纳士 → 加入我们
- [ ] checkpoint


## 新一轮：Hero 视频加速首播
- [ ] 检查 hero_*.mp4 体积；>4MB 重压（720p / CRF 28 / +faststart）并重传
- [ ] Hero / PageHero / SolutionDetail：preload="auto"，poster 兜底立即可见
- [ ] index.html 添加 <link rel="preload" as="video"> 给首页 hero
- [ ] 路由切换后动态注入对应 hero 的 preload
- [ ] checkpoint


## 新一轮：恢复 Platform Neuro 视频条
- [ ] 查看 PlatformPage.tsx 169 行现状，确认 Neuro AI · In Motion 视频条是否被误删/留空
- [ ] 补回视频 band：bg-[#0B0F1E] + VIDEOS.neuroFlow + 文案遮罩
- [ ] checkpoint


## 新一轮：打包 /manus-storage/ 静态资源
- [ ] 扫描项目中所有 /manus-storage/ 引用
- [ ] 定位对应原文件（webdev-static-assets）
- [ ] 打包 zip 并交付


## 新一轮：补打包 logo + news-cover
- [ ] grep 项目所有 .png .jpg .svg 引用
- [ ] 找到 senz-logo_2dffe2a0.png 与 news-cover-01~06-1 的真实引用名
- [ ] 复制到 zip


## 新一轮：8s 科幻医疗单镜头视频
- [ ] generate_video 按脚本产出 8s/16:9/24fps
- [ ] 输出 mp4 交付


## 新一轮：首页 Hero 左右双视频背景
- [ ] 处理 jimeng 视频，faststart + 上传
- [ ] 处理 senz_cinematic_scan，faststart + 上传
- [ ] 改造 Hero 为左右双视频 split + 中间玻璃文案
- [ ] checkpoint


## 新一轮：Hero 回归单视频浅底
- [ ] Hero.tsx 只用 senz_hero_warm 单视频 + 白雾
- [ ] 深色字/玻璃卡恢复浅底
- [ ] preload 只留 warm


## 新一轮：接入 jimeng 品牌隐喻视频
- [ ] 拷贝、faststart、poster、上传
- [ ] 更新 HERO_SPLIT 与 index.html preload
- [ ] checkpoint


## 新一轮：电影感开屏 Hero 重设
- [ ] 接入新视频 jimeng-2026-05-06-1909（faststart + poster + 上传）
- [ ] 更新 HERO_SPLIT 与 index.html preload
- [ ] Hero 重做布局：全幅视频 + 顶部细字幕 + 底部文案栏 + 边角 Stats/CTA，文字不遮视频
- [ ] checkpoint


## 新一轮：四视频 + 多元卡片 + 阶段箭头
- [ ] 处理新视频：AI 能力 / Cx / Dx / Px → faststart + poster + 上传
- [ ] 更新 lib/videos.ts
- [ ] Hero 视频/文字比例校准（100% 桌面）
- [ ] HomeBrandReel 右视频换 AI 能力
- [ ] HomeAudienceVideos 三段换新 Cx/Dx/Px
- [ ] 三段协同区改为横向箭头 3 阶段
- [ ] 下一代体系 + 解决方案 区块改异构卡片
- [ ] 深至正在做的 改图文混排
- [ ] checkpoint


## 新一轮：HomeCapabilities 平行卡 + 深浅双条
- [ ] 标题"深至科技：构建下一代健康结果确定性体系" 一行不换行（whitespace-nowrap）
- [ ] 上条：深色背景，三个能力点（AI Native / RWD / Outcome Loop）平行同尺寸卡
- [ ] 下条：浅色背景，Cx / Dx / Px 平行同尺寸卡（圆形 hero + 同长描述）
- [ ] checkpoint


## 新一轮：HomeCapabilities 圆 → 方背图卡
- [ ] 选 6 张主题相符的背景图（深色 band 3 张：算法/数据/演化；浅色 band 3 张：患者/医生/药企）
- [ ] 重写 HomeCapabilities：方形大卡 + 背图 + 渐变蒙层 + 编号/标题/描述
- [ ] checkpoint


## 新一轮：02 三能力卡抽象背景
- [ ] 不再使用 hero_platform / hero_industry / hero_about 实拍图
- [ ] 每卡使用纯 CSS 渐变 + svg 网格 + 数据光带 + 大色斑光晕，三卡风格一致仅主色不同
- [ ] 保留 03 浅色条 Cx/Dx/Px 实拍背景不动


## 新一轮：合并解决方案/三端协同 + 标题不留白 + 新闻联系视频替换
- [ ] faststart + poster + upload 联系我们 / 新闻中心 新视频
- [ ] lib/videos.ts、NewsPage、ContactPage、index.html preload 同步
- [ ] HomeCapabilities 02 标题占满栅格不留白；删除 03 浅色条 Cx/Dx/Px 区块
- [ ] HomeAudienceVideos 升级为合并后的"面向医疗产业的智能解决方案 / 三端协同"区块
- [ ] checkpoint

## 新一轮 R2：明亮彩调 Hero + 删除预约沟通
- [ ] 新首页 Hero 视频 faststart + poster + 上传，更新 HERO_VIDEOS.home / HERO_SPLIT
- [ ] index.html 首页 preload 替换为新视频/poster
- [ ] Hero.tsx 蒙层去深色化：白雾 + 轻彩晕（pink/blue/violet 浅色），文字仍可读
- [ ] PageHero.tsx 蒙层全部改浅亮，移除 dark tone（统一 bright/light）
- [ ] 各页面 PageHero 调用：移除 tone="dark"
- [ ] Header.tsx 删除"预约沟通"按钮（桌面 + 移动菜单）
- [ ] checkpoint

## 新一轮 R3：开屏视频再换 + 比例适配 + 1:1 三视频
- [ ] 处理新版 hero 视频（faststart + poster），上传，更新 videos.ts / index.html
- [ ] Hero.tsx：缩小主标题字号（更克制）、收紧文案区宽度、调整布局让位于视频中央人物
- [ ] HomeAudienceVideos：Cx/Dx/Px 三卡的 video 容器改为 aspect-square，object-cover 不变形不裁切
- [ ] checkpoint

## R4：开屏视频再换 + 字号略放大
- [ ] 处理 v4 hero 视频（faststart+poster），上传，更新 videos.ts/index.html
- [ ] Hero.tsx 标题/正文字号上调一档
- [ ] checkpoint

## R7
- [ ] hero shrink + nav above video

## R8
- [ ] hero 100vh full-bleed

## R12
- [ ] HomeCapabilities cards: remove top empty area, text from top to bottom
- [ ] (待用户确认) 视频人物服装替换

## R13
- [ ] hero v9 video + slow playback
- [ ] CxDxPx videos: white tint overlay + lower saturation
- [ ] HomeCapabilities: pure-text cards, no top empty area

# Tempus 视频模块研究（2026-04-24）

## 6 段视频概况

| # | 用途 | 尺寸 | muted | loop | autoplay | controls | 说明 |
|---|---|---|---|---|---|---|---|
| 1 | Hero 下方全宽预览 (Anthem-Preview) | 1265×493 | ✅ | ✅ | ✅ | ❌ | 类似 brand reel 横幅，永远静音循环播放 |
| 2 | Anthem 完整片 (Modal/Watch Story) | 隐藏 | ❌ | ❌ | ✅ | ✅ | 点 "WATCH OUR STORY" 弹出全片 |
| 3 | PROVIDERS 业务模块 loop | 380×380 | ✅ | ✅ | ✅ | ❌ | 方形小视频，对应 hover 状态 |
| 4 | LIFE SCIENCES (LENS) loop | 380×380 | ✅ | ✅ | ✅ | ❌ | 方形小视频 |
| 5 | PATIENTS (Mobile) loop | 380×380 | ✅ | ✅ | ✅ | ❌ | 方形小视频 |
| 6 | "WATCH OUR STORY" Modal 完整片 | 隐藏 | ❌ | ❌ | ✅ | ✅ | 点击触发的完整品牌片 |

## 关键 Pattern 提炼

### Pattern A · Brand Reel 全宽横幅
- Hero 下方一段宽 16:9 全屏循环视频；左侧叠加文案（动词列表 ACCELERATE / PREDICT / IDENTIFY / DIAGNOSE）；右侧是视频本身。
- 视频永远 muted+loop+autoplay+playsInline，无控件。
- 上面有 "WATCH OUR STORY" 按钮 → 点击弹出完整片（带控件）。

### Pattern B · 模块切换 + 方形视频
- 左侧 4 个 Tab（ONE / NEXT / LENS / ALGOS），右侧大方形视频，切换 Tab 时切换视频源。
- 每段方形视频都是 loop + muted + autoplay。

### Pattern C · 三栏业务索引（PROVIDERS / LIFE SCIENCES / PATIENTS）
- 三个垂直叠放的卡片，hover 后展开方形 380×380 视频（PROVIDERS / LENS / MOBILE）。

## 为深至复用的方案

### A · 首页 Brand Reel
- 在 Hero 下方，加一段全宽 16:9 视频卡片，左侧文案：「在医患之间，AI 正在重塑医疗服务的连续性」，右侧视频。
- 视频内容：超声扫描 + 医患沟通 + AI 数据流交织。

### B · Platform 模块 Tab 切换视频
- 左侧 Tab：Senz Brain · 深小至 / Neuro AI / Senz Models / 三智能体；右侧大方形视频展示对应能力。

### C · 三端业务卡片视频
- ProductsPage 患者/医生/药企 三栏，每端配一段 4:3 短视频，hover 时播放。

### D · NewsPage 头条视频封面卡片
- 头条故事直接用视频封面替代静态图。

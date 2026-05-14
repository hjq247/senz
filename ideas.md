# 深至科技 Senz 官网设计 — 三种风格构想

<response>
<text>

## 方案 A：**Soft Tech Aurora**（柔性光谱科技）

**Design Movement**：融合 Swiss Design 的信息分层与 Apple Vision Pro 的柔光玻璃质感，借鉴 Tempus 的极简白底与 Stripe 的渐变光带。

**Core Principles**
1. "Quiet confidence"：留白充裕，让文字与数据自己说话，而非喧宾夺主。
2. "Luminous gradients as signature"：把用户提供的蓝紫粉渐变（极光色）作为版块之间的柔光桥。
3. "Editorial rhythm"：像期刊一样，交替大标题、引语和卡片，形成阅读节奏。
4. "Motion as punctuation"：只在关键节点用动效（滚动超声、数字进度、光流分隔条）。

**Color Philosophy**
- 基色：纯白 #FFFFFF + 墨黑 #0B0F1E（与 logo 文字一致）
- 主梯度：`#6B8BFF → #A58BFF → #F6A1C9`（来自头条封面图 03/06，蓝→紫→粉的极光渐变）
- 辅色：薄荷绿 #3AD89A（logo 点阵的绿，用于强调、hover、成功状态）
- 静态背景：淡紫薄雾 #F3F0FF、冰蓝 #EAF3FF，营造医疗清透感
- 情绪：专业、温暖、可信赖、面向 2030 的未来

**Layout Paradigm**：非对称网格 + 横向 scroll-snap 版块。Hero 采用左文右动态 canvas 的 60/40 不对称分栏；版块间用"光带分隔符"（一条水平的极光渐变线）作为视觉节拍；部分版块采用 sticky column（左边标题固定，右边内容滚动）。

**Signature Elements**
1. **极光光带（Aurora Ribbon）**：一条贯穿全站的流动渐变 SVG 丝带，像丝绸一样在 Hero、版块分隔、Footer 出现。
2. **Dot Grid 点阵**：取自 logo 左侧的分子点阵，作为版块背景纹理和装饰角标。
3. **玻璃卡片（Frosted Glass）**：产品矩阵、新闻卡片使用 backdrop-blur + 1px 内描边的玻璃质感。

**Interaction Philosophy**：所有交互追求"丝滑与克制"。Hover 时卡片抬升 2px 并亮起边框的极光流光；按钮按下时有轻微的 haptic-feel 缩放；滚动时内容以 blur→clear 的方式入场。

**Animation**
- Hero 超声探头：使用 Canvas 帧序列 scroll-driven（沿用 senz demo 形式），但放在浅色背景上以区分 tempus 风格
- 数字滚动：战略目标"1 亿人"使用 count-up
- 光带位移：`transform: translateX` + `filter: blur(60px)` 缓慢漂移
- 入场：`opacity + translateY(20px)` 渐入，stagger 间隔 80ms
- 光标跟随：Hero 有一圈微弱的极光光晕跟随鼠标

**Typography System**
- 中文标题：思源黑体 Heavy / HarmonyOS Sans Bold（替代方案：站酷高端黑）— 呈现"深至科技头条新闻"那种厚重感
- 英文标题：Space Grotesk Bold 或 Geist Sans（现代、略带几何感）
- 正文：Inter 400/500（中文回退 PingFang SC / Noto Sans SC）
- 数字：Space Grotesk Medium（Tabular）用于数据展示
- Hierarchy：72→48→32→20→16→14，中文字重对比显著（700 vs 400）

</text>
<probability>0.06</probability>
</response>

<response>
<text>

## 方案 B：**Clinical Obsidian**（临床曜石）

**Design Movement**：Brutalist Minimalism + Dark Editorial，类似 Arc Browser 官网与 Linear 的暗色科技气质。

**Core Principles**：深色背景 + 高对比 + 大号字体；信息密度高；用明亮彩色作为"发光"强调色，营造医疗精密仪器感。

**Color Philosophy**：曜石黑 #05070F 为主背景，logo 电光蓝 #1E6BFF 与薄荷绿 #3AD89A 作为点缀霓虹，极光渐变只在 hero 出现一次。

**Layout Paradigm**：全屏栅格+大号排版，Bento-box 式产品矩阵。

**Signature Elements**：霓虹描边卡片、雷达扫描环、医学坐标轴装饰。

**Interaction Philosophy**：精确、机械、带 terminal 回声感。

**Animation**：扫描线、打字机、光点追踪。

**Typography System**：JetBrains Mono + Space Grotesk + 思源黑体。

**备注**：与用户提供的"浅色柔和"配色素材方向相反，仅作为对比备选。

</text>
<probability>0.03</probability>
</response>

<response>
<text>

## 方案 C：**Editorial Gradient Magazine**（杂志式渐变编辑）

**Design Movement**：高端医学期刊 + 时装 Magazine Layout（如 Pentagram for Nature、Apollo Magazine），强调排版与摄影。

**Core Principles**：大图封面+大引号；栏式排版；手绘标注装饰；颜色使用印刷 CMYK 感。

**Color Philosophy**：米白底 + 墨黑文字 + 头条封面图中的印刷粉蓝紫作为"版画油墨"。

**Layout Paradigm**：双栏/三栏不对称网格，像报纸般呈现。

**Signature Elements**：大号引号、拼贴、手写下划线。

**Interaction Philosophy**：优雅、文学性，翻页感。

**Animation**：视差、页面翻转。

**Typography System**：衬线（Noto Serif SC / Source Han Serif）作为标题，与无衬线形成反差。

**备注**：偏"人文"方向，科技感不如方案 A 直接。

</text>
<probability>0.02</probability>
</response>

---

## 最终选择：**方案 A — Soft Tech Aurora**

原因：
1. 与用户提供的 7 张头条封面配色（蓝紫粉极光、玻璃感）高度吻合；
2. 承接 Tempus 的专业白底极简风格；
3. 可以自然容纳 senz demo 站那种"黑色背景鼠标滚动超声动效"作为一个**深色子版块**嵌入硬件部分，形成明暗对比节奏；
4. 对"年轻、聪明、医疗、AI、温暖"几个关键词最兼容。

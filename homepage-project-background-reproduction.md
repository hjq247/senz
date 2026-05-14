# 首页产品区：从「蓝色顶光 / Senz 330」到「使用场景」背景与叙事复现说明

本文与 `docs/homepage-project-module-3d.md`（若已存在）互补：侧重 **网页层背景、光效、分区叙事与滚动节奏**，以及如何与 **Spline 3D** 对齐，复现从开场顶光品牌感一直到 **「使用场景」**（源码中为英文标题 `Usage scenario`）这一段完整观感。

---

## 1. 术语与仓库事实

### 1.1 「使用场景」在代码里的位置

- 模板：`frontend/public/layout/index/sub-layout/project-group-5.ejs`
- 区块类名：`.m-project .group-5`
- 标题文案（当前仓库）：**`Usage scenario`**（非中文「使用场景」）。若线上为中文，需在对应语言模板或 i18n 中替换；样式上 `.lang-zh-cn` 下仅调整字号与间距，见 `module-project.scss` 中 `.lang-zh-cn .m-project .group-5` 相关规则。

### 1.2 「蓝色顶光」「Senz 330」在仓库中的情况

在当前前端仓库内 **未检索到** 字面量「顶光」「330」或「Senz 330」的文案或类名。该类内容通常来自两类来源，复现时需 **两边对齐**：

| 来源 | 说明 |
|------|------|
| **Spline 场景** (`public/spline/project.splinecode`) | 环境光、蓝色顶光、雾、HDRI、机身上的 **文字/铭牌/屏幕 UI**（例如「Senz」「330」）一般在 **Spline 编辑器** 内制作，导出后由 `#projectPreview` 渲染。 |
| **网页层** | `group-1`～`group-5` 的 **图片、SVG 光晕、渐变字、粒子、CSS 叠层**（见下文），叠在或衬在 3D 周围。 |

复现「和设计稿一致」时，建议：**Spline 内灯光 + 机身贴字** 与 **HTML/CSS 光效层** 分工明确，避免两处同时强蓝光导致过曝。

---

## 2. 全局底色（整段滚动的大背景）

- 文件：`frontend/public/assets/style/sub-style/root.scss`
- 变量：`--g--color-bg--default` → **`#020202`**
- `body` 使用该变量作为 `background-color`（`reset.scss`）。

整段产品区滚动时，露出的「页底」接近 **纯黑偏灰**，为后续蓝色 **plus-lighter**、紫蓝渐变提供对比底。

---

## 3. 产品模块 DOM 纵向顺序（必须一致）

文件：`frontend/public/layout/index/module-project.ejs`

从上到下：

1. **`.spline-box`** → `#projectPreview`（主 3D，全段 pin 的触发层之一）
2. **`.group-1`** → 首屏叙事 + 粒子 + 圆形底图 + 四块 SVG 顶光
3. **`.group-2`** → 第二段 Spline `#bgPreview` + LMUT 大字
4. **`.group-3`** → 中段说明文案（渐变字 + ScrollTrigger  scrub 背景位移）
5. **`.group-4`** → 两侧巨型光图 `bg-1` / `bg-2` + 三列文案（Senz physics / Intelligence / uFlow）
6. **`.group-5`** → **使用场景**区块：底图 SVG + 标题 + 副标题渐变字 + **四层 `lighter-layer` 蓝紫光晕** + 横向缩略图跑马灯

任一顺序或类名缺失都会导致 z-index、pin 结束点或光效错位。

---

## 4. 网页层：分区背景与光效（按滚动阶段）

### 4.1 Group-1：首屏 — 粒子 + 圆盘 + 四块 SVG「顶光」+ LMUT 字

**模板**：`frontend/public/layout/index/sub-layout/project-group-1.ejs`

| 元素 | 作用 |
|------|------|
| `#particlesLayer` | 白色粒子（`particlesJS`），配置见 `frontend/public/utils/create-particles.ts`（首页由基类 `initParticlesLayer` 初始化）。 |
| `.layer-bg` | 背景图 `group1/circle.png`，居中靠上，圆形氛围。 |
| `.layer-bg-2` 内 `.lighter-1`～`.lighter-4` | 内联 **SVG**（`lighter-*.svg?source`），全幅覆盖叠放，用于 **顶部/氛围光**（实现上依赖 SVG 自身配色与混合，见样式）。 |
| `.group-title` / `.group-subtitle` | 「LMUT」大字渐变描边感 + 副标题半透明白。 |

**样式**：`frontend/desktop/src/pages/index/style/module-project.scss` → `.m-project .group-1`

- `min-height: 100vh`、`padding-top: 144px` 控制首屏高度与顶距。
- `.group-title` 使用 **径向渐变 + `background-clip: text`** 做亮芯白字效果。

**与 3D 的关系**：主 canvas 在 **`.spline-box`**（`position: absolute; z-index: 50`），group-1 子元素 z-index 20～30，**3D 浮在 group-1 内容之上**；首屏「蓝色顶光」若主要来自 Spline，网页层 SVG 作为 **补充光晕**。

### 4.2 Group-2：第二屏 — 背景 Spline + LMUT

**模板**：`frontend/public/layout/index/sub-layout/project-group-2.ejs`  
**脚本**：`projectGroupAnimate2` 加载 `bg.splinecode` 到 `#bgPreview`，ScrollTrigger 在 `onEnter` / click 触发 `Ellipse` 的 `mouseDown`。

**样式**：`.m-project .group-2`，`height: 100vh`，标题渐变与 group-1 略有差异（灰白过渡），用于区分段落。

### 4.3 Group-3：说明文案 — 竖向渐变「扫光」字

**模板**：`project-group-3.ejs`  
**样式**：`.m-project .group-3 .intro-desc`

- `background: linear-gradient(178deg, #fff … transparent)` + **`background-size: 200% 400%`** + `background-clip: text`。
- **脚本**：`projectGroupAnimate3` 用 ScrollTrigger **scrub** `backgroundPositionY: 70% → 0%`，滚动时字像被「擦亮」。

### 4.4 Group-4：强氛围光 — 两张大图 + plus-lighter

**模板**：`project-group-4.ejs`  
**数据**：`frontend/public/data/index-module-project.ts` → `projectData.group4.list`（三条 Senz 文案）。

**样式**：`.m-project .group-4`

| 类 | 资源 | 要点 |
|----|------|------|
| `.bg-1` | `assets/images/module-project/bg-1.png` | `position: absolute; top: -1600px; right: 0;`，**`mix-blend-mode: plus-lighter`**，大面积蓝色光柱感。 |
| `.bg-2` | `bg-2.png` | `top: -1400px; left: 0;`，同样 **plus-lighter**。 |

复现时 **必须保留** `mix-blend-mode: plus-lighter` 与负 `top` 位移，否则与设计稿光强、位置差异大。

### 4.5 Group-5：「使用场景」— 底图 + 蓝紫标题 + 四层光轮 + 跑马灯

**模板**：`project-group-5.ejs`  
**样式**：`.m-project .group-5`

| 部分 | 说明 |
|------|------|
| `.layer-bg` | `group5/bg.svg` 矢量底纹。 |
| `.group-title` | 「Usage scenario」径向渐变白字。 |
| `.group-subtitle .text-box` | **蓝→紫渐变字**：`linear-gradient(271deg, #3a4dfd 3.03%, #b499ff 105.92%)` + `background-clip: text`。 |
| `.lighter-box` / `.lighter-layer`（4 层） | 同心圆光晕：`mix-blend-mode: plus-lighter`；`::before` 为 **蓝紫径向渐变**（如 `rgb(18 29 144 / 50%)`、`rgb(31 49 242 / 0.5)` 等）；`::after` 为描边圆 + `mask-image` 做上半弧高光。尺寸由 `--size` 控制：**188px / 338px / 526px / 726px**（第二层 **338px** 若与设计「330」为同一视觉尺度，可对齐核对）。 |
| `.slider-box` + `.thumb-list` | 横向缩略图，`mask-image` 左右渐隐；**GSAP** 无限循环位移（`projectGroupAnimate5`）。 |
| `.item-img-box` | 占位比例 **332×199**（`image-placeholder-v4(332, 199, 332px)`），与「330」量级接近时需与设计稿统一。 |

**与 3D「停在使用场景」同步的脚本行为**（`frontend/desktop/src/pages/index/script/module-project/index.ts`）：

- 外层 ScrollTrigger：**`trigger: .spline-box`**，**`pin: true`**，**`endTrigger: .group-5`**，**`end: "center center"`**，**`scrub: 4`**。  
  含义：从进入产品区主 pin 开始，一直滚到 **`.group-5` 垂直中心接近视口中心** 时，**主 pin 与主时间轴结束** → 机身动画走满 `project-spline-state.ts` 最后一帧，视觉上即 **3D 叙事落在「使用场景」屏**。
- **`onLeave`**（滚过该 pin 区间）：对 **`.lighter-layer`** 做 `opacity: 1`、`y: 0`、`stagger`，**点亮 group-5 四层顶光**，强化本屏氛围。
- **`onEnterBack`**：光层收回 `opacity: 0`、`y: 30px`。

复现「停在使用场景」时，需同时满足：**Spline 最后一关键帧姿态** + **上述 ScrollTrigger 的 endTrigger 与 scrub** + **onLeave 光效**；缺一不可。

---

## 5. 主 3D 画布与叠层顺序（避免背景穿帮）

**样式**：`.m-project .spline-box`

- `position: absolute`，**`z-index: 50`**，`width: 100vw`，`max-width: 1920px`，高度约 **`60.142857vw`**。
- **`pointer-events: none`**：滚动事件交给下层 group；交互仅在单独放开 pointer 的区域（如 group-2 点击）处理。
- `#projectPreview`：`top: 50vh` + `translateY(-50%)`，使机身大致在视口中部。

**Group-3** 设 **`z-index: 100`**，保证中段文案在必要时压在 3D 读感之上（按设计决定是否再调）。

---

## 6. 资源清单（网页层复现必备）

以下路径相对于 **`frontend/desktop`** 或 **`frontend/public`**（以文件实际所在包为准）：

| 资源 | 路径 |
|------|------|
| Group1 圆底 | `frontend/public/assets/images/module-project/group1/circle.png` |
| Group1 光 SVG | `group1/lighter-1.svg` … `lighter-4.svg` |
| Group4 顶光大图 | `frontend/public/assets/images/module-project/bg-1.png`、`bg-2.png` |
| Group5 底纹 | `frontend/public/assets/images/module-project/group5/bg.svg` |
| Group5 缩略图 | `frontend/public/data/index-module-project.ts` → `projectData.group5.thumbs` |
| Spline 主场景 | `frontend/desktop/public/spline/project.splinecode` |
| Spline 辅场景 | `frontend/desktop/public/spline/bg.splinecode` |

---

## 7. Spline 侧建议复现项（与「蓝色顶光 / Senz 330」对齐）

仓库不保存 Spline 源工程，仅 **`.splinecode`**。要在网页里复现设计稿：

1. **灯光**：在 Spline 中为「开场」配置 **偏冷色顶光 / rim light**，与网页 `#020202` 底和 group-4 **plus-lighter** 蓝紫光一致；避免输出过曝（网页层还会加光）。
2. **机身文字「Senz」「330」**：在 Spline 内用 **3D Text / 贴图 / UI 平面** 实现，命名保持与交互物体分离；主驱动对象仍为代码中的 **`机身`**（`findObjectByName("机身")`）。
3. **环境与反射**：如需「顶光」反射在机身曲面，在 Spline 调 **金属度/粗糙度/环境贴图**。
4. **与 `progressState` 对齐**：最后一帧机身位姿应 **composition 上落在 group-5 标题旁**（构图需在 Spline + 浏览器联调），因代码只保证 **滚动进度与关键帧同步**，不自动算「相机构图」。

---

## 8. 复现检查清单（自测用）

- [ ] `body` 背景为 **`#020202`**，产品区上下无意外「露白」。
- [ ] `module-project.ejs` 中 **spline-box → group-1 → … → group-5** 顺序未改。
- [ ] `public/spline/project.splinecode`、`bg.splinecode` 与线上路径 `PUBLIC_PATH` 一致，可 200 加载。
- [ ] Group-1：**粒子**出现；**circle + 四 SVG** 位置与混合正常。
- [ ] 主 **ScrollTrigger pin** 持续到 **group-5 中线**，滚完时机身停在设计姿态。
- [ ] 滚入 group-5 后 **onLeave**：**四层 lighter-layer** 亮起；滚回 **onEnterBack** 熄灭。
- [ ] Group-4 **bg-1 / bg-2** 的 **`mix-blend-mode: plus-lighter`** 与负 `top` 保留。
- [ ] Group-5 副标题 **蓝紫渐变** 与 **跑马灯 mask** 正常。
- [ ] 中文站：若标题需「使用场景」，已改模板或语言包，并检查 `.lang-zh-cn` 下字号是否仍可读。

---

## 9. 相关代码索引

| 内容 | 路径 |
|------|------|
| 产品区 DOM | `frontend/public/layout/index/module-project.ejs` |
| 各 group 子模板 | `frontend/public/layout/index/sub-layout/project-group-*.ejs` |
| 背景 / 光效 / z-index | `frontend/desktop/src/pages/index/style/module-project.scss` |
| Pin、endTrigger、lighter onLeave | `frontend/desktop/src/pages/index/script/module-project/index.ts` |
| 机身关键帧 | `frontend/desktop/src/pages/index/script/module-project/project-spline-state.ts` |
| 粒子配置 | `frontend/public/utils/create-particles.ts` |
| 全局背景色变量 | `frontend/public/assets/style/sub-style/root.scss` |

---

*若设计稿中「Senz 330」或顶光强度与当前实现不一致，优先在 Spline 调整灯光与贴图，再微调 `module-project.scss` 中 group-4/5 的透明度与 `--size`，避免仅改一处导致整段亮度失衡。*

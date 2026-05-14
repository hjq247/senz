# 首页产品模块（4.2）3D 展示实现说明

本文说明桌面端首页 `.m-project` 区块中 **Spline 3D + GSAP ScrollTrigger** 的完整实现链路：从资源准备、页面结构、运行时加载到滚动驱动动画。

---

## 1. 心智模型

本模块**不是**在网页中手写 Three.js 网格，而是：

1. 在 **Spline** 编辑器中完成场景与物体，导出 **`.splinecode`**；
2. 页面放置 **`<canvas>`**，使用 **`@splinetool/runtime`** 的 `Application` 加载场景；
3. 使用 **GSAP + ScrollTrigger** 将 **页面滚动进度** 映射为 **普通 JS 对象（`baseState`）上的数值变化**，在每一帧把数值写入 Spline 场景中指定物体的 `position` / `rotation` / `scale`。

**职责划分**：Spline 负责 WebGL 渲染；动画路径与滚动关系由 GSAP 负责；两者通过 **`baseState` 插值 + `onUpdate` 写回物体** 粘合。

项目中运行时从 `@stone/uemo-utils/utils/splinetool` 引入，该文件直接再导出官方包：

- 文件：`tools-uemo/uemo-utils/utils/splinetool.ts`
- 内容：`export * from "@splinetool/runtime";`

---

## 2. 在 Spline 侧需要准备的内容

### 2.1 主产品场景 `project.splinecode`

- 路径（构建后随 `public` 发布）：`frontend/desktop/public/spline/project.splinecode`
- 代码通过 **`findObjectByName("机身")`** 获取要驱动的网格/组，因此场景中目标物体**必须命名为 `机身`**（或同步修改 TS 中的名称）。
- 运行时加载 URL：

  `process.env.PUBLIC_PATH + "spline/project.splinecode"`

  `PUBLIC_PATH` 由 `vue.config.js` / `@stone/vue-config-template` 的 `DefinePlugin` 注入，开发多为 `/`，生产为配置的静态资源前缀。

### 2.2 背景 / 辅助场景 `bg.splinecode`

- 路径：`frontend/desktop/public/spline/bg.splinecode`
- 代码查找 **`Ellipse`**，并调用 **`emitEvent("mouseDown")`**，用于触发 Spline 编辑器内为该对象配置的事件（如状态切换、内置动画）。
- 滚动进入某区间或用户点击 group-2 区域时会触发该事件。

### 2.3 Webpack 与静态资源

- `frontend/desktop/vue.config.js` 中：`{ test: /\.splinecode$/, type: "asset/resource" }` 用于将 **作为模块 import 的** `.splinecode` 打成资源；首页当前使用 **URL + `app.load()`**，主要依赖 **`public/spline/` 被拷贝到产物根目录**。
- 类型声明：`frontend/desktop/types/global.d.ts` 中有 `declare module "*.splinecode";`

---

## 3. 页面结构与样式

### 3.1 HTML（EJS）

公共模板：`frontend/public/layout/index/module-project.ejs`

- 最外层 `.m-project`。
- 顶部 **`.spline-box`** 内 **`<canvas id="projectPreview">`**：主产品 WebGL。
- 依次引入 **group-1 ~ group-5** 子布局（`sub-layout/project-group-*.ejs`）。

group-1 含 `#particlesLayer`、背景层、大标题等，与主 3D 同屏叙事。

group-2 含 **`<canvas id="bgPreview">`**：第二段 Spline 场景。

### 3.2 样式要点

文件：`frontend/desktop/src/pages/index/style/module-project.scss`

- **`.spline-box`**：`position: absolute`，限定宽高比，`z-index: 50`，**`pointer-events: none`**，避免遮挡下方可滚动/可点击内容。
- **`#projectPreview` 所在 canvas**：`top: 50vh` + `translateY(-50%)`，使主 3D 画面大致位于视口垂直中部。
- **`.pin-spacer`**：针对 ScrollTrigger `pin` 生成的占位层做了 `pointer-events` 处理，避免影响交互。

---

## 4. 脚本入口与调用链

- 首页 `IndexPage` 在 `otherTask` 中注册 **`projectModule`** → 实例化 **`ProjectModule`** 并 **`init()`**。
- 文件：`frontend/desktop/src/pages/index/script/module-project/index.ts`
- **`init()`** 仅调用 **`scrollEffect()`**。

---

## 5. 运行时：外层 ScrollTrigger（总控）

`scrollEffect()` 中：

1. 取 **`.m-project`**、**`.spline-box`**（作为 `canvas` 变量实际指向的容器）、**`.group-5`**（`endDom`）。
2. 创建 **GSAP `timeline`**，并为其配置 **`scrollTrigger`**：

| 配置 | 含义 |
|------|------|
| `trigger: canvas`（`.spline-box`） | 以主 3D 容器为滚动触发参考。 |
| `pin: true` | 滚动时钉住主 3D 区域，形成「长滚动 + 固定画面」体验。 |
| `endTrigger: endDom`（`.group-5`） + `end: "center center"` | 滚动结束位置与最后一屏 group 对齐，决定整段 pin + scrub 的总滚动距离。 |
| `scrub: 4` | 时间轴与滚动同步，数值越大跟手越「迟滞平滑」。 |
| `refreshPriority: -100` | 降低刷新优先级，减轻与其它 Trigger 的竞争（按需）。 |
| `onLeave` / `onEnterBack` | 控制 **group-5** 内 **`.lighter-layer`** 的显隐与位移，属 DOM 装饰，非 Spline 内动画。 |

3. **`tl.add(this.projectGroupAnimate1())`**：把 **驱动「机身」位姿** 的子时间轴挂到该可 scrub 的总时间轴上，实现 **滚动进度 ↔ 模型动画进度**。
4. 并列调用 **`projectGroupAnimate2()`**、**`projectGroupAnimate3()`**、**`projectGroupAnimate5()`**（各自内部再建 ScrollTrigger 或 GSAP 动画，逻辑上独立）。

---

## 6. 核心：`projectGroupAnimate1`（主 3D 与滚动绑定）

### 6.1 group-1 额外 pin

对 **`.group-1`** 再创建一个 **`ScrollTrigger.create`**：`pin: true`，`start: "top top"`，`end: "+=1000px"`。

作用：在首段叙事区 **额外增加约 1000px 滚动距离**，便于与主模型关键帧动画对齐。

### 6.2 创建 Application 并加载场景

```ts
const app = new Application(canvas as HTMLCanvasElement);
app.load(process.env.PUBLIC_PATH + "spline/project.splinecode", {}).then(() => {
    animateObj = app.findObjectByName("机身");
});
```

**注意**：`load` 为异步。若在 `animateObj` 赋值前滚动已开始，`updateProjectMode` 会因 `!animateObj` 直接返回，直至加载完成才有位姿更新。联调时需关注弱网或大体积 `.splinecode`。

### 6.3 状态对象与关键帧

文件：`frontend/desktop/src/pages/index/script/module-project/project-spline-state.ts`

- **`baseState`**：当前帧的位置、缩放、欧拉角（角度制）。
- **`progressState`**：多段 keyframes；每段 `duration` 使用 **0～1 区间上的分段长度**（`step1`, `step2 - step1`, …，且 `step7 === 1`），作为归一化时间轴上的权重，便于与 **单条 scrub 时间轴** 对齐。

关键帧通常来自：在 Spline 中摆镜头后记录 Transform，或在浏览器中用固定 `duration` 试跑（文件底部注释为早期原型）。

### 6.4 `updateProjectMode`：写回 Spline 物体

- 从 **`baseState`** 读取 `position*` / `scale*` / `rotation*`。
- **缩放、xy 位置** 乘以 **`getRatio()`**（按 `window.innerWidth` 分段），并配合 **`projectScaleRote`** 与 CSS 变量 **`--project-scale`**（当前实现中 `getProjectScaleRote` 恒为 `1`，预留大屏缩放）。
- **旋转**：`baseState` 中为角度，赋值给运行对象时乘以 **`Math.PI / 180`**。

### 6.5 GSAP 驱动插值

```ts
tl.to(baseState, {
    keyframes: progressState,
    onUpdate: () => {
        updateProjectMode();
    },
});
```

该 `tl` 返回给外层 **`tl.add(...)`**，因此：

**用户滚动 → 外层 ScrollTrigger scrub → 子 timeline 进度变化 → `baseState` 被插值 → `onUpdate` 每帧更新「机身」→ WebGL 重绘。**

### 6.6 `resize`

窗口 `resize` 时节流更新 `ratio`、`--project-scale` 并调用 `updateProjectMode()`，避免断点切换后模型比例异常。

---

## 7. `projectGroupAnimate2`（第二段 Spline）

- 使用 **`#bgPreview`** 与 **`bg.splinecode`**，新建 **`Application`**。
- **`ScrollTrigger`**：`scrub: true`，在 **`onEnter`** 中对 **`Ellipse`** 执行 **`emitEvent("mouseDown")`**。
- **`load` 完成后** 对 **group-2 根节点** 绑定 **click**，同样触发 **`Ellipse`** 的 **`mouseDown`**。

工程建议：若需避免 `app` 在极端情况下未初始化即触发回调，可将 **`ScrollTrigger.create` 移入 `app.load().then(...)`** 内再注册。

---

## 8. `projectGroupAnimate3` 与 `projectGroupAnimate5`

- **group-3**：对 **`.intro-desc`** 做 **`backgroundPositionY` 的 scrub**，纯 CSS 视差，**不涉及 Spline**。
- **group-5**：对 **`.thumb-list`** 做 **无限横向循环动画**（GSAP `modifiers` + `repeat: -1`）；图片来自 **`frontend/public/data/index-module-project.ts`** 的 **`projectData.group5.thumbs`**，**非 3D**。

它们与主「机身」动画共用用户连续下滚的节奏；主 3D pin 的结束点由 **`endTrigger: .group-5`** 锚定。

---

## 9. 与「仅嵌入 Spline」方案的差异

| 方式 | 说明 |
|------|------|
| 仅嵌入 / iframe | 动画多在 Spline 编辑器时间轴或状态机内，网页只负责容器。 |
| 本实现（主产品） | 几何与材质来自 Spline；**位姿动画与整页滚动、pin 区间、响应式比例** 在 **TS + GSAP** 中控制，便于与多段 HTML 叙事严格同步。 |

---

## 10. 从 0 到 1 实施清单（复用）

1. Spline 中建主场景，目标物体命名为 **`机身`**，导出 **`project.splinecode`** 至 **`frontend/desktop/public/spline/`**。  
2. （可选）建 **`bg.splinecode`**，对象 **`Ellipse`** 配置 **`mouseDown`** 行为。  
3. 确认 **`module-project.ejs`** 与各 **`project-group-*.ejs`** 中 **`#projectPreview`**、**`#bgPreview`**、**`.group-*`** 结构完整。  
4. 在 **`project-spline-state.ts`** 中调整 **`baseState`** 与 **`progressState`**，可用固定时长在浏览器中试跑后再接 ScrollTrigger。  
5. 用外层 **`pin` + `scrub` + `endTrigger: .group-5`** 绑定整段体验；子轨 **`tl.to(baseState, { keyframes, onUpdate })`** 驱动 **`机身`**。  
6. 联调：**异步 load**、资源体积、**ScrollTrigger.refresh**（图片/字体导致高度变化）、以及 **group-2** 中 **`ScrollTrigger` 与 `app` 的创建顺序**。

---

## 11. 相关文件索引

| 路径 | 说明 |
|------|------|
| `frontend/public/layout/index/module-project.ejs` | 产品模块 DOM 骨架 |
| `frontend/public/layout/index/sub-layout/project-group-*.ejs` | 各段叙事与 canvas 占位 |
| `frontend/desktop/src/pages/index/script/module-project/index.ts` | `ProjectModule` 主逻辑 |
| `frontend/desktop/src/pages/index/script/module-project/project-spline-state.ts` | `baseState` / `progressState` |
| `frontend/desktop/src/pages/index/style/module-project.scss` | 布局与 pin 相关样式 |
| `frontend/public/data/index-module-project.ts` | group4/group5 等文案与缩略图数据 |
| `frontend/desktop/public/spline/*.splinecode` | Spline 导出资源 |
| `tools-uemo/uemo-utils/utils/splinetool.ts` | 对 `@splinetool/runtime` 的导出 |
| `frontend/desktop/vue.config.js` | `PUBLIC_PATH`、`.splinecode` 规则 |

---

*文档版本与代码同步说明：若重命名 Spline 物体或调整 `endTrigger` / pin 区间，请同步更新本文「Spline 侧」与「ScrollTrigger」两节描述。*

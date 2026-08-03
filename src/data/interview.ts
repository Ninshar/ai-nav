/**
 * 前端 / Flutter 面试题库
 * 按难度（基础 -> 进阶 -> 深入）与主题组织，题目由浅入深。
 */

export type InterviewDifficulty = "basic" | "intermediate" | "advanced";
export type InterviewTopic =
  | "html-css"
  | "javascript"
  | "framework"
  | "browser"
  | "engineering"
  | "flutter";

export const INTERVIEW_DIFFICULTIES: {
  key: InterviewDifficulty;
  label: string;
  order: number;
}[] = [
  { key: "basic", label: "基础", order: 1 },
  { key: "intermediate", label: "进阶", order: 2 },
  { key: "advanced", label: "深入", order: 3 },
];

export const INTERVIEW_TOPICS: { key: InterviewTopic; label: string }[] = [
  { key: "html-css", label: "HTML/CSS" },
  { key: "javascript", label: "JavaScript" },
  { key: "framework", label: "Vue/React" },
  { key: "browser", label: "浏览器" },
  { key: "engineering", label: "工程与性能" },
  { key: "flutter", label: "Flutter" },
];

export interface InterviewQuestion {
  id: string;
  difficulty: InterviewDifficulty;
  topic: InterviewTopic;
  question: string;
  answer: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // ---------- 基础 ----------
  {
    id: "basic-box-model",
    difficulty: "basic",
    topic: "html-css",
    question: "说说 CSS 盒模型，以及 box-sizing 的作用。",
    answer:
      "每个元素由 content、padding、border、margin 构成。标准盒模型中 width 只包含内容区；怪异盒模型（IE）的 width 包含 content、padding、border。box-sizing: border-box 让 width/height 直接包含 padding 和 border，尺寸计算更直观，也是现代重置样式里 *{ box-sizing: border-box } 的由来。",
  },
  {
    id: "basic-flex-grid",
    difficulty: "basic",
    topic: "html-css",
    question: "flex 与 grid 布局的核心区别是什么？各自适合什么场景？",
    answer:
      "flex 是一维布局，沿主轴与交叉轴分配空间，适合一行/一列内部的对齐与伸缩；grid 是二维布局，同时控制行与列，适合整体网格骨架。实践中常配合使用：grid 搭页面结构，flex 处理模块内部。",
  },
  {
    id: "basic-reflow-repaint",
    difficulty: "basic",
    topic: "html-css",
    question: "什么是回流（Reflow）与重绘（Repaint）？如何减少？",
    answer:
      "回流是元素几何属性（宽高、位置、字体）变化时重新计算布局；重绘是颜色、背景等不影响几何的样式变化时重新绘制。回流必然伴随重绘。减少方式：批量修改样式（切换 class）、避免循环中读写布局属性（读写分离）、用 transform/opacity 做动画（走合成层不触发回流）。",
  },
  {
    id: "basic-equality",
    difficulty: "basic",
    topic: "javascript",
    question: "== 与 === 的区别？",
    answer:
      "== 会先做隐式类型转换再比较，例如 1 == \"1\" 为 true；=== 要求类型和值都相等，不转换。日常应优先使用 ===，避免隐式转换带来的意外；仅在明确需要判断 null/undefined 时可利用 null == undefined。",
  },
  {
    id: "basic-closure",
    difficulty: "basic",
    topic: "javascript",
    question: "什么是闭包？它的作用与潜在风险是什么？",
    answer:
      "闭包是函数与其定义时所在词法作用域的引用组合，使内部函数能访问外部函数变量。用途：封装私有变量、柯里化、防抖节流、模块模式。风险：闭包长期持有外部变量引用，若未及时释放可能导致内存泄漏。",
  },
  {
    id: "basic-event-loop",
    difficulty: "basic",
    topic: "javascript",
    question: "介绍一下 JavaScript 的事件循环机制。",
    answer:
      "JS 是单线程的，通过事件循环调度异步任务。执行栈中的同步代码跑完后，先清空微任务队列（Promise.then、queueMicrotask、MutationObserver），再取一个宏任务执行（setTimeout、setInterval、事件回调、I/O），宏任务执行完再清空微任务，循环往复。",
  },
  {
    id: "basic-vif-vshow",
    difficulty: "basic",
    topic: "framework",
    question: "Vue 中 v-if 与 v-show 有什么区别？如何选择？",
    answer:
      "v-if 是真正的条件渲染，不满足时元素不会挂载到 DOM，切换涉及创建/销毁，开销较大但有惰性；v-show 元素始终渲染，只是用 display:none 切换，初始就有渲染成本。频繁切换用 v-show，很少切换用 v-if。",
  },
  {
    id: "basic-component-comm",
    difficulty: "basic",
    topic: "framework",
    question: "Vue 组件之间有哪些常用的通信方式？",
    answer:
      "props 向下传参，emit 事件向上通知；v-model 是 props + emit 的语法糖；provide/inject 支持跨层级注入；ref 可拿到子组件实例；attrs 透传与插槽传递内容；跨组件共享的全局状态交给 Pinia/Vuex。",
  },
  {
    id: "basic-stateless-stateful",
    difficulty: "basic",
    topic: "flutter",
    question: "StatelessWidget 与 StatefulWidget 的区别？",
    answer:
      "StatelessWidget 没有内部可变状态，build 只依赖外部传入参数，重建时直接重新构建；StatefulWidget 持有一个 State 对象，可跨帧保存数据，并调用 setState 标记重建。原则：能用无状态就不用有状态，状态尽量下放到需要它的子树。",
  },
  {
    id: "basic-runapp",
    difficulty: "basic",
    topic: "flutter",
    question: "Flutter 中 runApp() 做了什么？",
    answer:
      "runApp() 接收一个根 Widget，把它挂载为应用根节点：初始化 WidgetsBinding、创建根 Element 与 RenderObject 树，并启动事件循环。整个 Flutter 应用本质上是一棵从根节点开始的 Widget 树。",
  },

  // ---------- 进阶 ----------
  {
    id: "adv-debounce-throttle",
    difficulty: "intermediate",
    topic: "javascript",
    question: "防抖与节流有什么区别？分别适合什么场景？",
    answer:
      "防抖：事件持续触发时不断重置计时器，停止触发 N 毫秒后才执行一次，适合搜索输入、窗口 resize 的收尾操作；节流：固定时间间隔内最多执行一次，适合滚动、拖拽等高频事件。实现都基于定时器或时间戳记录。",
  },
  {
    id: "adv-async-await",
    difficulty: "intermediate",
    topic: "javascript",
    question: "async/await 与 Promise 的关系？错误处理有什么注意点？",
    answer:
      "async 函数总是返回 Promise；await 等价于 then 的语法糖，会暂停函数执行直到 Promise 落定。注意：多个互不依赖的异步任务要用 Promise.all 并行，而不是逐个 await；错误处理用 try/catch 或 .catch，漏接的 rejected Promise 会成为未处理异常。",
  },
  {
    id: "adv-deep-clone",
    difficulty: "intermediate",
    topic: "javascript",
    question: "实现深拷贝需要考虑哪些问题？",
    answer:
      "要处理：循环引用（用 WeakMap 缓存已拷贝对象）、区分数组/普通对象/Date/RegExp/Map/Set、Symbol 键与函数、原型丢失等。日常可直接用 structuredClone（支持循环引用和多数内置类型，但不能拷贝函数与 DOM）；JSON.parse(JSON.stringify()) 会丢 undefined、函数、Symbol 并报错于循环引用。",
  },
  {
    id: "adv-url-to-page",
    difficulty: "intermediate",
    topic: "browser",
    question: "从输入 URL 到页面展示，中间发生了什么？",
    answer:
      "DNS 解析域名 → 建立 TCP 连接（HTTPS 还要 TLS 握手）→ 发送 HTTP 请求 → 服务器返回响应 → 浏览器解析 HTML 构建 DOM，解析 CSS 构建 CSSOM → 合成渲染树 → 布局（Layout）→ 绘制（Paint）→ 合成显示。期间 script 会阻塞解析，可加 defer/async，CSS 与图片等资源并行下载。",
  },
  {
    id: "adv-cache",
    difficulty: "intermediate",
    topic: "browser",
    question: "浏览器缓存的强缓存与协商缓存有什么区别？",
    answer:
      "强缓存（Cache-Control: max-age / Expires）：命中后直接使用本地副本，不发请求；协商缓存（ETag / Last-Modified）：需要向服务器发条件请求（If-None-Match / If-Modified-Since），服务器返回 304 时才复用缓存。强缓存优先于协商缓存，配合使用：强缓存控制不变资源，协商缓存用于可能变化的资源。",
  },
  {
    id: "adv-vue-reactivity",
    difficulty: "intermediate",
    topic: "framework",
    question: "Vue3 的响应式原理是什么？相比 Vue2 有什么改进？",
    answer:
      "Vue3 用 Proxy 代理对象：get 时收集依赖（effect），set 时触发更新。相比 Vue2 的 Object.defineProperty，Proxy 能原生拦截新增/删除属性、数组索引与 length 变化，且不需要递归预遍历。ref 是对基础值的包装，reactive 用于对象；两者底层同一套依赖收集机制。",
  },
  {
    id: "adv-vdom-diff",
    difficulty: "intermediate",
    topic: "framework",
    question: "虚拟 DOM 的作用是什么？diff 算法如何保证性能？",
    answer:
      "虚拟 DOM 用普通 JS 对象描述 UI，数据变化时先在虚拟层 diff 出最小变更集合，再批量操作真实 DOM，减少昂贵的手工 DOM 操作。Vue3 的 diff 采用同层比较、双端对比，配合 key 复用节点；编译期还会做静态提升与 PatchFlags，只对比动态部分。",
  },
  {
    id: "adv-react-hooks",
    difficulty: "intermediate",
    topic: "framework",
    question: "React Hooks 为什么不能在条件语句里调用？useEffect 的依赖数组怎么理解？",
    answer:
      "Hooks 依赖调用顺序与组件实例一一对应，React 靠顺序把 state 关联到具体 hook；条件调用会改变顺序，导致状态错位，因此必须在组件顶层无条件调用。useEffect 的依赖数组决定副作用何时重新执行：空数组只在挂载后执行一次，省略依赖则每次渲染后都执行。",
  },
  {
    id: "adv-flutter-trees",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Flutter 的 Widget / Element / RenderObject 三棵树分别是什么？",
    answer:
      "Widget 是不可变的配置描述，轻量可频繁重建；Element 是 Widget 在树中的实例节点，负责生命周期、diff 与状态持有，通过 type/key 决定复用还是重建；RenderObject 负责布局与绘制。setState 触发 rebuild 后，仅 diff 变化的子树更新对应 RenderObject。",
  },
  {
    id: "adv-flutter-setstate",
    difficulty: "intermediate",
    topic: "flutter",
    question: "setState 做了什么？BuildContext 的用途是什么？",
    answer:
      "setState 把当前 Element 标记为 dirty，并调度到下一帧重建该子树（build 阶段）。BuildContext 本质是 Element 的句柄，用于向上查找祖先，如 Theme、MediaQuery、Navigator、InheritedWidget，是组件访问全局上下文信息的主要途径。",
  },

  // ---------- 深入 ----------
  {
    id: "hard-long-list",
    difficulty: "advanced",
    topic: "engineering",
    question: "上万条数据的长列表如何优化？",
    answer:
      "核心是虚拟滚动：只渲染可视区域（含少量缓冲）的条目，固定高度直接计算，动态高度用估算 + 缓存修正；配合图片懒加载、分页加载、Immutable 数据减小 diff 范围；列表项避免昂贵的重排操作，稳定 key 保证节点复用；超大数据集可放 Web Worker 处理。",
  },
  {
    id: "hard-core-web-vitals",
    difficulty: "advanced",
    topic: "engineering",
    question: "LCP / CLS / INP 是什么？分别如何优化？",
    answer:
      "LCP（最大内容绘制）衡量加载感知：预加载首屏大图、压缩图片、SSR、减少阻塞渲染的脚本；CLS（累计布局偏移）衡量稳定性：为图片/视频/广告预留尺寸、避免在已渲染内容上方插入元素；INP（交互响应）衡量交互延迟：减少长任务、拆分同步计算、优化事件处理器、优先响应用户输入。",
  },
  {
    id: "hard-microfrontend",
    difficulty: "advanced",
    topic: "engineering",
    question: "什么是微前端？主流方案与各自的优缺点？",
    answer:
      "微前端把巨石应用拆成可独立开发、独立部署的子应用，运行时组合。方案：iframe（隔离强但通信与体验差）、single-spa（路由调度框架）、qiankun（single-spa 之上提供 HTML entry 与 JS 沙箱）、Module Federation（Webpack 5 模块共享，运行时加载远端模块）。优点是独立迭代、技术栈异构；代价是体积增大、样式/路由/全局状态冲突、沙箱开销与联调成本。",
  },
  {
    id: "hard-webpack-vite",
    difficulty: "advanced",
    topic: "engineering",
    question: "Webpack 与 Vite 的构建思路有什么本质区别？",
    answer:
      "Webpack 从入口静态分析整个依赖图，打包成 bundle，开发环境也要全量构建，项目变大后启动与热更新变慢；Vite 开发模式利用浏览器原生 ESM，依赖用 esbuild 预构建、源码按需转换，冷启动和 HMR 都更快，生产构建则交给 Rollup。两者都支持 tree-shaking、代码分割与静态资源处理。",
  },
  {
    id: "hard-v8-gc",
    difficulty: "advanced",
    topic: "javascript",
    question: "V8 的垃圾回收机制是怎样的？常见的内存泄漏有哪些？",
    answer:
      "V8 采用分代回收：新生代对象存活短，用 Scavenger 复制算法快速回收，多次存活则晋升老生代；老生代用标记-清除/标记-整理，并配合增量标记、并发清理减少停顿。常见泄漏：未清除的定时器与事件监听、闭包长期持有大对象、意外挂到全局/静态变量的引用、缓存无上限、被移除 DOM 仍被引用。",
  },
  {
    id: "hard-browser-architecture",
    difficulty: "advanced",
    topic: "javascript",
    question: "浏览器为什么采用多进程架构？Web Worker 解决了什么问题？",
    answer:
      "多进程把标签页、GPU、网络、插件等隔离到独立进程，某个页面崩溃或挂起不影响其他页面，安全上进程间也有资源隔离。JS 单线程会阻塞渲染，Worker 提供真正的并行线程执行耗时计算，通过 postMessage 通信，不阻塞 UI；SharedWorker 还能在多个页面间共享。",
  },
  {
    id: "hard-vue3-compile",
    difficulty: "advanced",
    topic: "framework",
    question: "Vue3 在编译期做了哪些性能优化？",
    answer:
      "静态提升：不变的节点只创建一次；PatchFlags：标记动态节点，diff 时只比较变化部分；事件缓存：内联事件处理器复用，避免重复创建；Block Tree：用动态节点列表跳过静态子树；按需引入 runtime 支持 tree-shaking。这些优化让 Vue3 的更新开销大幅低于 Vue2 的全量 diff。",
  },
  {
    id: "hard-flutter-pipeline",
    difficulty: "advanced",
    topic: "flutter",
    question: "Flutter 一帧的渲染管线是怎样的？如何避免掉帧？",
    answer:
      "一帧经历 Build（构建/更新 Widget 树）→ Layout（RenderObject 计算尺寸与位置）→ Paint（生成绘制指令）→ 合成并上屏。60/120fps 意味着每帧预算约 16ms/8ms，超时即掉帧。优化：减少不必要的 rebuild、用 RepaintBoundary 隔离重绘区域、避免 build 中的耗时计算、复杂动画用自定义 RenderObject 或 shader。",
  },
  {
    id: "hard-flutter-state-mgmt",
    difficulty: "advanced",
    topic: "flutter",
    question: "Flutter 状态管理方案如何选型？",
    answer:
      "局部状态优先 setState；跨组件少量共享用 InheritedWidget 或 Provider；中型应用推荐 Riverpod（编译期安全、组合式、可测试性强）；大型项目用 Bloc（事件驱动、逻辑与 UI 分离、便于测试）。原则：状态尽量下沉，不要把 UI 状态都塞进全局。",
  },
  {
    id: "hard-flutter-isolate",
    difficulty: "advanced",
    topic: "flutter",
    question: "Flutter 的 Isolate 与事件循环是什么关系？",
    answer:
      "Isolate 是 Dart 的并发单元，每个 Isolate 拥有独立内存和独立事件循环，通过 SendPort/ReceivePort 传递消息，不能共享变量。主 Isolate 负责 UI，耗时计算放到后台 Isolate（compute 是便捷封装）；async/await 则在单个 Isolate 内基于事件循环实现非阻塞等待。",
  },
];

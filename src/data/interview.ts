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

/** 代码示例语言（对应 highlight.js 注册的语言） */
export type CodeLang = "dart" | "js" | "ts" | "html" | "css" | "bash";

export interface InterviewCode {
  lang: CodeLang;
  source: string;
}

export const INTERVIEW_DIFFICULTIES: {
  key: InterviewDifficulty;
  label: string;
  order: number;
}[] = [
  { key: "basic", label: "基础", order: 1 },
  { key: "intermediate", label: "进阶", order: 2 },
  { key: "advanced", label: "深入", order: 3 },
];

export const INTERVIEW_TOPICS: { key: InterviewTopic; label: string; featured?: boolean }[] = [
  { key: "html-css", label: "HTML/CSS" },
  { key: "javascript", label: "JavaScript" },
  { key: "framework", label: "Vue/React" },
  { key: "browser", label: "浏览器" },
  { key: "engineering", label: "工程与性能" },
  { key: "flutter", label: "Flutter", featured: true },
];

export interface InterviewQuestion {
  id: string;
  difficulty: InterviewDifficulty;
  topic: InterviewTopic;
  question: string;
  answer: string;
  code?: InterviewCode;
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
    code: {
      lang: "js",
      source: `function makeCounter() {
  let count = 0;            // 外部函数变量
  return () => ++count;     // 内部函数捕获它，形成闭包
}

const counter = makeCounter();
counter(); // 1
counter(); // 2`,
    },
  },
  {
    id: "basic-event-loop",
    difficulty: "basic",
    topic: "javascript",
    question: "介绍一下 JavaScript 的事件循环机制。",
    answer:
      "JS 是单线程的，通过事件循环调度异步任务。执行栈中的同步代码跑完后，先清空微任务队列（Promise.then、queueMicrotask、MutationObserver），再取一个宏任务执行（setTimeout、setInterval、事件回调、I/O），宏任务执行完再清空微任务，循环往复。",
    code: {
      lang: "js",
      source: `console.log("1"); // 同步

setTimeout(() => console.log("2"), 0); // 宏任务

Promise.resolve().then(() => console.log("3")); // 微任务

// 输出顺序: 1 -> 3 -> 2`,
    },
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
    code: {
      lang: "dart",
      source: `class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => _count++),
      child: Text('\$_count'),
    );
  }
}`,
    },
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
    code: {
      lang: "js",
      source: `// 防抖：停止触发 delay 后才执行
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 节流：interval 内最多执行一次
function throttle(fn, interval = 300) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    }
  };
}`,
    },
  },
  {
    id: "adv-async-await",
    difficulty: "intermediate",
    topic: "javascript",
    question: "async/await 与 Promise 的关系？错误处理有什么注意点？",
    answer:
      "async 函数总是返回 Promise；await 等价于 then 的语法糖，会暂停函数执行直到 Promise 落定。注意：多个互不依赖的异步任务要用 Promise.all 并行，而不是逐个 await；错误处理用 try/catch 或 .catch，漏接的 rejected Promise 会成为未处理异常。",
    code: {
      lang: "js",
      source: `// 串行（慢）：逐个等待
const a = await fetchA();
const b = await fetchB();

// 并行（快）：互不依赖的任务一起发
const [a2, b2] = await Promise.all([fetchA(), fetchB()]);

// 错误处理
try {
  const data = await fetchData();
} catch (err) {
  console.error(err);
}`,
    },
  },
  {
    id: "adv-deep-clone",
    difficulty: "intermediate",
    topic: "javascript",
    question: "实现深拷贝需要考虑哪些问题？",
    answer:
      "要处理：循环引用（用 WeakMap 缓存已拷贝对象）、区分数组/普通对象/Date/RegExp/Map/Set、Symbol 键与函数、原型丢失等。日常可直接用 structuredClone（支持循环引用和多数内置类型，但不能拷贝函数与 DOM）；JSON.parse(JSON.stringify()) 会丢 undefined、函数、Symbol 并报错于循环引用。",
    code: {
      lang: "js",
      source: `function deepClone(value, cache = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (cache.has(value)) return cache.get(value); // 循环引用

  const clone = Array.isArray(value) ? [] : {};
  cache.set(value, clone);

  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], cache);
  }
  return clone;
}`,
    },
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
    code: {
      lang: "dart",
      source: `setState(() {
  _name = "new name"; // 修改状态
});
// 标记 dirty 后，本帧会重新执行 build`,
    },
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
    code: {
      lang: "dart",
      source: `// compute 在后台 isolate 执行耗时任务，不阻塞 UI
final result = await compute(heavyTask, 1000000);

int heavyTask(int n) {
  var sum = 0;
  for (var i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}`,
    },
  },

  // ---------- 基础（Flutter 补充） ----------
  {
    id: "basic-flutter-what",
    difficulty: "basic",
    topic: "flutter",
    question: "什么是 Flutter？它与 React Native 的核心区别是什么？",
    answer:
      "Flutter 是 Google 的开源跨平台 UI 框架，使用 Dart 语言，一套代码可运行在 Android、iOS、Web、桌面等平台。核心区别：Flutter 自带渲染引擎（Skia/Impeller），UI 直接绘制到画布，不依赖原生控件，跨平台表现一致；React Native 通过 JS 桥接调用原生控件，视觉与行为依赖各平台组件。",
  },
  {
    id: "basic-flutter-everything-widget",
    difficulty: "basic",
    topic: "flutter",
    question: "为什么说 Flutter 里“一切皆 Widget”？",
    answer:
      "Widget 是 Flutter UI 的最小描述单元：组件、布局、手势、主题、路由、动画等都以 Widget 形式存在。页面是一棵 Widget 树，通过组合（嵌套）而不是继承来构建界面，每个 Widget 只负责描述配置，由框架渲染成真实 UI。",
  },
  {
    id: "basic-flutter-build",
    difficulty: "basic",
    topic: "flutter",
    question: "build() 方法的作用是什么？什么时候会被调用？",
    answer:
      "build 根据当前 Widget 与 State 返回子树描述（构建子 widget 树）。调用时机：首次挂载、setState 之后、父级 rebuild 且需要更新、依赖的 InheritedWidget 变化时。build 应保持纯函数：不做耗时计算、不发起网络请求，只负责返回 widget。",
    code: {
      lang: "dart",
      source: `@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: Text(title)),
    body: Center(child: Text('Hello, Flutter')),
  );
}`,
    },
  },
  {
    id: "basic-dart-null-safety",
    difficulty: "basic",
    topic: "flutter",
    question: "Dart 空安全是什么？?、!、late 分别怎么用？",
    answer:
      "空安全让类型系统在编译期区分可空（int?）与不可空（int）类型，默认变量不可为空，从源头减少空指针。? 声明可空类型；! 是非空断言（开发者保证不为空，用错运行时抛错）；late 表示延迟初始化：声明时不必赋值，首次访问时才初始化，常用于无法立即赋值的非空字段。",
    code: {
      lang: "dart",
      source: `int? maybeNull;      // 可空
maybeNull = 42;

String name = maybeNull!.toString(); // 非空断言

late final String lazy = compute();  // 首次访问时才执行`,
    },
  },
  {
    id: "basic-dart-final-const",
    difficulty: "basic",
    topic: "flutter",
    question: "final 与 const 有什么区别？",
    answer:
      "final 是运行期一次性赋值，之后不可改变；const 是编译期常量，值在编译时确定，且 const 对象会被规范化（canonicalize），相同内容复用同一实例。const 的要求更严格：所有字段都必须是编译期可知的常量。",
    code: {
      lang: "dart",
      source: `const pi = 3.14159;         // 编译期常量
final now = DateTime.now();    // 运行期赋值一次

const list = [1, 2, 3];       // 编译期确定的不可变列表`,
    },
  },
  {
    id: "basic-flutter-keys",
    difficulty: "basic",
    topic: "flutter",
    question: "Flutter 中的 Key 是什么？什么时候必须使用？",
    answer:
      "Key 用于在同层级子组件中唯一标识 Element，帮助 diff 阶段正确复用和匹配状态。当列表会增删、排序，或同一父级下出现多个同类型 Widget 时，需要稳定 Key 防止状态串位。常见类型：ValueKey、ObjectKey、UniqueKey、GlobalKey。",
    code: {
      lang: "dart",
      source: `ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, i) => TodoTile(
    key: ValueKey(items[i].id), // 稳定 key
    todo: items[i],
  ),
)`,
    },
  },
  {
    id: "basic-flutter-lifecycle",
    difficulty: "basic",
    topic: "flutter",
    question: "StatefulWidget 的状态生命周期是怎样的？",
    answer:
      "createState 创建 State → initState（只执行一次，初始化资源、注册监听）→ didChangeDependencies（首次 build 前调用，依赖的 InheritedWidget 变化时再次调用）→ build → didUpdateWidget（父级传新配置时调用）→ deactivate → dispose（释放资源、移除监听）。setState 则在任意时刻标记重建。",
    code: {
      lang: "dart",
      source: `@override
void initState() {
  super.initState();
  _controller.addListener(_onTick); // 初始化资源
}

@override
void dispose() {
  _controller.removeListener(_onTick); // 释放资源
  super.dispose();
}`,
    },
  },
  {
    id: "basic-flutter-layout-widgets",
    difficulty: "basic",
    topic: "flutter",
    question: "常见的布局 Widget 有哪些？分别怎么用？",
    answer:
      "Row/Column：线性布局，用 mainAxisAlignment 控制主轴、crossAxisAlignment 控制交叉轴；Stack：层叠布局，配合 Positioned 定位；Container：容器，提供装饰、边距与约束；Expanded/Flexible：在 Flex 中分配剩余空间；ListView/GridView：滚动列表。掌握这几个即可覆盖绝大多数布局需求。",
    code: {
      lang: "dart",
      source: `Row(
  children: [
    Expanded(child: Panel(title: 'A')),
    const SizedBox(width: 12),
    Expanded(flex: 2, child: Panel(title: 'B')),
  ],
)`,
    },
  },

  // ---------- 进阶（Flutter 补充） ----------
  {
    id: "adv-flutter-state-classes",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Flutter 中状态分哪几类？什么是状态提升？",
    answer:
      "状态分两类：ephemeral（局部状态，如开关、输入框，用 setState 管理）与 app state（跨页面共享、需要持久化的业务状态，交给 Provider/Riverpod/Bloc）。状态提升：把多个子组件共享的状态放到最近的共同父组件，通过构造参数与回调下发，保证单一数据源。",
    code: {
      lang: "dart",
      source: `class Parent extends StatefulWidget {
  // 状态放在父级，由父级统一管理
}

class Child extends StatelessWidget {
  final int count;
  final VoidCallback onIncrement;
  const Child({required this.count, required this.onIncrement, super.key});

  @override
  Widget build(BuildContext context) {
    return TextButton(onPressed: onIncrement, child: Text('\$count'));
  }
}`,
    },
  },
  {
    id: "adv-flutter-navigator",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Navigator 的路由栈模型是怎样的？如何实现页面间传参？",
    answer:
      "Navigator 维护一个 Route 栈：push 压入新页面并播放过渡动画，pop 出栈返回上一页，pushReplacement 替换栈顶，pushNamed 走命名路由。传参方式：页面构造函数参数、命名路由的 arguments、pop 时携带返回值（pop(result)，由 push 的 Future 接收）。",
    code: {
      lang: "dart",
      source: `// 打开详情页，等待返回结果
final result = await Navigator.push<String>(
  context,
  MaterialPageRoute(builder: (_) => const DetailPage(item: item)),
);

// 详情页内返回结果
Navigator.pop(context, "updated");`,
    },
  },
  {
    id: "adv-flutter-future-stream",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Future 与 Stream 有什么区别？各自适合什么场景？",
    answer:
      "Future 表示单个异步结果，最终 resolve 或 reject 一次，适合网络请求、文件读写；Stream 是异步事件序列，可多次产生数据，支持 listen、map、where 等操作，适合进度通知、WebSocket 消息、定时器。Stream 可以广播（broadcast）给多个订阅者。",
    code: {
      lang: "dart",
      source: `// Future：一次结果
Future<String> fetchData() async {
  await Future.delayed(const Duration(milliseconds: 200));
  return "data";
}

// Stream：多次事件
final ticks = Stream.periodic(const Duration(seconds: 1), (i) => i);
ticks.listen((v) => print('tick: \$v'));`,
    },
  },
  {
    id: "adv-flutter-changenotifier",
    difficulty: "intermediate",
    topic: "flutter",
    question: "ChangeNotifier 与 ValueNotifier 的作用是什么？",
    answer:
      "ChangeNotifier 是 Flutter 内置的可观察对象：addListener 注册监听，notifyListeners() 通知所有监听者；ValueNotifier<T> 是其子类，带 value 字段，给 value 赋值会自动通知。它们是 Provider 等状态管理库的底层机制，也适合替代 setState 做局部状态共享。",
    code: {
      lang: "dart",
      source: `class CartModel extends ChangeNotifier {
  final List<String> _items = [];
  List<String> get items => List.unmodifiable(_items);

  void add(String item) {
    _items.add(item);
    notifyListeners(); // 通知监听者
  }
}

final cart = CartModel();
cart.addListener(() => print(cart.items));`,
    },
  },
  {
    id: "adv-flutter-perf-basics",
    difficulty: "intermediate",
    topic: "flutter",
    question: "const 构造与 RepaintBoundary 对性能有什么影响？",
    answer:
      "const Widget 在编译期固定，重建时直接复用同一实例，跳过实例化与部分 diff 开销；RepaintBoundary 把子树隔离成独立图层，重绘只发生在该图层内，不重绘整页。适合：动画区域、频繁变化的列表项、昂贵绘制的内容。注意图层过多会增加 GPU 内存。",
  },
  {
    id: "adv-flutter-animation",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Flutter 动画系统的基本组成是什么？",
    answer:
      "AnimationController 驱动动画进度（0-1，可 repeat/reverse，需要 vsync）；Tween 做数值插值（如 OffsetTween、ColorTween）；CurvedAnimation 定义缓动曲线；AnimatedBuilder/AnimatedWidget 监听动画变化并重建。隐式动画（AnimatedContainer 等）内部封装了这些机制，声明式使用更简单。",
    code: {
      lang: "dart",
      source: `class _FadeState extends State<FadeBox>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 400),
  );

  @override
  void dispose() {
    _controller.dispose(); // 必须释放
    super.dispose();
  }
}`,
    },
  },
  {
    id: "adv-flutter-platform-channel",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Flutter 如何与原生平台通信？",
    answer:
      "通过 Platform Channel：MethodChannel 做方法调用（双向）、EventChannel 接收原生事件流、BasicMessageChannel 发送任意消息。Dart 侧用 invokeMethod 调用原生方法，原生侧（Android/iOS）注册 MethodCallHandler 处理并返回结果。通道名需全局唯一。",
    code: {
      lang: "dart",
      source: `static const _channel = MethodChannel("app/battery");

Future<int> getBatteryLevel() async {
  final level = await _channel.invokeMethod<int>("getBatteryLevel");
  return level ?? 0;
}`,
    },
  },
  {
    id: "adv-flutter-json",
    difficulty: "intermediate",
    topic: "flutter",
    question: "Flutter 中 JSON 序列化怎么做？",
    answer:
      "简单场景用 jsonDecode 得到 Map，手写 fromJson/toJson 转换；模型较多时用 json_serializable 加 build_runner 自动生成。注意类型：JSON 数字是 num，需按字段转 int/double；嵌套对象与 List 要逐层转换。手写时保持字段名与后端契约一致。",
    code: {
      lang: "dart",
      source: `class User {
  final String name;
  final int age;
  const User(this.name, this.age);

  factory User.fromJson(Map<String, dynamic> json) =>
      User(json['name'] as String, json['age'] as int);

  Map<String, dynamic> toJson() => {'name': name, 'age': age};
}

final user = User.fromJson(jsonDecode(raw) as Map<String, dynamic>);`,
    },
  },

  // ---------- 深入（Flutter 补充） ----------
  {
    id: "hard-flutter-threads",
    difficulty: "advanced",
    topic: "flutter",
    question: "Flutter 的 UI 线程与 Raster 线程如何分工？什么是 jank？",
    answer:
      "UI 线程（Dart isolate）执行 build、layout、paint，产出绘制指令；Raster 线程（Engine 原生线程）把指令栅格化并上屏，两者流水线并行。60fps 单帧预算约 16.6ms，UI 或 Raster 任一环节超时就会掉帧，即 jank。可通过 PerformanceOverlay、DevTools Timeline 观察瓶颈在哪个线程。",
  },
  {
    id: "hard-flutter-engine-arch",
    difficulty: "advanced",
    topic: "flutter",
    question: "Flutter 的三层架构（Embedder / Engine / Framework）分别负责什么？",
    answer:
      "Embedder（嵌入层）：平台适配，负责 Surface 创建、线程模型、事件循环接入，Android/iOS/Web 各自实现；Engine（引擎层）：C++ 实现，包含渲染（Skia/Impeller）、文字排版、Dart 运行时、Platform Channel；Framework（框架层）：Dart 编写，提供 Widgets、Rendering、Animation、Material/Cupertino 等 UI 库。",
  },
  {
    id: "hard-flutter-skia-impeller",
    difficulty: "advanced",
    topic: "flutter",
    question: "为什么 Flutter 自绘 UI 而不用原生控件？Skia 与 Impeller 是什么关系？",
    answer:
      "自绘保证跨平台渲染一致、动画流畅，不依赖各平台控件实现差异，也便于深度优化。Skia 是传统的 2D 图形库，Flutter 长期使用它，但 iOS 上首帧 shader 编译曾造成卡顿；Impeller 是 Flutter 自研的 GPU 渲染引擎，预编译 shader，解决了 iOS 首帧抖动问题，目前已是默认渲染后端，Skia 作为备用实现保留。",
  },
  {
    id: "hard-flutter-custom-renderobject",
    difficulty: "advanced",
    topic: "flutter",
    question: "什么时候需要自定义 RenderObject？",
    answer:
      "当组合现有 Widget 无法满足布局或绘制需求时：例如实现自定义布局算法（瀑布流、环形菜单）、对绘制性能有极高要求（直接操作 Canvas）、需要细粒度命中测试。做法：继承 RenderBox（或 RenderShiftedBox 等），重写 performLayout、size 计算与 paint；通常配合自定义 RenderObjectWidget 使用。",
  },
  {
    id: "hard-flutter-globalkey",
    difficulty: "advanced",
    topic: "flutter",
    question: "GlobalKey 的用途是什么？使用时要注意什么？",
    answer:
      "GlobalKey 全局唯一，可在树中跨层级访问对应的 Element 或 State：如获取子组件 State 调用方法（FormState.validate）、测量组件位置尺寸。注意：开销较高，同一时刻一个 GlobalKey 只能挂在一个组件上；不要在动态列表项里大量使用，避免状态与位置错乱。",
    code: {
      lang: "dart",
      source: `final _formKey = GlobalKey<FormState>();

void _submit() {
  // 通过 GlobalKey 拿到子组件的 State 并调用方法
  if (_formKey.currentState!.validate()) {
    _formKey.currentState!.save();
  }
}`,
    },
  },
  {
    id: "hard-flutter-hot-reload",
    difficulty: "advanced",
    topic: "flutter",
    question: "Hot Reload 的实现原理是什么？与 Hot Restart 有何区别？",
    answer:
      "Hot Reload 依赖 Dart VM 的 JIT：把更新后的源码编译注入运行中的 VM，保留应用 State，重新执行 build 并 diff 更新渲染树，秒级生效；Hot Restart 则重建整个应用（重新运行 main），State 全部重置，用于修改了初始化逻辑、全局变量等场景。Release 模式无 JIT，不支持热重载。",
  },
  {
    id: "hard-flutter-memory",
    difficulty: "advanced",
    topic: "flutter",
    question: "Flutter 常见的内存问题有哪些？如何排查与优化？",
    answer:
      "常见问题：未在 dispose 中取消的监听/定时器/StreamSubscription、全局静态引用大对象、图片未缩略导致缓存膨胀、闭包长期持有 Context、循环引用。优化：dispose 里清理资源、图片设置 cacheWidth/cacheHeight 或缩略图、合理设置 ImageCache 上限、用 DevTools Memory 与 leak_tracker 定位泄漏。",
  },
];

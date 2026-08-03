# AI 应用导航

一个纯前端 AI 应用导航站：聚合主流 AI 工具，支持按场景筛选、搜索、排序、收藏与提交推荐。

## 技术栈

- 原生 HTML + CSS + JavaScript（ES Modules）
- 无框架、无构建步骤、无第三方运行时依赖（图标与 favicon 走 CDN）
- Node.js 仅用于本地开发服务器与数据校验

## 快速开始

```bash
npm run dev        # 启动开发服务器，默认 http://localhost:5173
npm run check      # 校验数据完整性（id 唯一、分类引用有效）
```

> 注意：由于使用了 ES Modules，页面需要经 HTTP 服务访问（直接用 `file://` 打开会被浏览器拦截），这也是工程化后的标准做法。

## 目录结构

```
ai-nav/
├── index.html            # 页面骨架（结构 + 组件挂载点）
├── package.json          # npm scripts（dev / check）
├── scripts/
│   ├── serve.mjs         # 零依赖静态开发服务器
│   └── check.mjs         # 数据完整性校验
├── styles/               # 按组件拆分的样式
│   ├── variables.css     # 主题变量（亮色 / 暗色）
│   ├── base.css          # 重置、排版与通用原子类（按钮、标签、收藏按钮）
│   ├── layout.css        # 顶栏、搜索、页脚
│   ├── hero.css          # 首屏与 Logo 云
│   ├── sidebar.css       # 侧边分类与收藏入口
│   ├── tools.css         # 工具区：筛选、排序、卡片网格
│   ├── modal.css         # 详情弹窗与提交表单
│   ├── toast.css         # 轻提示
│   └── responsive.css    # 全部响应式断点
└── js/
    ├── app.js            # 入口：装配各组件
    ├── core/
    │   ├── store.js      # 全局状态仓库（订阅/发布）
    │   └── storage.js    # localStorage 读写封装
    ├── data/
    │   ├── categories.js # 分类定义
    │   ├── index.js      # 数据聚合出口
    │   └── tools/        # 每个分类一个数据文件
    ├── utils/
    │   ├── dom.js        # DOM 查询与 body 滚动锁
    │   ├── format.js     # 转义、计数格式化、颜色、首字母
    │   └── icons.js      # favicon 地址/回退与 lucide 图标刷新
    └── components/       # 页面组件：每个组件自管渲染与事件
        ├── topbar.js
        ├── hero.js
        ├── sidebar.js
        ├── toolGrid.js
        ├── toolModal.js
        ├── submitModal.js
        └── toast.js
```

## 维护指南

### 新增一款应用

1. 打开对应分类文件 `js/data/tools/<category-key>.js`；
2. 在数组中追加一条记录，字段参考现有条目：

   ```js
   {
     id: "my-tool",        // 全局唯一，用作收藏与详情标识
     name: "My Tool",
     domain: "mytool.com",
     url: "https://mytool.com",
     desc: "一句话介绍",
     category: "assistant",   // 必须是 categories.js 中存在的 key
     tags: ["标签"],
     rating: 4.5,
     favs: 1000,
     pricing: "免费",         // 免费筛选匹配：免费 / 免费额度 / 开源
     platforms: ["Web"],
     featured: false,
     added: "2026-08",        // 用于“最新收录”排序
   }
   ```

3. 运行 `npm run check` 确认数据无误。

### 新增一个分类

1. 在 `js/data/categories.js` 中追加分类（`key`、`label`、`icon`、`color`）；
2. 新建 `js/data/tools/<key>.js`，并在 `js/data/index.js` 中引入、合并；
3. 图标名称需为 [lucide](https://lucide.dev) 支持的图标名。

### 状态与组件约定

- 全局状态集中在 `js/core/store.js`，组件通过 `subscribe` 订阅变更、通过动作函数修改状态，互不直接引用；
- 组件只通过 `document.getElementById` 获取自己的挂载点，事件监听与渲染均在自己的模块内完成；
- 新增组件：在 `js/components/` 下新建文件，并在 `js/app.js` 中调用初始化函数。

## 浏览器存储键

| 键 | 用途 |
| --- | --- |
| `ai-nav-theme` | 明暗主题 |
| `ai-nav-favs` | 收藏的应用 id 列表 |
| `ai-nav-submissions` | 用户提交的应用（待审核） |

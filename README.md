# AI 应用导航

一个纯前端 AI 应用导航站：聚合主流 AI 工具，支持按场景筛选、搜索、排序、收藏与提交推荐；并内置模型能力排名页，可按综合或专项维度查看大模型榜单。

## 技术栈

- [Vite](https://vitejs.dev) + [Vue 3](https://vuejs.org)（组合式 API / SFC）+ [TypeScript](https://www.typescriptlang.org)
- [Pinia](https://pinia.vuejs.org)：全局状态（筛选、排序、收藏、主题、弹窗）
- [Vue Router](https://router.vuejs.org)：hash 模式路由（应用导航 / 模型排名）
- [lucide-vue-next](https://lucide.dev)：图标组件
- [Vitest](https://vitest.dev)：数据完整性测试
- GitHub Actions 自动构建并部署到 GitHub Pages

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 开发服务器 http://localhost:5173
npm run check    # 类型检查 + 数据完整性测试
npm run build    # 类型检查 + 生产构建到 dist/
npm run preview  # 本地预览构建产物
```

## 目录结构

```
ai-nav/
├── index.html               # Vite 入口（挂载 #app）
├── vite.config.ts           # 构建配置（base: "./" 兼容子目录部署）
├── tsconfig.json            # TS 严格模式配置
├── .github/workflows/       # GitHub Actions 自动部署
└── src/
    ├── main.ts              # 应用入口：挂载 Vue + Pinia + 全局样式
    ├── App.vue              # 页面骨架：顶栏、路由视图、页脚、弹窗
    ├── router/
    │   └── index.ts         # 路由（hash 模式，兼容 GitHub Pages 刷新）
    ├── data/
    │   ├── types.ts         # Category / Tool 类型定义
    │   ├── categories.ts    # 分类定义
    │   ├── models.ts        # 模型能力数据与维度定义
    │   ├── index.ts         # 数据聚合出口（TOOLS / CATEGORY_MAP / FREE_PRICING）
    │   ├── __tests__/       # Vitest 数据完整性测试
    │   └── tools/           # 每个分类一个数据文件
    ├── stores/
    │   ├── app.ts           # 全局状态：筛选/排序/收藏/主题/弹窗
    │   └── toast.ts         # 轻提示状态
    ├── utils/
    │   ├── storage.ts       # localStorage 读写封装
    │   ├── format.ts        # 计数格式化、颜色、首字母
    │   └── icons.ts         # favicon 服务与分类图标映射
    ├── components/          # 页面组件（样式随组件走 SFC）
    │   ├── TopBar.vue / Hero.vue / ToolsSection.vue / Sidebar.vue
    │   ├── ToolGrid.vue / ToolCard.vue / FaviconImg.vue
    │   ├── ToolModal.vue / SubmitModal.vue / Toast.vue
    ├── views/
    │   ├── HomeView.vue     # 应用导航首页
    │   └── ModelsView.vue   # 模型能力排名页
    └── styles/              # 全局样式
        ├── variables.css    # 主题变量（亮色 / 暗色）
        ├── base.css         # 重置与通用原子类
        └── modal.css        # 弹窗共享样式
```

## 维护指南

### 新增一款应用

1. 打开对应分类文件 `src/data/tools/<分类key>.ts`；
2. 在数组中追加一条记录（字段由 `Tool` 类型约束，`category` 必须是合法的 `CategoryKey`，类型错误在 `npm run check` 时直接暴露）：

   ```ts
   {
     id: "my-tool",        // 全局唯一
     name: "My Tool",
     domain: "mytool.com",
     url: "https://mytool.com",
     desc: "一句话介绍",
     category: "assistant",
     tags: ["标签"],
     rating: 4.5,
     favs: 1000,
     pricing: "免费",       // 免费筛选匹配：免费 / 免费额度 / 开源
     platforms: ["Web"],
     featured: false,
     added: "2026-08",      // 用于“最新收录”排序
   }
   ```

3. 运行 `npm run check`（类型检查 + id 唯一性等数据测试）。

### 新增一个分类

1. 在 `src/data/types.ts` 的 `CategoryKey` 联合类型中加入 key；
2. 在 `src/data/categories.ts` 追加分类（`key`、`label`、`icon`、`color`）；
3. 在 `src/utils/icons.ts` 的 `CATEGORY_ICONS` 中映射对应的 lucide 图标组件；
4. 新建 `src/data/tools/<key>.ts`，并在 `src/data/index.ts` 中引入、合并。

### 维护模型排名

1. 编辑 `src/data/models.ts` 中的 `MODELS` 数组；
2. 每条记录包含六个维度分数（`reasoning / coding / writing / multimodal / chinese / value`，0-100），综合得分自动计算；
3. 如需新增维度，同步更新 `ModelDimension` 类型、`MODEL_DIMENSIONS` 列表与每条记录的 `scores`；
4. 运行 `npm run check` 校验数据（id 唯一、分数范围、综合排名合理性）。

### 状态与组件约定

- 全局状态集中在 `src/stores/app.ts`，组件通过 `useAppStore()` 读写，互不直接耦合；
- 组件按 SFC 组织，样式写在各自的 `<style scoped>` 中；跨组件共享的样式（变量、原子类、弹窗）放 `src/styles/`；
- 新增组件：在 `src/components/` 下新建 `.vue` 文件，在 `App.vue` 中引入即可。

## 部署

推送到 `main` 分支后，GitHub Actions 自动执行 `npm run check` 与 `npm run build`，并将 `dist/` 发布到 GitHub Pages：
<https://ninshar.github.io/ai-nav/>

## 浏览器存储键

| 键 | 用途 |
| --- | --- |
| `ai-nav-theme` | 明暗主题 |
| `ai-nav-favs` | 收藏的应用 id 列表 |
| `ai-nav-submissions` | 用户提交的应用（待审核） |

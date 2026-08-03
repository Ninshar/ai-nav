/**
 * 分类定义
 * - key:  分类标识，同时用于 tools/<key>.js 数据文件命名
 * - icon: lucide 图标名（https://lucide.dev）
 * - color: 主题色，用于图标与卡片高亮
 */
export const CATEGORIES = [
  { key: "assistant", label: "对话助手", icon: "messages-square", color: "#16a34a" },
  { key: "code", label: "编程开发", icon: "code-2", color: "#2563eb" },
  { key: "image", label: "图像设计", icon: "image", color: "#ea580c" },
  { key: "video", label: "视频音频", icon: "clapperboard", color: "#db2777" },
  { key: "office", label: "效率办公", icon: "briefcase", color: "#0d9488" },
  { key: "search", label: "搜索研究", icon: "search", color: "#4f46e5" },
  { key: "life", label: "生活娱乐", icon: "smile", color: "#ca8a04" },
  { key: "data", label: "数据分析", icon: "chart-column-big", color: "#0891b2" },
];

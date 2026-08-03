/**
 * 数据聚合出口：所有业务代码统一从这里导入数据。
 */
import type { Category, Tool } from "./types";
import { CATEGORIES } from "./categories";
import { TOOLS as assistantTools } from "./tools/assistant";
import { TOOLS as codeTools } from "./tools/code";
import { TOOLS as imageTools } from "./tools/image";
import { TOOLS as videoTools } from "./tools/video";
import { TOOLS as officeTools } from "./tools/office";
import { TOOLS as searchTools } from "./tools/search";
import { TOOLS as lifeTools } from "./tools/life";
import { TOOLS as dataTools } from "./tools/data";

export type { Category, CategoryKey, Tool } from "./types";
export { CATEGORIES };

/** 全部应用（保持分类定义顺序） */
export const TOOLS: Tool[] = [
  ...assistantTools,
  ...codeTools,
  ...imageTools,
  ...videoTools,
  ...officeTools,
  ...searchTools,
  ...lifeTools,
  ...dataTools,
];

/** key -> 分类对象，避免到处遍历查找 */
export const CATEGORY_MAP: Map<Category["key"], Category> = new Map(
  CATEGORIES.map((c) => [c.key, c]),
);

/** 免费筛选匹配的定价档位 */
export const FREE_PRICING: readonly string[] = ["免费", "免费额度", "开源"];

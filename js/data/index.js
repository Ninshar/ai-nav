/**
 * 数据聚合出口：所有业务代码统一从这里导入数据。
 */
import { CATEGORIES } from "./categories.js";
import { TOOLS as assistantTools } from "./tools/assistant.js";
import { TOOLS as codeTools } from "./tools/code.js";
import { TOOLS as imageTools } from "./tools/image.js";
import { TOOLS as videoTools } from "./tools/video.js";
import { TOOLS as officeTools } from "./tools/office.js";
import { TOOLS as searchTools } from "./tools/search.js";
import { TOOLS as lifeTools } from "./tools/life.js";
import { TOOLS as dataTools } from "./tools/data.js";

export { CATEGORIES };

/** 全部应用（保持分类定义顺序） */
export const TOOLS = [
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
export const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.key, c]));

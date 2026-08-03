/**
 * 数据完整性校验
 * 用法：npm run check
 * 检查：应用 id 唯一、分类引用有效、必填字段完整。
 */
import { CATEGORIES, CATEGORY_MAP, TOOLS } from "../js/data/index.js";

const errors = [];
const seenIds = new Set();

for (const tool of TOOLS) {
  if (seenIds.has(tool.id)) errors.push(`重复的应用 id: ${tool.id}`);
  seenIds.add(tool.id);

  if (!CATEGORY_MAP.has(tool.category)) {
    errors.push(`${tool.id} 引用了不存在的分类: ${tool.category}`);
  }

  for (const field of ["name", "domain", "url", "desc", "category", "pricing", "added"]) {
    if (!tool[field]) errors.push(`${tool.id} 缺少字段: ${field}`);
  }
  if (typeof tool.rating !== "number" || typeof tool.favs !== "number") {
    errors.push(`${tool.id} 的 rating/favs 必须是数字`);
  }
  if (!Array.isArray(tool.tags) || !Array.isArray(tool.platforms)) {
    errors.push(`${tool.id} 的 tags/platforms 必须是数组`);
  }
}

if (errors.length) {
  console.error(`发现 ${errors.length} 个问题：`);
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

console.log(`✓ 数据校验通过：${TOOLS.length} 款应用、${CATEGORIES.length} 个分类`);

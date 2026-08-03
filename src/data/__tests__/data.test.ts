import { describe, expect, it } from "vitest";
import { CATEGORIES, CATEGORY_MAP, TOOLS } from "../index";

describe("数据完整性", () => {
  it("应用 id 全局唯一", () => {
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("应用引用的分类都存在", () => {
    for (const tool of TOOLS) {
      expect(CATEGORY_MAP.has(tool.category), `${tool.id} 引用了不存在的分类: ${tool.category}`).toBe(true);
    }
  });

  it("分类 key 唯一且与图标映射一致", () => {
    const keys = CATEGORIES.map((c) => c.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const cat of CATEGORIES) {
      expect(CATEGORY_MAP.get(cat.key)?.key, `分类 ${cat.key} 未进入 CATEGORY_MAP`).toBe(cat.key);
    }
  });

  it("必填字段完整", () => {
    const required = ["id", "name", "domain", "url", "desc", "category", "pricing", "added"] as const;
    for (const tool of TOOLS) {
      for (const field of required) {
        expect(Boolean(tool[field]), `${tool.id} 缺少字段: ${field}`).toBe(true);
      }
      expect(typeof tool.rating).toBe("number");
      expect(typeof tool.favs).toBe("number");
      expect(Array.isArray(tool.tags)).toBe(true);
      expect(Array.isArray(tool.platforms)).toBe(true);
    }
  });
});

import { describe, expect, it } from "vitest";
import { MODEL_DIMENSIONS, MODELS, overallScore } from "../models";

describe("模型数据完整性", () => {
  it("模型 id 全局唯一", () => {
    const ids = MODELS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("各维度分数在 0-100 之间", () => {
    for (const model of MODELS) {
      for (const dim of MODEL_DIMENSIONS) {
        const score = model.scores[dim.key];
        expect(score, `${model.id} 的 ${dim.label} 分数非法: ${score}`).toBeGreaterThanOrEqual(0);
        expect(score, `${model.id} 的 ${dim.label} 分数非法: ${score}`).toBeLessThanOrEqual(100);
      }
    }
  });

  it("综合得分正确计算且最高分模型在前三", () => {
    const ranked = [...MODELS].sort((a, b) => overallScore(b) - overallScore(a));
    const topIds = ranked.slice(0, 3).map((m) => m.id);
    for (const id of ["claude-fable-5", "gpt-5.6-sol", "gemini-3.1-pro"]) {
      expect(topIds, `前三应包含 ${id}，实际: ${topIds.join(", ")}`).toContain(id);
    }
  });

  it("必填字段完整", () => {
    const required = ["id", "name", "company", "domain", "url", "desc", "contextWindow", "release", "pricing"];
    for (const model of MODELS) {
      for (const field of required) {
        expect(Boolean(model[field as keyof typeof model]), `${model.id} 缺少字段: ${field}`).toBe(true);
      }
    }
  });
});

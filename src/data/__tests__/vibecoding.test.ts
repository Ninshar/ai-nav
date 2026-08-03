import { describe, expect, it } from "vitest";
import { TOOLS } from "../index";
import { VIBE_TOOL_IDS, VIBE_WORKFLOW } from "../vibecoding";

describe("Vibe Coding 数据完整性", () => {
  it("推荐工具都存在于应用数据中", () => {
    const ids = new Set(TOOLS.map((t) => t.id));
    for (const toolId of VIBE_TOOL_IDS) {
      expect(ids.has(toolId), `缺少工具数据: ${toolId}`).toBe(true);
    }
  });

  it("工作流与最佳实践内容非空", () => {
    expect(VIBE_WORKFLOW.length).toBeGreaterThan(0);
    for (const step of VIBE_WORKFLOW) {
      expect(step.title.length > 0 && step.desc.length > 0).toBe(true);
    }
  });
});

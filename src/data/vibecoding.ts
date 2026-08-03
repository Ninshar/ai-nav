/**
 * Vibe Coding 指南内容：工作流、最佳实践、注意事项与推荐工具。
 * 推荐工具通过 toolId 引用 src/data/tools 中的现有数据，避免重复维护。
 */

export interface VibeWorkflowStep {
  title: string;
  desc: string;
}

export const VIBE_INTRO =
  "Vibe Coding（氛围编程）指用自然语言描述需求，让 AI 模型直接生成、修改和维护代码的开发方式。开发者从\"写每一行代码\"转变为\"描述意图 + 审查结果\"，特别适合原型、工具站、内部系统与学习探索。";

export const VIBE_WORKFLOW: VibeWorkflowStep[] = [
  {
    title: "明确需求",
    desc: "把目标、边界和验收标准写成自然语言：做什么、给谁用、什么算完成。需求越具体，生成质量越高。",
  },
  {
    title: "选对工具",
    desc: "按场景选择：对话式（ChatGPT / Claude）适合讨论与单文件任务，编辑器内助手（Cursor / Windsurf）适合改项目，全自动生成器（Bolt / Lovable / v0）适合快速搭原型。",
  },
  {
    title: "生成与迭代",
    desc: "小步生成、逐步验证。让 AI 先读项目结构和现有代码再动手，一次只改一个主题，改完立刻看效果。",
  },
  {
    title: "测试与修正",
    desc: "把报错原文、相关文件路径原样贴回对话；让 AI 写单元测试或自测用例；发现回归及时回退，而不是继续叠补丁。",
  },
  {
    title: "交付与复盘",
    desc: "合入前做代码审查，提交版本、写清变更说明；把好用的提示词沉淀成项目规范文档，下次直接复用。",
  },
];

export const VIBE_BEST_PRACTICES: string[] = [
  "提示词给足上下文：贴报错信息、给文件路径、说明预期行为，比让 AI 猜高效得多。",
  "小步提交：一次改动一个主题，随时可以回滚，方便定位问题。",
  "让 AI 解释再采纳：看不懂的代码不要合入，要求它逐段讲解。",
  "版本控制是底线：每一步都可回退，AI 改坏了也能恢复。",
  "用工具链兜底：lint、类型检查、单测全部自动化，机器能拦的错误不用人眼盯。",
  "守住安全边界：密钥、Token、生产数据永远不进提示词，也不提交到仓库。",
];

export const VIBE_CAUTIONS: string[] = [
  "幻觉：AI 会自信地给出不存在的 API、依赖或配置，引用库先查官方文档验证。",
  "技术债：快速生成容易积累重复和劣质代码，定期重构与清理。",
  "安全合规：涉及支付、账号、隐私的应用必须人工审查，AI 生成代码不等于安全代码。",
  "不适合的场合：高并发核心链路、金融医疗等敏感场景、大型遗留系统改造，人工主导更稳妥。",
];

/** 推荐工具，引用应用数据中已有的 id */
export const VIBE_TOOL_IDS = [
  "claude",
  "chatgpt",
  "cursor",
  "windsurf",
  "bolt",
  "lovable",
  "v0",
  "replit",
] as const;

/**
 * 模型能力数据：评分为站内编辑基于公开评测与体验的主观估算（0-100）。
 * 综合得分由各维度算术平均得出，页面支持按任意维度重新排名。
 */

export type ModelDimension =
  | "reasoning"
  | "coding"
  | "writing"
  | "multimodal"
  | "chinese"
  | "value";

export const MODEL_DIMENSIONS: { key: ModelDimension; label: string }[] = [
  { key: "reasoning", label: "推理" },
  { key: "coding", label: "编程" },
  { key: "writing", label: "写作" },
  { key: "multimodal", label: "多模态" },
  { key: "chinese", label: "中文" },
  { key: "value", label: "性价比" },
];

export interface Model {
  id: string;
  name: string;
  company: string;
  domain: string;
  url: string;
  desc: string;
  scores: Record<ModelDimension, number>;
  contextWindow: string;
  release: string;
  pricing: string;
}

export const MODELS: Model[] = [
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    company: "Anthropic",
    domain: "claude.ai",
    url: "https://claude.ai",
    desc: "Anthropic 新一代旗舰，长文写作与深度推理均衡，综合体验口碑第一。",
    scores: { reasoning: 98, coding: 94, writing: 98, multimodal: 90, chinese: 88, value: 75 },
    contextWindow: "200K",
    release: "2026-06",
    pricing: "付费",
  },
  {
    id: "gpt-5.6-sol",
    name: "GPT-5.6 Sol",
    company: "OpenAI",
    domain: "chatgpt.com",
    url: "https://chatgpt.com",
    desc: "OpenAI 旗舰推理模型，代码与工具调用能力领先，多模态覆盖完整。",
    scores: { reasoning: 96, coding: 95, writing: 92, multimodal: 95, chinese: 90, value: 75 },
    contextWindow: "400K",
    release: "2026-07",
    pricing: "付费",
  },
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    company: "Google",
    domain: "gemini.google.com",
    url: "https://gemini.google.com",
    desc: "Google 多模态旗舰，1M 上下文与搜索、Gmail 生态深度整合。",
    scores: { reasoning: 94, coding: 92, writing: 90, multimodal: 96, chinese: 89, value: 81 },
    contextWindow: "1M",
    release: "2026-07",
    pricing: "付费",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    company: "月之暗面",
    domain: "kimi.com",
    url: "https://kimi.com",
    desc: "前端与代码竞技场登顶的国产旗舰，工程能力反超海外头部。",
    scores: { reasoning: 91, coding: 96, writing: 86, multimodal: 90, chinese: 94, value: 83 },
    contextWindow: "256K",
    release: "2026-07",
    pricing: "免费额度",
  },
  {
    id: "claude-opus-4.8",
    name: "Claude Opus 4.8",
    company: "Anthropic",
    domain: "claude.ai",
    url: "https://claude.ai",
    desc: "Anthropic 高推理档旗舰，复杂任务的稳定性与一致性出色。",
    scores: { reasoning: 95, coding: 93, writing: 96, multimodal: 89, chinese: 86, value: 74 },
    contextWindow: "200K",
    release: "2026-05",
    pricing: "付费",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    company: "深度求索",
    domain: "chat.deepseek.com",
    url: "https://chat.deepseek.com",
    desc: "开源推理标杆，中文与数学能力出色，成本不到闭源头部的一成。",
    scores: { reasoning: 92, coding: 88, writing: 85, multimodal: 82, chinese: 96, value: 88 },
    contextWindow: "128K",
    release: "2026-06",
    pricing: "开源",
  },
  {
    id: "glm-5.2",
    name: "GLM-5.2",
    company: "智谱 AI",
    domain: "chatglm.cn",
    url: "https://chatglm.cn",
    desc: "国产开源全能选手，Agent 任务与中文场景表现稳定。",
    scores: { reasoning: 91, coding: 89, writing: 86, multimodal: 85, chinese: 94, value: 84 },
    contextWindow: "200K",
    release: "2026-05",
    pricing: "开源",
  },
  {
    id: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    company: "OpenAI",
    domain: "chatgpt.com",
    url: "https://chatgpt.com",
    desc: "OpenAI 高性价比旗舰，速度与成本平衡更好。",
    scores: { reasoning: 91, coding: 92, writing: 90, multimodal: 92, chinese: 86, value: 78 },
    contextWindow: "400K",
    release: "2026-07",
    pricing: "付费",
  },
  {
    id: "grok-4",
    name: "Grok 4",
    company: "xAI",
    domain: "grok.com",
    url: "https://grok.com",
    desc: "xAI 旗舰，实时信息与 X 生态结合，推理接近第一梯队。",
    scores: { reasoning: 90, coding: 89, writing: 84, multimodal: 88, chinese: 82, value: 78 },
    contextWindow: "256K",
    release: "2026-04",
    pricing: "付费",
  },
  {
    id: "minimax-m3",
    name: "MiniMax M3",
    company: "MiniMax",
    domain: "minimax.io",
    url: "https://www.minimax.io",
    desc: "国产多模态新秀，视频理解与中文创作见长。",
    scores: { reasoning: 83, coding: 84, writing: 87, multimodal: 85, chinese: 91, value: 80 },
    contextWindow: "1M",
    release: "2026-05",
    pricing: "免费额度",
  },
  {
    id: "muse-spark-1.1",
    name: "Muse Spark 1.1",
    company: "Meta",
    domain: "meta.ai",
    url: "https://www.meta.ai",
    desc: "Meta 开源旗舰，创意生成与多模态理解均衡。",
    scores: { reasoning: 88, coding: 91, writing: 82, multimodal: 90, chinese: 80, value: 76 },
    contextWindow: "128K",
    release: "2026-07",
    pricing: "开源",
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    company: "Google",
    domain: "gemini.google.com",
    url: "https://gemini.google.com",
    desc: "Google 上一代旗舰，多模态与长上下文依然能打。",
    scores: { reasoning: 86, coding: 85, writing: 84, multimodal: 90, chinese: 83, value: 76 },
    contextWindow: "1M",
    release: "2025-11",
    pricing: "免费额度",
  },
  {
    id: "mimo-v2.5",
    name: "MiMo-V2.5",
    company: "小米",
    domain: "xiaomi.com",
    url: "https://www.xiaomi.com",
    desc: "开源全模态基座模型，1M 上下文，开源调用量全球登顶。",
    scores: { reasoning: 82, coding: 83, writing: 77, multimodal: 89, chinese: 87, value: 85 },
    contextWindow: "1M",
    release: "2026-04",
    pricing: "开源",
  },
  {
    id: "hunyuan-hy3",
    name: "混元 HY3",
    company: "腾讯",
    domain: "hunyuan.tencent.com",
    url: "https://hunyuan.tencent.com",
    desc: "腾讯开源大模型，中文场景与微信生态协同出色。",
    scores: { reasoning: 81, coding: 80, writing: 79, multimodal: 84, chinese: 89, value: 84 },
    contextWindow: "256K",
    release: "2026-06",
    pricing: "开源",
  },
];

/** 综合得分：各维度算术平均，保留 1 位小数 */
export function overallScore(model: Model): number {
  const values = Object.values(model.scores);
  const sum = values.reduce((acc, v) => acc + v, 0);
  return Math.round((sum / values.length) * 10) / 10;
}

import { describe, expect, it } from "vitest";
import {
  INTERVIEW_DIFFICULTIES,
  INTERVIEW_QUESTIONS,
  INTERVIEW_TOPICS,
  type InterviewDifficulty,
  type InterviewTopic,
} from "../interview";

describe("面试题数据完整性", () => {
  it("题目 id 全局唯一", () => {
    const ids = INTERVIEW_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("难度与主题引用有效", () => {
    const difficulties = new Set(INTERVIEW_DIFFICULTIES.map((d) => d.key));
    const topics = new Set(INTERVIEW_TOPICS.map((t) => t.key));
    for (const q of INTERVIEW_QUESTIONS) {
      expect(difficulties.has(q.difficulty as InterviewDifficulty), `${q.id} 难度非法`).toBe(true);
      expect(topics.has(q.topic as InterviewTopic), `${q.id} 主题非法`).toBe(true);
      expect(q.question.length > 0 && q.answer.length > 0, `${q.id} 题目或答案为空`).toBe(true);
    }
  });

  it("由浅入深：每个难度都有题目", () => {
    for (const d of INTERVIEW_DIFFICULTIES) {
      expect(INTERVIEW_QUESTIONS.filter((q) => q.difficulty === d.key).length, d.label).toBeGreaterThan(0);
    }
  });

  it("Flutter 题库充足且各难度均衡", () => {
    const flutter = INTERVIEW_QUESTIONS.filter((q) => q.topic === "flutter");
    expect(flutter.length).toBeGreaterThanOrEqual(20);
    for (const d of INTERVIEW_DIFFICULTIES) {
      expect(flutter.filter((q) => q.difficulty === d.key).length, `Flutter ${d.label}`).toBeGreaterThanOrEqual(5);
    }
  });

  it("代码示例字段完整", () => {
    const withCode = INTERVIEW_QUESTIONS.filter((q) => q.code);
    expect(withCode.length).toBeGreaterThan(5);
    for (const q of withCode) {
      expect(q.code!.lang.length > 0 && q.code!.source.length > 0, `${q.id} 代码示例不完整`).toBe(true);
    }
  });
});

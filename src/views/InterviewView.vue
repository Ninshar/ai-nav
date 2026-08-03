<script setup lang="ts">
import { ChevronDown, Star } from "lucide-vue-next";
import { computed, ref } from "vue";
import {
  INTERVIEW_DIFFICULTIES,
  INTERVIEW_QUESTIONS,
  INTERVIEW_TOPICS,
  type InterviewDifficulty,
  type InterviewTopic,
} from "../data/interview";
import CodeBlock from "../components/CodeBlock.vue";

type DifficultyFilter = "all" | InterviewDifficulty;
type TopicFilter = "all" | InterviewTopic;

const difficultyFilter = ref<DifficultyFilter>("all");
const topicFilter = ref<TopicFilter>("all");
const expanded = ref<Set<string>>(new Set());

const difficultyLabel = (key: InterviewDifficulty) =>
  INTERVIEW_DIFFICULTIES.find((d) => d.key === key)?.label ?? key;
const topicLabel = (key: InterviewTopic) =>
  INTERVIEW_TOPICS.find((t) => t.key === key)?.label ?? key;

const stats = computed(() => ({
  total: INTERVIEW_QUESTIONS.length,
  basic: INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "basic").length,
  intermediate: INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "intermediate").length,
  advanced: INTERVIEW_QUESTIONS.filter((q) => q.difficulty === "advanced").length,
}));

const filtered = computed(() => {
  const order = new Map(INTERVIEW_DIFFICULTIES.map((d) => [d.key, d.order]));
  const topicOrder = new Map(INTERVIEW_TOPICS.map((t, i) => [t.key, i]));
  return INTERVIEW_QUESTIONS.filter((q) => {
    if (difficultyFilter.value !== "all" && q.difficulty !== difficultyFilter.value) return false;
    if (topicFilter.value !== "all" && q.topic !== topicFilter.value) return false;
    return true;
  }).sort(
    (a, b) =>
      order.get(a.difficulty)! - order.get(b.difficulty)! ||
      topicOrder.get(a.topic)! - topicOrder.get(b.topic)! ||
      a.id.localeCompare(b.id),
  );
});

function toggle(id: string) {
  const next = new Set(expanded.value);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  expanded.value = next;
}

function difficultyClass(key: InterviewDifficulty): string {
  return ` diff-${key}`;
}
</script>

<template>
  <section class="interview-page">
    <header class="interview-head">
      <p class="interview-eyebrow">Frontend · Flutter Interview</p>
      <h1>前端 / Flutter 面试题</h1>
      <p class="interview-sub">按“基础 → 进阶 → 深入”由浅入深组织，覆盖 HTML/CSS、JavaScript、Vue/React、浏览器、工程性能与 Flutter。</p>
      <div class="interview-stats">
        <span>共 <b>{{ stats.total }}</b> 题</span>
        <span>基础 <b>{{ stats.basic }}</b></span>
        <span>进阶 <b>{{ stats.intermediate }}</b></span>
        <span>深入 <b>{{ stats.advanced }}</b></span>
      </div>
    </header>

    <div class="filter-row">
      <button
        class="diff-tab"
        :class="{ active: difficultyFilter === 'all' }"
        @click="difficultyFilter = 'all'"
      >
        全部
      </button>
      <button
        v-for="d in INTERVIEW_DIFFICULTIES"
        :key="d.key"
        class="diff-tab"
        :class="{ active: difficultyFilter === d.key }"
        @click="difficultyFilter = d.key"
      >
        {{ d.label }}
      </button>
    </div>

    <div class="topic-row">
      <button
        class="topic-chip"
        :class="{ active: topicFilter === 'all' }"
        @click="topicFilter = 'all'"
      >
        全部主题
      </button>
      <button
        v-for="t in INTERVIEW_TOPICS"
        :key="t.key"
        class="topic-chip"
        :class="{ active: topicFilter === t.key }"
        @click="topicFilter = t.key"
      >
        <Star v-if="t.featured" class="chip-star" :size="13" fill="currentColor" />
        {{ t.label }}
      </button>
    </div>

    <p class="result-summary">当前 {{ filtered.length }} 题</p>

    <div class="qa-list">
      <article
        v-for="(q, index) in filtered"
        :key="q.id"
        class="qa-item"
        :class="{ open: expanded.has(q.id) }"
      >
        <button class="qa-question" :aria-expanded="expanded.has(q.id)" @click="toggle(q.id)">
          <span class="qa-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="qa-text">{{ q.question }}</span>
          <span class="qa-badges">
            <span class="diff-badge" :class="difficultyClass(q.difficulty)">{{ difficultyLabel(q.difficulty) }}</span>
            <span class="topic-badge">{{ topicLabel(q.topic) }}</span>
          </span>
          <ChevronDown class="qa-chevron" :size="18" />
        </button>
        <div v-show="expanded.has(q.id)" class="qa-answer">
          {{ q.answer }}
          <CodeBlock v-if="q.code" :lang="q.code.lang" :source="q.code.source" />
        </div>
      </article>

      <p v-if="filtered.length === 0" class="qa-empty">没有符合条件的题目，换个筛选试试。</p>
    </div>
  </section>
</template>

<style scoped>
.interview-page {
  padding: 56px 0 80px;
  max-width: 880px;
  margin: 0 auto;
}

.interview-head {
  text-align: center;
  margin-bottom: 30px;
}

.interview-eyebrow {
  color: var(--primary-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.interview-head h1 {
  font-size: clamp(30px, 4.5vw, 42px);
  font-weight: 800;
  line-height: 1.15;
}

.interview-sub {
  margin: 14px auto 0;
  max-width: 640px;
  color: var(--text-2);
  font-size: 15px;
}

.interview-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 22px;
  font-size: 13.5px;
  color: var(--text-3);
}

.interview-stats b {
  color: var(--text);
  font-weight: 800;
}

.filter-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.diff-tab {
  height: 36px;
  padding: 0 18px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 13.5px;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.diff-tab:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.diff-tab.active {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary-ink);
}

.topic-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.topic-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 32px;
  padding: 0 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text-3);
  font-size: 12.5px;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.topic-chip:hover {
  color: var(--text);
}

.topic-chip.active {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary-ink);
}

.chip-star {
  color: #f59e0b;
}

.result-summary {
  text-align: center;
  color: var(--text-3);
  font-size: 13px;
  margin-bottom: 16px;
}

.qa-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.qa-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: border-color 0.15s;
}

.qa-item:hover {
  border-color: var(--border-strong);
}

.qa-question {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 15px 18px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}

.qa-index {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-3);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.qa-text {
  flex: 1;
  line-height: 1.5;
}

.qa-badges {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.diff-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  white-space: nowrap;
}

.diff-basic {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.12);
}

.diff-intermediate {
  color: #d97706;
  background: rgba(217, 119, 6, 0.12);
}

.diff-advanced {
  color: #db2777;
  background: rgba(219, 39, 119, 0.12);
}

.topic-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  color: var(--text-3);
  background: var(--surface-2);
  border: 1px solid var(--border);
  white-space: nowrap;
}

.qa-chevron {
  flex-shrink: 0;
  color: var(--text-3);
  transition: transform 0.2s;
}

.qa-item.open .qa-chevron {
  transform: rotate(180deg);
}

.qa-answer {
  padding: 4px 18px 18px 42px;
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.75;
  white-space: pre-line;
  border-top: 1px dashed var(--border);
}

.qa-empty {
  text-align: center;
  color: var(--text-3);
  padding: 48px 0;
}

@media (max-width: 700px) {
  .interview-page {
    padding: 40px 0 64px;
  }

  .qa-question {
    padding: 13px 14px;
    font-size: 14px;
  }

  .qa-badges {
    display: none;
  }

  .qa-answer {
    padding: 4px 14px 14px 14px;
  }
}
</style>

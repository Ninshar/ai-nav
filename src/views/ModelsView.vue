<script setup lang="ts">
import { computed, ref } from "vue";
import { MODEL_DIMENSIONS, MODELS, overallScore, type Model, type ModelDimension } from "../data/models";
import { initialOf } from "../utils/format";
import FaviconImg from "../components/FaviconImg.vue";

type ActiveDimension = "overall" | ModelDimension;

const activeDim = ref<ActiveDimension>("overall");

const dimensionLabel = computed(() => {
  if (activeDim.value === "overall") return "综合";
  return MODEL_DIMENSIONS.find((d) => d.key === activeDim.value)?.label ?? "综合";
});

function scoreOf(model: Model): number {
  return activeDim.value === "overall" ? overallScore(model) : model.scores[activeDim.value];
}

const ranked = computed(() =>
  [...MODELS].sort((a, b) => {
    const diff = scoreOf(b) - scoreOf(a);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  }),
);

function rankClass(index: number): string {
  if (index === 0) return " gold";
  if (index === 1) return " silver";
  if (index === 2) return " bronze";
  return "";
}
</script>

<template>
  <section class="models-page">
    <header class="models-head">
      <p class="models-eyebrow">Model Capability Index</p>
      <h1>模型能力排名</h1>
      <p class="models-sub">
        综合得分由推理、编程、写作、多模态、中文、性价比六项维度算术平均得出，点击维度标签可按专项能力重新排名。
      </p>
    </header>

    <div class="dim-tabs" role="tablist" aria-label="排名维度">
      <button
        class="dim-tab"
        :class="{ active: activeDim === 'overall' }"
        role="tab"
        :aria-selected="activeDim === 'overall'"
        @click="activeDim = 'overall'"
      >
        综合
      </button>
      <button
        v-for="dim in MODEL_DIMENSIONS"
        :key="dim.key"
        class="dim-tab"
        :class="{ active: activeDim === dim.key }"
        role="tab"
        :aria-selected="activeDim === dim.key"
        @click="activeDim = dim.key"
      >
        {{ dim.label }}
      </button>
    </div>

    <div class="rank-table-wrap">
      <table class="rank-table">
        <thead>
          <tr>
            <th class="col-rank">排名</th>
            <th>模型</th>
            <th>{{ dimensionLabel }}得分</th>
            <th class="hide-sm">上下文</th>
            <th class="hide-sm">发布</th>
            <th>定价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(model, index) in ranked" :key="model.id" :title="model.desc">
            <td class="col-rank">
              <span class="rank-badge" :class="rankClass(index)">#{{ index + 1 }}</span>
            </td>
            <td>
              <div class="model-cell">
                <div class="model-logo">
                  <FaviconImg :domain="model.domain">
                    <span>{{ initialOf(model.name) }}</span>
                  </FaviconImg>
                </div>
                <div class="model-meta">
                  <b>{{ model.name }}</b>
                  <small>{{ model.company }}</small>
                </div>
              </div>
            </td>
            <td>
              <div class="score-cell">
                <span class="score-num">{{ scoreOf(model).toFixed(1) }}</span>
                <div class="score-bar">
                  <i :style="{ width: `${scoreOf(model)}%` }"></i>
                </div>
              </div>
            </td>
            <td class="muted hide-sm">{{ model.contextWindow }}</td>
            <td class="muted hide-sm">{{ model.release }}</td>
            <td><span class="pricing">{{ model.pricing }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="models-note">* 评分为站内编辑基于公开评测与使用体验的主观估算，仅供选型参考，请以各厂商官方信息为准。</p>
  </section>
</template>

<style scoped>
.models-page {
  padding: 56px 0 80px;
}

.models-head {
  text-align: center;
  margin-bottom: 34px;
}

.models-eyebrow {
  color: var(--primary-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.models-head h1 {
  font-size: clamp(30px, 4.5vw, 44px);
  font-weight: 800;
  line-height: 1.15;
}

.models-sub {
  margin: 14px auto 0;
  max-width: 620px;
  color: var(--text-2);
  font-size: 15px;
}

.dim-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.dim-tab {
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 13.5px;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.dim-tab:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.dim-tab.active {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary-ink);
}

.rank-table-wrap {
  overflow-x: auto;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.rank-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 14px;
}

.rank-table th {
  text-align: left;
  padding: 14px 18px;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-3);
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
  white-space: nowrap;
}

.rank-table td {
  padding: 13px 18px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.rank-table tbody tr:last-child td {
  border-bottom: 0;
}

.rank-table tbody tr {
  transition: background 0.12s;
}

.rank-table tbody tr:hover {
  background: var(--surface-2);
}

.col-rank {
  width: 68px;
}

.rank-badge {
  display: inline-grid;
  place-items: center;
  min-width: 34px;
  height: 24px;
  padding: 0 8px;
  border-radius: 6px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-3);
  font-size: 12px;
  font-weight: 700;
}

.rank-badge.gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-color: #f59e0b;
  color: #fff;
}

.rank-badge.silver {
  background: linear-gradient(135deg, #e2e8f0, #94a3b8);
  border-color: #94a3b8;
  color: #fff;
}

.rank-badge.bronze {
  background: linear-gradient(135deg, #fcd7b6, #d97706);
  border-color: #d97706;
  color: #fff;
}

.model-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.model-logo {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary-soft), color-mix(in srgb, var(--primary-soft) 60%, #7c3aed));
  color: var(--primary-ink);
  font-weight: 800;
  font-size: 15px;
  flex-shrink: 0;
}

.model-logo :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--surface);
}

.model-logo :deep(span) {
  font-size: 15px;
  font-weight: 800;
}

.model-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.model-meta b {
  font-size: 14.5px;
  font-weight: 700;
  white-space: nowrap;
}

.model-meta small {
  color: var(--text-3);
  font-size: 12px;
  margin-top: 1px;
}

.score-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 150px;
}

.score-num {
  width: 34px;
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.score-bar {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  overflow: hidden;
}

.score-bar i {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary), #7c3aed);
}

.muted {
  color: var(--text-3);
  font-size: 13px;
  white-space: nowrap;
}

.models-note {
  margin-top: 18px;
  color: var(--text-3);
  font-size: 12.5px;
  text-align: center;
}

@media (max-width: 700px) {
  .models-page {
    padding: 40px 0 64px;
  }

  .models-head {
    margin-bottom: 26px;
  }

  .hide-sm {
    display: none;
  }

  .rank-table {
    min-width: 560px;
  }
}
</style>

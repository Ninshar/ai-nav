<script setup lang="ts">
import { AlertTriangle, CheckCircle2, Sparkles, Workflow } from "lucide-vue-next";
import { computed } from "vue";
import { TOOLS } from "../data";
import {
  VIBE_BEST_PRACTICES,
  VIBE_CAUTIONS,
  VIBE_INTRO,
  VIBE_TOOL_IDS,
  VIBE_WORKFLOW,
} from "../data/vibecoding";
import { initialOf } from "../utils/format";
import FaviconImg from "../components/FaviconImg.vue";

const tools = computed(() => VIBE_TOOL_IDS.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean));
</script>

<template>
  <section class="vibe-page">
    <header class="vibe-head">
      <p class="vibe-eyebrow">Vibe Coding</p>
      <h1>用自然语言写代码</h1>
      <p class="vibe-intro">{{ VIBE_INTRO }}</p>
    </header>

    <div class="vibe-section">
      <h2><Workflow :size="20" /> 核心工作流</h2>
      <ol class="workflow-list">
        <li v-for="(step, index) in VIBE_WORKFLOW" :key="step.title">
          <span class="step-num">{{ index + 1 }}</span>
          <div>
            <b>{{ step.title }}</b>
            <p>{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </div>

    <div class="vibe-grid">
      <div class="vibe-section">
        <h2><CheckCircle2 :size="20" /> 最佳实践</h2>
        <ul class="check-list">
          <li v-for="item in VIBE_BEST_PRACTICES" :key="item">
            <CheckCircle2 :size="16" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="vibe-section">
        <h2><AlertTriangle :size="20" /> 注意事项</h2>
        <ul class="caution-list">
          <li v-for="item in VIBE_CAUTIONS" :key="item">
            <AlertTriangle :size="16" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="vibe-section">
      <h2><Sparkles :size="20" /> 推荐工具</h2>
      <div class="tool-strip">
        <a v-for="tool in tools" :key="tool!.id" class="vibe-tool" :href="tool!.url" target="_blank" rel="noopener">
          <span class="vibe-tool-logo">
            <FaviconImg :domain="tool!.domain">
              <span>{{ initialOf(tool!.name) }}</span>
            </FaviconImg>
          </span>
          <span class="vibe-tool-meta">
            <b>{{ tool!.name }}</b>
            <small>{{ tool!.desc }}</small>
          </span>
        </a>
      </div>
      <p class="vibe-tool-note">更多工具见<a href="#/">应用导航</a>。</p>
    </div>
  </section>
</template>

<style scoped>
.vibe-page {
  padding: 56px 0 80px;
  max-width: 960px;
  margin: 0 auto;
}

.vibe-head {
  text-align: center;
  margin-bottom: 40px;
}

.vibe-eyebrow {
  color: var(--primary-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.vibe-head h1 {
  font-size: clamp(30px, 4.5vw, 42px);
  font-weight: 800;
  line-height: 1.15;
}

.vibe-intro {
  margin: 16px auto 0;
  max-width: 680px;
  color: var(--text-2);
  font-size: 15px;
  line-height: 1.8;
}

.vibe-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  padding: 24px;
  margin-bottom: 20px;
}

.vibe-section h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 18px;
}

.vibe-section h2 svg {
  color: var(--primary-ink);
}

.workflow-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.workflow-list li {
  display: flex;
  gap: 14px;
}

.step-num {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary-ink);
  font-size: 13px;
  font-weight: 800;
}

.workflow-list b {
  font-size: 15px;
  font-weight: 700;
}

.workflow-list p {
  margin-top: 3px;
  color: var(--text-2);
  font-size: 13.5px;
  line-height: 1.7;
}

.vibe-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.check-list,
.caution-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.check-list li,
.caution-list li {
  display: flex;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--text-2);
}

.check-list svg {
  flex-shrink: 0;
  color: #16a34a;
  margin-top: 2px;
}

.caution-list svg {
  flex-shrink: 0;
  color: #d97706;
  margin-top: 2px;
}

.tool-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.vibe-tool {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
}

.vibe-tool:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.vibe-tool-logo {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--primary-soft);
  color: var(--primary-ink);
  font-weight: 800;
  flex-shrink: 0;
}

.vibe-tool-logo :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--surface);
}

.vibe-tool-logo :deep(span) {
  font-size: 15px;
  font-weight: 800;
}

.vibe-tool-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.vibe-tool-meta b {
  font-size: 14px;
  font-weight: 700;
}

.vibe-tool-meta small {
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.vibe-tool-note {
  margin-top: 16px;
  font-size: 13px;
  color: var(--text-3);
}

.vibe-tool-note a {
  color: var(--primary-ink);
  font-weight: 600;
}

@media (max-width: 760px) {
  .vibe-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .vibe-page {
    padding: 40px 0 64px;
  }
}
</style>

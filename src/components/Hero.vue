<script setup lang="ts">
import { computed } from "vue";
import { CATEGORIES, CATEGORY_MAP, TOOLS } from "../data";
import { initialOf } from "../utils/format";
import FaviconImg from "./FaviconImg.vue";

const CLOUD_SIZE = 8;

const stats = computed(() => ({
  tools: TOOLS.length,
  cats: CATEGORIES.length,
  featured: TOOLS.filter((t) => t.featured).length,
}));

const cloudTools = computed(() => [...TOOLS].sort((a, b) => b.favs - a.favs).slice(0, CLOUD_SIZE));
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="hero-eyebrow">Discover · Compare · Use</p>
      <h1>找到最适合你的 <span class="gradient-text">AI 应用</span></h1>
      <p class="hero-sub">聚合主流 AI 工具，按对话、编程、设计、办公等场景快速筛选，收藏常用产品。</p>
      <div class="hero-stats">
        <div class="stat">
          <strong>{{ stats.tools }}</strong>
          <span>收录应用</span>
        </div>
        <div class="stat">
          <strong>{{ stats.cats }}</strong>
          <span>使用场景</span>
        </div>
        <div class="stat">
          <strong>{{ stats.featured }}</strong>
          <span>本周精选</span>
        </div>
      </div>
    </div>

    <div class="logo-cloud" aria-label="热门 AI 应用 logo">
      <div class="cloud-glow"></div>
      <div class="cloud-grid">
        <div
          v-for="tool in cloudTools"
          :key="tool.id"
          class="cloud-logo"
          :title="tool.name"
          :style="{
            background: `${CATEGORY_MAP.get(tool.category)!.color}1a`,
            borderColor: `${CATEGORY_MAP.get(tool.category)!.color}40`,
          }"
        >
          <FaviconImg :domain="tool.domain">
            <span class="cloud-initial" :style="{ color: CATEGORY_MAP.get(tool.category)!.color }">
              {{ initialOf(tool.name) }}
            </span>
          </FaviconImg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
  padding: 72px 0 64px;
}

.hero-eyebrow {
  color: var(--primary-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.hero h1 {
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.12;
  letter-spacing: 0;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(100deg, #2563eb, #7c3aed 55%, #db2777);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  margin-top: 18px;
  max-width: 560px;
  color: var(--text-2);
  font-size: 17px;
}

.hero-stats {
  display: flex;
  gap: 34px;
  margin-top: 34px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat strong {
  font-size: 30px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.1;
}

.stat span {
  margin-top: 4px;
  color: var(--text-3);
  font-size: 13px;
}

.logo-cloud {
  position: relative;
  min-height: 280px;
  display: grid;
  place-items: center;
}

.cloud-glow {
  position: absolute;
  inset: 8%;
  background: radial-gradient(ellipse at center, color-mix(in srgb, var(--primary) 18%, transparent), transparent 68%);
  filter: blur(18px);
}

.cloud-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  width: 100%;
  max-width: 420px;
  padding: 22px;
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(8px);
}

.cloud-logo {
  position: relative;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.cloud-logo :deep(img) {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.cloud-logo :deep(.cloud-initial) {
  font-size: 22px;
  font-weight: 800;
}

@media (max-width: 920px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 48px 0;
  }

  .logo-cloud {
    min-height: auto;
  }

  .cloud-grid {
    grid-template-columns: repeat(6, 1fr);
    max-width: 640px;
  }
}

@media (max-width: 700px) {
  .hero {
    padding: 40px 0;
  }

  .hero-stats {
    gap: 22px;
  }

  .cloud-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

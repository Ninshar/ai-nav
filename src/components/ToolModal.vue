<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { ExternalLink, Heart, X } from "lucide-vue-next";
import { CATEGORY_MAP, TOOLS } from "../data";
import { formatCount, initialOf, shadeColor } from "../utils/format";
import { useAppStore } from "../stores/app";
import { useToastStore } from "../stores/toast";
import FaviconImg from "./FaviconImg.vue";

const store = useAppStore();
const toast = useToastStore();

const tool = computed(() => TOOLS.find((t) => t.id === store.activeToolId) ?? null);
const visible = computed(() => store.activeToolId !== null);
const cat = computed(() => (tool.value ? CATEGORY_MAP.get(tool.value.category)! : null));
const isFav = computed(() => (tool.value ? store.favorites.has(tool.value.id) : false));

// 弹窗打开时锁定页面滚动
watch(
  visible,
  (v) => {
    document.body.style.overflow = v ? "hidden" : "";
  },
  { immediate: true },
);

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && visible.value) store.closeTool();
}

onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});

function toggleFavorite() {
  if (!tool.value) return;
  const added = store.toggleFavorite(tool.value.id);
  toast.show(added ? "已加入收藏" : "已取消收藏");
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible && tool && cat"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="toolModalTitle"
      @click.self="store.closeTool()"
    >
      <div class="modal">
        <button class="modal-close" aria-label="关闭详情" @click="store.closeTool()">
          <X :size="17" />
        </button>

        <div class="modal-head">
          <div
            class="modal-logo"
            :style="{ background: `linear-gradient(135deg, ${cat.color}, ${shadeColor(cat.color, -18)})` }"
          >
            <FaviconImg :domain="tool.domain" :lazy="false">
              <span>{{ initialOf(tool.name) }}</span>
            </FaviconImg>
          </div>
          <div>
            <h3 id="toolModalTitle">{{ tool.name }}</h3>
            <div class="modal-title-meta">
              <span class="pricing">{{ tool.pricing }}</span>
              <a class="domain-link" :href="tool.url" target="_blank" rel="noopener">{{ tool.domain }}</a>
            </div>
          </div>
        </div>

        <div class="modal-body">
          <p>{{ tool.desc }}</p>
          <div class="modal-info-grid">
            <div class="info-cell">
              <span>分类</span>
              <b>{{ cat.label }}</b>
            </div>
            <div class="info-cell">
              <span>评分</span>
              <b>{{ tool.rating.toFixed(1) }} / 5.0</b>
            </div>
            <div class="info-cell">
              <span>收藏数</span>
              <b>{{ formatCount(tool.favs) }}</b>
            </div>
            <div class="info-cell">
              <span>支持平台</span>
              <b>{{ tool.platforms.join(" · ") }}</b>
            </div>
          </div>
          <div class="modal-tags">
            <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="modal-foot">
          <button
            class="fav-btn"
            :class="{ active: isFav }"
            :aria-label="`收藏 ${tool.name}`"
            @click="toggleFavorite"
          >
            <Heart :size="18" />
          </button>
          <a class="primary-btn" :href="tool.url" target="_blank" rel="noopener">
            <ExternalLink :size="16" />
            <span>访问官网</span>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-logo {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 26px;
  font-weight: 800;
  flex-shrink: 0;
}

.modal-logo :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--surface);
}

.modal-logo :deep(span) {
  font-size: 26px;
  font-weight: 800;
}

.modal-title-meta {
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.modal-title-meta .pricing {
  font-size: 12px;
}

.modal-title-meta .domain-link {
  font-size: 12.5px;
  color: var(--primary-ink);
  font-weight: 600;
}

.modal-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 18px;
}

.info-cell {
  padding: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.info-cell span {
  display: block;
  font-size: 12px;
  color: var(--text-3);
  margin-bottom: 4px;
}

.info-cell b {
  font-size: 13.5px;
  font-weight: 700;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.modal-foot .fav-btn {
  width: 42px;
  height: 42px;
}

@media (max-width: 700px) {
  .modal-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowUpRight, Heart, Star } from "lucide-vue-next";
import type { Tool } from "../data/types";
import { CATEGORY_MAP } from "../data";
import { initialOf, shadeColor } from "../utils/format";
import { useAppStore } from "../stores/app";
import { useToastStore } from "../stores/toast";
import FaviconImg from "./FaviconImg.vue";

const props = defineProps<{ tool: Tool }>();
const emit = defineEmits<{ open: [id: string] }>();

const store = useAppStore();
const toast = useToastStore();

const cat = computed(() => CATEGORY_MAP.get(props.tool.category)!);
const isFav = computed(() => store.favorites.has(props.tool.id));

function toggleFavorite() {
  const added = store.toggleFavorite(props.tool.id);
  toast.show(added ? "已加入收藏" : "已取消收藏");
}

function visit(e: MouseEvent) {
  e.stopPropagation();
  window.open(props.tool.url, "_blank", "noopener");
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== "Enter" && e.key !== " ") return;
  // 焦点在内部按钮/链接上时交给它们自己处理
  if ((e.target as HTMLElement).closest("button, a")) return;
  e.preventDefault();
  emit("open", props.tool.id);
}
</script>

<template>
  <article
    class="tool-card"
    tabindex="0"
    role="button"
    :aria-label="`查看 ${tool.name} 详情`"
    @click="emit('open', tool.id)"
    @keydown="onKeydown"
  >
    <div class="card-top">
      <div
        class="tool-logo"
        :style="{ background: `linear-gradient(135deg, ${cat.color}, ${shadeColor(cat.color, -18)})` }"
      >
        <FaviconImg :domain="tool.domain">
          <span>{{ initialOf(tool.name) }}</span>
        </FaviconImg>
      </div>
      <div class="card-title">
        <h3>{{ tool.name }}</h3>
        <span class="domain">{{ tool.domain }}</span>
      </div>
      <button
        class="fav-btn"
        :class="{ active: isFav }"
        :aria-label="`收藏 ${tool.name}`"
        @click.stop="toggleFavorite"
      >
        <Heart :size="16" />
      </button>
    </div>

    <p class="tool-desc">{{ tool.desc }}</p>

    <div class="tool-tags">
      <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="card-foot">
      <span class="rating"><Star :size="14" />{{ tool.rating.toFixed(1) }}</span>
      <span class="pricing">{{ tool.pricing }}</span>
      <a class="visit-btn" :href="tool.url" target="_blank" rel="noopener" @click.stop.prevent="visit">
        访问<ArrowUpRight :size="14" />
      </a>
    </div>
  </article>
</template>

<style scoped>
.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.16s, box-shadow 0.16s, border-color 0.16s;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tool-logo {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  flex-shrink: 0;
}

.tool-logo :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--surface);
}

.tool-logo :deep(span) {
  font-size: 18px;
  font-weight: 800;
}

.card-title {
  min-width: 0;
  flex: 1;
}

.card-title h3 {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title .domain {
  display: block;
  font-size: 12px;
  color: var(--text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-desc {
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.55;
  min-height: 42px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 2px;
}

.rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}

.rating svg {
  width: 14px;
  height: 14px;
  color: #f59e0b;
  fill: #f59e0b;
}

.visit-btn {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-ink);
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--primary-soft);
  transition: filter 0.15s;
}

.visit-btn:hover {
  filter: brightness(1.05);
}

.visit-btn svg {
  width: 14px;
  height: 14px;
}
</style>

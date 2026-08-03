<script setup lang="ts">
import { ArrowUpDown, BadgeCheck, SearchX } from "lucide-vue-next";
import Sidebar from "./Sidebar.vue";
import ToolGrid from "./ToolGrid.vue";
import { useAppStore } from "../stores/app";
import type { SortMode } from "../stores/app";

const store = useAppStore();

function onSortChange(e: Event) {
  store.setSort((e.target as HTMLSelectElement).value as SortMode);
}
</script>

<template>
  <section class="tool-section">
    <div class="section-head">
      <div>
        <h2>全部应用</h2>
        <p>共 {{ store.filteredTools.length }} 款应用</p>
      </div>
      <div class="filter-row">
        <button
          class="filter-chip"
          :class="{ active: store.freeOnly }"
          :aria-pressed="store.freeOnly"
          @click="store.toggleFreeOnly()"
        >
          <BadgeCheck :size="15" />
          <span>可用免费</span>
        </button>
        <label class="sort-label">
          <ArrowUpDown :size="15" />
          <select :value="store.sort" aria-label="排序方式" @change="onSortChange">
            <option value="default">默认排序</option>
            <option value="rating">评分最高</option>
            <option value="favs">收藏最多</option>
            <option value="newest">最新收录</option>
          </select>
        </label>
      </div>
    </div>

    <div class="content-grid">
      <Sidebar />
      <div class="tools-panel">
        <ToolGrid />
        <div v-if="store.filteredTools.length === 0" class="empty-state">
          <SearchX :size="44" />
          <h3>没有找到匹配的应用</h3>
          <p>换个关键词或分类试试</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tool-section {
  padding: 40px 0 72px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.section-head h2 {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0;
}

.section-head p {
  color: var(--text-3);
  font-size: 14px;
  margin-top: 6px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 13px;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.filter-chip svg {
  width: 15px;
  height: 15px;
}

.filter-chip.active {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary-ink);
}

.sort-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 10px 0 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text-2);
}

.sort-label svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.sort-label select {
  border: 0;
  background: transparent;
  outline: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding-right: 4px;
}

.content-grid {
  display: grid;
  grid-template-columns: 232px 1fr;
  gap: 28px;
  align-items: start;
}

.empty-state {
  text-align: center;
  padding: 72px 20px;
  color: var(--text-3);
  background: var(--surface);
  border: 1px dashed var(--border-strong);
  border-radius: 8px;
}

.empty-state svg {
  width: 44px;
  height: 44px;
  margin-bottom: 14px;
  color: var(--text-3);
}

.empty-state h3 {
  color: var(--text);
  font-size: 18px;
  margin-bottom: 6px;
}

.empty-state p {
  font-size: 14px;
}

@media (max-width: 920px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .filter-row {
    width: 100%;
  }

  .filter-row .sort-label {
    flex: 1;
  }

  .filter-row .sort-label select {
    width: 100%;
  }
}
</style>

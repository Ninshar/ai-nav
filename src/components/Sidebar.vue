<script setup lang="ts">
import { computed } from "vue";
import { Bookmark, Heart, LayoutGrid } from "lucide-vue-next";
import { CATEGORIES, TOOLS } from "../data";
import { CATEGORY_ICONS } from "../utils/icons";
import { useAppStore } from "../stores/app";

const store = useAppStore();

const counts = computed(() => {
  const map = new Map<string, number>();
  TOOLS.forEach((tool) => map.set(tool.category, (map.get(tool.category) || 0) + 1));
  return map;
});

function selectCategory(key: string) {
  store.setCategory(key);
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-block">
      <div class="sidebar-title">
        <LayoutGrid :size="15" />
        <span>分类</span>
      </div>
      <nav class="cat-list" aria-label="应用分类">
        <button
          class="cat-btn"
          :class="{ active: store.category === 'all' }"
          :aria-pressed="store.category === 'all'"
          @click="selectCategory('all')"
        >
          <span class="cat-icon" style="background: #2563eb1f; color: #2563eb">
            <LayoutGrid :size="14" />
          </span>
          <span>全部应用</span>
          <span class="cat-count">{{ TOOLS.length }}</span>
        </button>

        <button
          v-for="cat in CATEGORIES"
          :key="cat.key"
          class="cat-btn"
          :class="{ active: store.category === cat.key }"
          :aria-pressed="store.category === cat.key"
          @click="selectCategory(cat.key)"
        >
          <span class="cat-icon" :style="{ background: `${cat.color}1f`, color: cat.color }">
            <component :is="CATEGORY_ICONS[cat.key]" :size="14" />
          </span>
          <span>{{ cat.label }}</span>
          <span class="cat-count">{{ counts.get(cat.key) || 0 }}</span>
        </button>
      </nav>
    </div>

    <div class="sidebar-block favorites-block">
      <div class="sidebar-title">
        <Bookmark :size="15" />
        <span>我的收藏</span>
      </div>
      <button
        class="favorites-toggle"
        :class="{ active: store.favsOnly }"
        :aria-pressed="store.favsOnly"
        @click="store.toggleFavsOnly()"
      >
        <Heart :size="16" />
        <span>仅看收藏</span>
        <b>{{ store.favorites.size }}</b>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: calc(var(--header-h) + 20px);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.sidebar-block {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.sidebar-title svg {
  width: 15px;
  height: 15px;
}

.cat-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cat-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 8px;
  color: var(--text-2);
  font-size: 14px;
  transition: background 0.15s, color 0.15s;
  text-align: left;
}

.cat-btn:hover {
  background: var(--surface-2);
  color: var(--text);
}

.cat-btn.active {
  background: var(--primary-soft);
  color: var(--primary-ink);
  font-weight: 600;
}

.cat-icon {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  flex-shrink: 0;
}

.cat-icon svg {
  width: 14px;
  height: 14px;
}

.cat-count {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-3);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 999px;
  min-width: 24px;
  height: 20px;
  display: grid;
  place-items: center;
  padding: 0 6px;
}

.cat-btn.active .cat-count {
  background: var(--surface);
  color: var(--primary-ink);
}

.favorites-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text-2);
  font-size: 14px;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.favorites-toggle svg {
  width: 16px;
  height: 16px;
  color: #f43f5e;
}

.favorites-toggle b {
  margin-left: auto;
  font-size: 13px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  min-width: 24px;
  height: 20px;
  display: grid;
  place-items: center;
  padding: 0 6px;
}

.favorites-toggle.active {
  border-color: #f43f5e;
  color: var(--text);
  background: color-mix(in srgb, #f43f5e 8%, var(--surface));
}

@media (max-width: 920px) {
  .sidebar {
    position: static;
    flex-direction: row;
    gap: 12px;
  }

  .sidebar-block {
    flex: 1;
  }

  .cat-list {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .cat-btn {
    width: auto;
  }
}

@media (max-width: 700px) {
  .sidebar {
    flex-direction: column;
  }
}
</style>

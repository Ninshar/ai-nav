<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Moon, Plus, Search, Sparkles, Sun, X } from "lucide-vue-next";
import { useAppStore } from "../stores/app";

const store = useAppStore();
const route = useRoute();
const searchInput = ref<HTMLInputElement | null>(null);

const isHome = computed(() => route.path === "/");

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value.trim().toLowerCase();
  store.setQuery(value);
}

function clearSearch() {
  if (searchInput.value) {
    searchInput.value.value = "";
    searchInput.value.focus();
  }
  store.setQuery("");
}

function toggleTheme() {
  store.setTheme(store.theme === "dark" ? "light" : "dark");
}

function onGlobalKey(e: KeyboardEvent) {
  if (e.key === "/" && document.activeElement !== searchInput.value) {
    e.preventDefault();
    searchInput.value?.focus();
  }
}

onMounted(() => document.addEventListener("keydown", onGlobalKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onGlobalKey));
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="#" aria-label="AI 应用导航首页" @click.prevent>
        <span class="brand-mark"><Sparkles :size="18" /></span>
        <span class="brand-name">AI 应用导航</span>
      </a>

      <nav class="top-nav" aria-label="主导航">
        <RouterLink to="/">应用导航</RouterLink>
        <RouterLink to="/models">模型排名</RouterLink>
        <RouterLink to="/interview">面试题</RouterLink>
        <RouterLink to="/vibe">Vibe Coding</RouterLink>
      </nav>

      <div v-if="isHome" class="search-wrap">
        <Search class="search-icon" :size="18" />
        <input
          ref="searchInput"
          type="search"
          placeholder="搜索应用、场景或功能"
          autocomplete="off"
          @input="onInput"
        />
        <button
          class="search-clear"
          :class="{ show: Boolean(store.query) }"
          aria-label="清空搜索"
          @click="clearSearch"
        >
          <X :size="15" />
        </button>
      </div>

      <div class="top-actions">
        <button
          class="icon-btn"
          aria-label="切换深浅色模式"
          title="切换深浅色模式"
          @click="toggleTheme"
        >
          <component :is="store.theme === 'dark' ? Sun : Moon" :size="18" />
        </button>
        <button class="primary-btn" @click="store.openSubmit()">
          <Plus :size="16" />
          <span>提交应用</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.topbar-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 17px;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 6px 16px -6px rgba(37, 99, 235, 0.55);
}

.brand-mark svg {
  width: 18px;
  height: 18px;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.top-nav a {
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
  transition: background 0.15s, color 0.15s;
}

.top-nav a:hover {
  background: var(--surface-2);
  color: var(--text);
}

.top-nav a.router-link-active {
  background: var(--primary-soft);
  color: var(--primary-ink);
}

.search-wrap {
  position: relative;
  flex: 1;
  max-width: 520px;
  margin: 0 auto;
}

.search-wrap :deep(.search-icon) {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-3);
  pointer-events: none;
}

.search-wrap input {
  width: 100%;
  height: 42px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  padding: 0 42px 0 42px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search-wrap input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: none;
  place-items: center;
  border-radius: 6px;
  color: var(--text-3);
  background: var(--surface-2);
}

.search-clear.show {
  display: grid;
}

.search-clear svg {
  width: 15px;
  height: 15px;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .topbar-inner {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 16px;
    gap: 10px 12px;
  }

  .brand-name {
    display: none;
  }

  .top-nav {
    order: 2;
    gap: 2px;
  }

  .top-nav a {
    padding: 6px 8px;
    font-size: 12.5px;
  }

  .search-wrap {
    order: 3;
    flex-basis: 100%;
    max-width: none;
    margin: 2px 0 0;
  }

  .top-actions {
    order: 1;
    margin-left: auto;
  }

  .top-actions .primary-btn span {
    display: none;
  }

  .top-actions .primary-btn {
    width: 40px;
    padding: 0;
    justify-content: center;
  }
}
</style>

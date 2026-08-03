/**
 * 全局状态仓库：组件通过 subscribe 订阅变更，通过动作函数修改状态。
 * 组件之间不直接互相调用，只依赖 store，便于独立维护与测试。
 */
import { loadFavorites, loadTheme, saveFavorites, saveTheme } from "./storage.js";

/** 免费筛选匹配的定价档位 */
export const FREE_PRICING = ["免费", "免费额度", "开源"];

const state = {
  category: "all",
  query: "",
  sort: "default",
  freeOnly: false,
  favsOnly: false,
  favorites: loadFavorites(),
  theme: loadTheme(),
};

const listeners = new Set();

export function getState() {
  return state;
}

/** 订阅状态变更，返回取消订阅函数 */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener(state));
}

export function setCategory(key) {
  state.category = key;
  // 选择具体分类时退出“仅看收藏”
  if (state.favsOnly) state.favsOnly = false;
  emit();
}

export function setQuery(query) {
  state.query = query;
  emit();
}

export function setSort(sort) {
  state.sort = sort;
  emit();
}

export function toggleFreeOnly() {
  state.freeOnly = !state.freeOnly;
  emit();
}

export function toggleFavsOnly() {
  state.favsOnly = !state.favsOnly;
  // 开启“仅看收藏”时回到全部应用，避免与分类叠加
  if (state.favsOnly) state.category = "all";
  emit();
}

/** 切换收藏，返回 true 表示已加入、false 表示已取消 */
export function toggleFavorite(id) {
  const added = !state.favorites.has(id);
  if (added) {
    state.favorites.add(id);
  } else {
    state.favorites.delete(id);
  }
  saveFavorites(state.favorites);
  emit();
  return added;
}

export function setTheme(theme) {
  state.theme = theme;
  saveTheme(theme);
  emit();
}

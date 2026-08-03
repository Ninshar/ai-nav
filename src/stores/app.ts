/**
 * 全局状态：筛选/排序/收藏/主题，以及弹窗等 UI 状态。
 * 组件只通过 store 读写状态，互不直接耦合。
 */
import { defineStore } from "pinia";
import { CATEGORY_MAP, FREE_PRICING, TOOLS } from "../data";
import type { Tool } from "../data/types";
import {
  loadFavorites,
  loadTheme,
  saveFavorites,
  saveTheme,
  type ThemeMode,
} from "../utils/storage";

export type SortMode = "default" | "rating" | "favs" | "newest";

export const useAppStore = defineStore("app", {
  state: () => ({
    category: "all" as string,
    query: "",
    sort: "default" as SortMode,
    freeOnly: false,
    favsOnly: false,
    favorites: loadFavorites(),
    theme: loadTheme(),
    activeToolId: null as string | null,
    submitOpen: false,
  }),

  getters: {
    /** 按当前筛选条件计算后的应用列表 */
    filteredTools(state): Tool[] {
      const list = TOOLS.filter((tool) => {
        if (state.category !== "all" && tool.category !== state.category) return false;
        if (state.favsOnly && !state.favorites.has(tool.id)) return false;
        if (state.freeOnly && !FREE_PRICING.includes(tool.pricing)) return false;
        if (state.query) {
          const hay = `${tool.name} ${tool.desc} ${tool.tags.join(" ")} ${
            CATEGORY_MAP.get(tool.category)!.label
          }`.toLowerCase();
          if (!hay.includes(state.query)) return false;
        }
        return true;
      });

      switch (state.sort) {
        case "rating":
          return [...list].sort((a, b) => b.rating - a.rating);
        case "favs":
          return [...list].sort((a, b) => b.favs - a.favs);
        case "newest":
          return [...list].sort((a, b) => b.added.localeCompare(a.added));
        default:
          return [...list].sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            return b.favs - a.favs;
          });
      }
    },
  },

  actions: {
    setCategory(key: string) {
      this.category = key;
      // 选择具体分类时退出“仅看收藏”
      if (this.favsOnly) this.favsOnly = false;
    },
    setQuery(query: string) {
      this.query = query;
    },
    setSort(sort: SortMode) {
      this.sort = sort;
    },
    toggleFreeOnly() {
      this.freeOnly = !this.freeOnly;
    },
    toggleFavsOnly() {
      this.favsOnly = !this.favsOnly;
      // 开启“仅看收藏”时回到全部应用，避免与分类叠加
      if (this.favsOnly) this.category = "all";
    },
    /** 切换收藏，返回 true 表示已加入、false 表示已取消 */
    toggleFavorite(id: string): boolean {
      const added = !this.favorites.has(id);
      if (added) {
        this.favorites.add(id);
      } else {
        this.favorites.delete(id);
      }
      saveFavorites(this.favorites);
      return added;
    },
    setTheme(theme: ThemeMode) {
      this.theme = theme;
      saveTheme(theme);
    },
    openTool(id: string) {
      this.activeToolId = id;
    },
    closeTool() {
      this.activeToolId = null;
    },
    openSubmit() {
      this.submitOpen = true;
    },
    closeSubmit() {
      this.submitOpen = false;
    },
  },
});

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ModelsView from "../views/ModelsView.vue";

/**
 * 使用 hash 模式：GitHub Pages 无需服务器重写规则，
 * 任意子路径刷新都不会 404。
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/models", name: "models", component: ModelsView },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

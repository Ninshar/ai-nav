/** 顶栏：搜索、清空、主题切换、提交入口与快捷键 */
import { getState, setQuery, setTheme, subscribe } from "../core/store.js";
import { $ } from "../utils/dom.js";
import { refreshIcons } from "../utils/icons.js";
import { openSubmitModal } from "./submitModal.js";

export function initTopbar() {
  const search = $("#searchInput");
  const clear = $("#clearSearch");
  const themeToggle = $("#themeToggle");
  const themeIcon = $("#themeIcon");

  search.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    clear.classList.toggle("show", Boolean(query));
    setQuery(query);
  });

  clear.addEventListener("click", () => {
    search.value = "";
    clear.classList.remove("show");
    setQuery("");
    search.focus();
  });

  themeToggle.addEventListener("click", () => {
    const next = getState().theme === "dark" ? "light" : "dark";
    setTheme(next);
  });

  $("#submitBtn").addEventListener("click", openSubmitModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
  });

  // 立即应用初始主题，并订阅后续变更
  applyTheme(getState().theme);
  subscribe((state) => {
    applyTheme(state.theme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("#themeIcon").setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
  refreshIcons();
}

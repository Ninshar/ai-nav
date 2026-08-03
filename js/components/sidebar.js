/** 侧边栏：分类列表 + “仅看收藏”开关，随状态变化自动重渲染 */
import { CATEGORIES, CATEGORY_MAP, TOOLS } from "../data/index.js";
import { getState, setCategory, subscribe, toggleFavsOnly } from "../core/store.js";
import { $ } from "../utils/dom.js";
import { refreshIcons } from "../utils/icons.js";

export function initSidebar() {
  const catList = $("#catList");
  const favsToggle = $("#favsToggle");

  function render() {
    const state = getState();
    const counts = countByCategory();

    const rows = CATEGORIES.map((cat) => {
      const active = state.category === cat.key ? " active" : "";
      const color = cat.color;
      return `
        <button class="cat-btn${active}" data-cat="${cat.key}" aria-pressed="${active ? "true" : "false"}">
          <span class="cat-icon" style="background:${color}1f;color:${color}">
            <i data-lucide="${cat.icon}"></i>
          </span>
          <span>${cat.label}</span>
          <span class="cat-count">${counts.get(cat.key) || 0}</span>
        </button>
      `;
    }).join("");

    const allActive = state.category === "all" ? " active" : "";
    catList.innerHTML = `
      <button class="cat-btn${allActive}" data-cat="all" aria-pressed="${allActive ? "true" : "false"}">
        <span class="cat-icon" style="background:#2563eb1f;color:#2563eb">
          <i data-lucide="layout-grid"></i>
        </span>
        <span>全部应用</span>
        <span class="cat-count">${TOOLS.length}</span>
      </button>
      ${rows}
    `;

    favsToggle.classList.toggle("active", state.favsOnly);
    favsToggle.setAttribute("aria-pressed", String(state.favsOnly));
    $("#favCount").textContent = state.favorites.size;
    refreshIcons();
  }

  catList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    setCategory(btn.dataset.cat);
  });

  favsToggle.addEventListener("click", toggleFavsOnly);

  subscribe(render);
  render();
}

function countByCategory() {
  const map = new Map();
  TOOLS.forEach((tool) => map.set(tool.category, (map.get(tool.category) || 0) + 1));
  return map;
}

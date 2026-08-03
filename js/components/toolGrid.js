/** 工具区：筛选/排序控件 + 卡片网格 + 空状态 */
import { CATEGORY_MAP, TOOLS } from "../data/index.js";
import { FREE_PRICING, getState, setSort, subscribe, toggleFavorite, toggleFreeOnly } from "../core/store.js";
import { $ } from "../utils/dom.js";
import { escapeHtml, formatCount, initialOf, shadeColor } from "../utils/format.js";
import { faviconImgMarkup, refreshIcons } from "../utils/icons.js";
import { openToolModal } from "./toolModal.js";
import { showToast } from "./toast.js";

export function initToolGrid() {
  const grid = $("#toolsGrid");
  const freeToggle = $("#freeToggle");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".tool-card");
    if (!card) return;
    if (e.target.closest(".fav-btn")) {
      handleFavoriteToggle(card.dataset.id);
      return;
    }
    if (e.target.closest(".visit-btn")) {
      e.preventDefault();
      window.open(e.target.closest(".visit-btn").dataset.url, "_blank", "noopener");
      return;
    }
    openToolModal(card.dataset.id);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".tool-card");
    if (!card) return;
    e.preventDefault();
    if (e.target.closest(".fav-btn")) {
      handleFavoriteToggle(card.dataset.id);
      return;
    }
    if (e.target.closest(".visit-btn")) {
      window.open(e.target.closest(".visit-btn").dataset.url, "_blank", "noopener");
      return;
    }
    openToolModal(card.dataset.id);
  });

  freeToggle.addEventListener("click", toggleFreeOnly);
  $("#sortSelect").addEventListener("change", (e) => setSort(e.target.value));

  subscribe(render);
  render();
}

function handleFavoriteToggle(id) {
  const added = toggleFavorite(id);
  showToast(added ? "已加入收藏" : "已取消收藏");
}

function render() {
  const state = getState();
  const list = getFilteredTools(state);
  const grid = $("#toolsGrid");

  $("#resultSummary").textContent = `共 ${list.length} 款应用`;
  $("#freeToggle").classList.toggle("active", state.freeOnly);
  $("#freeToggle").setAttribute("aria-pressed", String(state.freeOnly));

  if (!list.length) {
    grid.innerHTML = "";
    $("#emptyState").hidden = false;
  } else {
    $("#emptyState").hidden = true;
    grid.innerHTML = list.map((tool) => toolCard(tool, state.favorites.has(tool.id))).join("");
  }
  refreshIcons();
}

function getFilteredTools(state) {
  const list = TOOLS.filter((tool) => {
    if (state.category !== "all" && tool.category !== state.category) return false;
    if (state.favsOnly && !state.favorites.has(tool.id)) return false;
    if (state.freeOnly && !FREE_PRICING.includes(tool.pricing)) return false;
    if (state.query) {
      const hay = `${tool.name} ${tool.desc} ${tool.tags.join(" ")} ${CATEGORY_MAP.get(tool.category).label}`.toLowerCase();
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
}

function toolCard(tool, isFav) {
  const cat = CATEGORY_MAP.get(tool.category);
  return `
    <article class="tool-card" data-id="${tool.id}" tabindex="0" role="button"
      aria-label="查看 ${escapeHtml(tool.name)} 详情">
      <div class="card-top">
        <div class="tool-logo" style="background:linear-gradient(135deg, ${cat.color}, ${shadeColor(cat.color, -18)})">
          <span>${escapeHtml(initialOf(tool.name))}</span>
          ${faviconImgMarkup(tool.domain)}
        </div>
        <div class="card-title">
          <h3>${escapeHtml(tool.name)}</h3>
          <span class="domain">${escapeHtml(tool.domain)}</span>
        </div>
        <button class="fav-btn ${isFav ? "active" : ""}" data-id="${tool.id}" aria-label="收藏 ${escapeHtml(tool.name)}">
          <i data-lucide="heart"></i>
        </button>
      </div>
      <p class="tool-desc">${escapeHtml(tool.desc)}</p>
      <div class="tool-tags">
        ${tool.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="card-foot">
        <span class="rating"><i data-lucide="star"></i>${tool.rating.toFixed(1)}</span>
        <span class="pricing">${escapeHtml(tool.pricing)}</span>
        <a class="visit-btn" href="${tool.url}" data-url="${tool.url}" target="_blank" rel="noopener">
          访问<i data-lucide="arrow-up-right"></i>
        </a>
      </div>
    </article>
  `;
}

/** 应用详情弹窗：打开时按工具数据渲染，收藏状态随 store 同步 */
import { CATEGORY_MAP, TOOLS } from "../data/index.js";
import { getState, subscribe, toggleFavorite } from "../core/store.js";
import { $, lockBodyScroll } from "../utils/dom.js";
import { escapeHtml, formatCount, initialOf, shadeColor } from "../utils/format.js";
import { faviconImgMarkup, refreshIcons } from "../utils/icons.js";
import { showToast } from "./toast.js";

let activeToolId = null;

export function initToolModal() {
  const modal = $("#toolModal");
  $("#modalClose").addEventListener("click", closeToolModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeToolModal();
  });
  // 收藏状态变化时刷新弹窗内的收藏按钮
  subscribe(() => {
    if (activeToolId) render(TOOLS.find((t) => t.id === activeToolId));
  });
}

export function openToolModal(id) {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return;
  activeToolId = id;
  render(tool);
  $("#toolModal").hidden = false;
  lockBodyScroll(true);
  refreshIcons();
}

export function closeToolModal() {
  $("#toolModal").hidden = true;
  lockBodyScroll(false);
  activeToolId = null;
}

function render(tool) {
  const cat = CATEGORY_MAP.get(tool.category);
  const isFav = getState().favorites.has(tool.id);

  $("#modalHead").innerHTML = `
    <div class="modal-logo" style="background:linear-gradient(135deg, ${cat.color}, ${shadeColor(cat.color, -18)})">
      <span>${escapeHtml(initialOf(tool.name))}</span>
      ${faviconImgMarkup(tool.domain, { lazy: false })}
    </div>
    <div>
      <h3>${escapeHtml(tool.name)}</h3>
      <div class="modal-title-meta">
        <span class="pricing">${escapeHtml(tool.pricing)}</span>
        <a class="domain-link" href="${tool.url}" target="_blank" rel="noopener">${escapeHtml(tool.domain)}</a>
      </div>
    </div>
  `;

  $("#modalBody").innerHTML = `
    <p>${escapeHtml(tool.desc)}</p>
    <div class="modal-info-grid">
      <div class="info-cell">
        <span>分类</span>
        <b>${cat.label}</b>
      </div>
      <div class="info-cell">
        <span>评分</span>
        <b>${tool.rating.toFixed(1)} / 5.0</b>
      </div>
      <div class="info-cell">
        <span>收藏数</span>
        <b>${formatCount(tool.favs)}</b>
      </div>
      <div class="info-cell">
        <span>支持平台</span>
        <b>${escapeHtml(tool.platforms.join(" · "))}</b>
      </div>
    </div>
    <div class="modal-tags">
      ${tool.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;

  const foot = $("#modalFoot");
  foot.innerHTML = `
    <button class="fav-btn ${isFav ? "active" : ""}" data-id="${tool.id}" aria-label="收藏 ${escapeHtml(tool.name)}">
      <i data-lucide="heart"></i>
    </button>
    <a class="primary-btn" href="${tool.url}" target="_blank" rel="noopener">
      <i data-lucide="external-link"></i>
      <span>访问官网</span>
    </a>
  `;
  foot.querySelector(".fav-btn").addEventListener("click", () => {
    const added = toggleFavorite(tool.id);
    showToast(added ? "已加入收藏" : "已取消收藏");
  });
}

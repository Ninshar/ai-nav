/**
 * 应用入口：装配各组件与全局快捷键。
 * 组件之间的数据流统一经过 js/core/store.js，互不直接依赖。
 */
import { closeSubmitModal, initSubmitModal } from "./components/submitModal.js";
import { initSidebar } from "./components/sidebar.js";
import { initToolGrid } from "./components/toolGrid.js";
import { closeToolModal, initToolModal } from "./components/toolModal.js";
import { initTopbar } from "./components/topbar.js";
import { renderLogoCloud, renderStats } from "./components/hero.js";
import { $, $$ } from "./utils/dom.js";
import { refreshIcons } from "./utils/icons.js";

function init() {
  initTopbar();
  renderStats();
  renderLogoCloud();
  initSidebar();
  initToolGrid();
  initToolModal();
  initSubmitModal();

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!$("#toolModal").hidden) closeToolModal();
    if (!$("#submitModal").hidden) closeSubmitModal();
  });

  $$("[data-scroll='top']").forEach((btn) => {
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  });

  refreshIcons();
}

init();

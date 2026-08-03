/** 首屏：统计数字 + Logo 云（内容为静态数据，初始化时渲染一次） */
import { CATEGORIES, CATEGORY_MAP, TOOLS } from "../data/index.js";
import { $ } from "../utils/dom.js";
import { escapeHtml, initialOf } from "../utils/format.js";
import { faviconImgMarkup } from "../utils/icons.js";

const CLOUD_SIZE = 8;

export function renderStats() {
  $("#statTools").textContent = TOOLS.length;
  $("#statCats").textContent = CATEGORIES.length;
  $("#statFeatured").textContent = TOOLS.filter((t) => t.featured).length;
}

export function renderLogoCloud() {
  const top = [...TOOLS].sort((a, b) => b.favs - a.favs).slice(0, CLOUD_SIZE);
  $("#logoCloud").innerHTML = top
    .map((tool) => {
      const color = CATEGORY_MAP.get(tool.category).color;
      return `
        <div class="cloud-logo" title="${escapeHtml(tool.name)}" style="background:${color}1a;border-color:${color}40">
          <span class="cloud-initial" style="color:${color}">${escapeHtml(initialOf(tool.name))}</span>
          ${faviconImgMarkup(tool.domain)}
        </div>
      `;
    })
    .join("");
}

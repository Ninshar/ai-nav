/** favicon 与 lucide 图标相关工具 */

const FAVICON_SERVICE = "https://icon.horse/icon/";
const FALLBACK_SERVICE = "https://unavatar.io/";

export function faviconUrl(domain) {
  return `${FAVICON_SERVICE}${encodeURIComponent(domain)}`;
}

/**
 * 生成图片失败时的回退逻辑（内联 onerror 属性）
 * 第一层换 unavatar，第二层直接移除图片，露出首字母占位。
 */
export function faviconFallbackAttr(domain) {
  const fallback = `${FALLBACK_SERVICE}${encodeURIComponent(domain)}`;
  return `if(this.dataset.f==&quot;g&quot;){this.dataset.f=&quot;d&quot;;this.src=&quot;${fallback}&quot;}else{this.remove()}`;
}

/** 生成 favicon <img> 标记，lazy 控制是否延迟加载 */
export function faviconImgMarkup(domain, { lazy = true } = {}) {
  return `<img src="${faviconUrl(domain)}" alt="" ${lazy ? 'loading="lazy"' : ""} referrerpolicy="no-referrer" data-f="g"
    onload="if(this.previousElementSibling)this.previousElementSibling.style.display=&quot;none&quot;"
    onerror="${faviconFallbackAttr(domain)}">`;
}

/** 渲染完成后刷新 lucide 图标（把 <i data-lucide> 替换为 SVG） */
export function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

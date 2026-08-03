/** DOM 查询与页面状态小工具 */

export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

/** 弹窗打开时锁定/恢复页面滚动 */
export function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

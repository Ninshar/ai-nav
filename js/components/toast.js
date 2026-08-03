/** 轻提示：全局唯一实例，任意组件可调用 showToast */
import { $ } from "../utils/dom.js";

const TOAST_DURATION = 2200;
let timer = null;

export function showToast(message) {
  const toast = $("#toast");
  clearTimeout(timer);
  toast.textContent = message;
  toast.hidden = false;
  timer = setTimeout(() => {
    toast.hidden = true;
  }, TOAST_DURATION);
}

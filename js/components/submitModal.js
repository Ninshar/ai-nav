/** 提交应用弹窗：收集表单写入 localStorage（待审核列表） */
import { loadSubmissions, saveSubmissions } from "../core/storage.js";
import { $, lockBodyScroll } from "../utils/dom.js";
import { refreshIcons } from "../utils/icons.js";
import { showToast } from "./toast.js";

export function initSubmitModal() {
  const modal = $("#submitModal");
  const form = $("#submitForm");

  $("#submitClose").addEventListener("click", closeSubmitModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSubmitModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const record = {
      name: data.get("name"),
      url: data.get("url"),
      desc: data.get("desc"),
      at: new Date().toISOString(),
    };
    const pending = loadSubmissions();
    pending.push(record);
    saveSubmissions(pending);
    form.reset();
    closeSubmitModal();
    showToast("提交成功，我们会尽快审核");
  });
}

export function openSubmitModal() {
  $("#submitModal").hidden = false;
  lockBodyScroll(true);
  $("#submitForm").querySelector("input").focus();
  refreshIcons();
}

export function closeSubmitModal() {
  $("#submitModal").hidden = true;
  lockBodyScroll(false);
}

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Check, Send, X } from "lucide-vue-next";
import { loadSubmissions, saveSubmissions, type Submission } from "../utils/storage";
import { useAppStore } from "../stores/app";
import { useToastStore } from "../stores/toast";

const store = useAppStore();
const toast = useToastStore();
const form = ref<HTMLFormElement | null>(null);

const visible = computed(() => store.submitOpen);

// 弹窗打开时锁定滚动并聚焦第一个输入框
watch(
  visible,
  (v) => {
    document.body.style.overflow = v ? "hidden" : "";
    if (v) {
      nextTick(() => form.value?.querySelector("input")?.focus());
    }
  },
  { immediate: true },
);

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && visible.value) store.closeSubmit();
}

onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});

function onSubmit(e: Event) {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  const record: Submission = {
    name: String(data.get("name") ?? ""),
    url: String(data.get("url") ?? ""),
    desc: String(data.get("desc") ?? ""),
    at: new Date().toISOString(),
  };
  const pending = loadSubmissions();
  pending.push(record);
  saveSubmissions(pending);
  (e.target as HTMLFormElement).reset();
  store.closeSubmit();
  toast.show("提交成功，我们会尽快审核");
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submitTitle"
      @click.self="store.closeSubmit()"
    >
      <div class="modal small">
        <button class="modal-close" aria-label="关闭提交表单" @click="store.closeSubmit()">
          <X :size="17" />
        </button>

        <div class="modal-head">
          <div class="modal-title-row">
            <span class="modal-icon"><Send :size="21" /></span>
            <div>
              <h3 id="submitTitle">提交应用</h3>
              <p>告诉我们值得收录的 AI 产品</p>
            </div>
          </div>
        </div>

        <form ref="form" class="submit-form" @submit="onSubmit">
          <label>
            <span>应用名称</span>
            <input name="name" type="text" required maxlength="40" placeholder="例如：ChatGPT" />
          </label>
          <label>
            <span>官网地址</span>
            <input name="url" type="url" required placeholder="https://" />
          </label>
          <label>
            <span>一句话介绍</span>
            <textarea name="desc" required maxlength="120" rows="3" placeholder="这个应用主要解决什么问题？"></textarea>
          </label>
          <button class="primary-btn wide" type="submit">
            <Check :size="16" />
            <span>提交收录</span>
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-title-row h3 {
  font-size: 20px;
  font-weight: 800;
}

.modal-title-row p {
  color: var(--text-3);
  font-size: 13px;
  margin-top: 3px;
}

.modal-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: var(--primary-soft);
  color: var(--primary-ink);
  border-radius: 8px;
  flex-shrink: 0;
}

.modal-icon svg {
  width: 21px;
  height: 21px;
}

.submit-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
}

.submit-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.submit-form input,
.submit-form textarea {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.submit-form input:focus,
.submit-form textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
  background: var(--surface);
}
</style>

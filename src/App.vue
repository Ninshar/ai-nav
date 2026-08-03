<script setup lang="ts">
import { watch } from "vue";
import TopBar from "./components/TopBar.vue";
import Hero from "./components/Hero.vue";
import ToolsSection from "./components/ToolsSection.vue";
import ToolModal from "./components/ToolModal.vue";
import SubmitModal from "./components/SubmitModal.vue";
import Toast from "./components/Toast.vue";
import { useAppStore } from "./stores/app";

const store = useAppStore();

// 主题应用到 <html> 并持久化
watch(
  () => store.theme,
  (theme) => {
    document.documentElement.dataset.theme = theme;
  },
  { immediate: true },
);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div class="app-shell">
    <TopBar />
    <main>
      <Hero />
      <ToolsSection />
    </main>

    <footer class="footer">
      <p>AI 应用导航 · 收录内容仅供学习参考，请以官网信息为准</p>
      <div class="footer-links">
        <button class="link-btn" @click="scrollToTop">返回顶部</button>
      </div>
    </footer>

    <ToolModal />
    <SubmitModal />
    <Toast />
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 28px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--text-3);
  font-size: 13px;
  flex-wrap: wrap;
}

.link-btn {
  color: var(--primary-ink);
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 700px) {
  .app-shell {
    padding: 0 16px;
  }

  .footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

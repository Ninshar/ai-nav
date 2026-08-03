<script setup lang="ts">
import { useToastStore } from "../stores/toast";

const toast = useToastStore();
</script>

<template>
  <Teleport to="body">
    <div v-if="toast.visible" class="toast" role="status" aria-live="polite">
      {{ toast.message }}
    </div>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  background: var(--text);
  color: var(--bg);
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.2s ease;
}
</style>

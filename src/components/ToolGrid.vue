<script setup lang="ts">
import { useAppStore } from "../stores/app";
import ToolCard from "./ToolCard.vue";

const store = useAppStore();
</script>

<template>
  <div class="tools-grid">
    <ToolCard v-for="tool in store.filteredTools" :key="tool.id" :tool="tool" @open="store.openTool" />
  </div>
</template>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

@media (max-width: 700px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>

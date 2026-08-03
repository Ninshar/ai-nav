import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // 相对路径构建产物，兼容 GitHub Pages 子目录部署
  base: "./",
  server: {
    port: 5173,
  },
});

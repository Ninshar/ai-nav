<script setup lang="ts">
import { computed } from "vue";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import dart from "highlight.js/lib/languages/dart";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import type { CodeLang } from "../data/interview";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);

const props = defineProps<{ lang: CodeLang; source: string }>();

// hljs 默认会对源码做 HTML 转义，v-html 是安全的
const highlighted = computed(() => {
  try {
    return hljs.highlight(props.source, { language: props.lang, ignoreIllegals: true }).value;
  } catch {
    return props.source;
  }
});
</script>

<template>
  <pre class="code-block"><code :class="`language-${lang}`" v-html="highlighted" /></pre>
</template>

<style scoped>
.code-block {
  margin-top: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  background: #0f172a;
  border: 1px solid #1e293b;
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.6;
}

.code-block code {
  font-family: "JetBrains Mono", "Cascadia Code", Consolas, "Courier New", monospace;
  color: #e2e8f0;
}

/* 精简语法高亮（hljs 类名） */
.code-block :deep(.hljs-keyword),
.code-block :deep(.hljs-selector-tag),
.code-block :deep(.hljs-literal),
.code-block :deep(.hljs-type) {
  color: #c084fc;
}

.code-block :deep(.hljs-string),
.code-block :deep(.hljs-attr) {
  color: #86efac;
}

.code-block :deep(.hljs-number),
.code-block :deep(.hljs-title),
.code-block :deep(.hljs-function .hljs-title) {
  color: #fbbf24;
}

.code-block :deep(.hljs-comment) {
  color: #64748b;
  font-style: italic;
}

.code-block :deep(.hljs-built_in),
.code-block :deep(.hljs-variable),
.code-block :deep(.hljs-params) {
  color: #93c5fd;
}

html[data-theme="dark"] .code-block {
  background: #0b1220;
  border-color: #26334d;
}
</style>

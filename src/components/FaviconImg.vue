<script setup lang="ts">
/**
 * favicon 图片：失败时依次回退到 unavatar、移除图片露出首字母。
 * 首字母通过 slot 传入，由父组件控制其类名与样式。
 */
import { ref } from "vue";
import { fallbackUrl, faviconUrl } from "../utils/icons";

const props = withDefaults(defineProps<{ domain: string; lazy?: boolean }>(), {
  lazy: true,
});

const src = ref(faviconUrl(props.domain));
const imgLoaded = ref(false);
const failedOnce = ref(false);
const failedTwice = ref(false);

function onLoad() {
  imgLoaded.value = true;
}

function onError() {
  if (!failedOnce.value) {
    failedOnce.value = true;
    src.value = fallbackUrl(props.domain);
  } else {
    failedTwice.value = true;
  }
}
</script>

<template>
  <span v-show="!imgLoaded" class="favicon-initial"><slot /></span>
  <img
    v-if="!failedTwice"
    :src="src"
    alt=""
    :loading="props.lazy ? 'lazy' : undefined"
    referrerpolicy="no-referrer"
    @load="onLoad"
    @error="onError"
  />
</template>

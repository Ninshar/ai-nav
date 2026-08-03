/** favicon 服务与分类图标映射 */
import type { Component } from "vue";
import {
  Briefcase,
  ChartColumnBig,
  Clapperboard,
  Code2,
  Image,
  MessagesSquare,
  Search,
  Smile,
} from "lucide-vue-next";
import type { CategoryKey } from "../data/types";

const FAVICON_SERVICE = "https://icon.horse/icon/";
const FALLBACK_SERVICE = "https://unavatar.io/";

export function faviconUrl(domain: string): string {
  return `${FAVICON_SERVICE}${encodeURIComponent(domain)}`;
}

export function fallbackUrl(domain: string): string {
  return `${FALLBACK_SERVICE}${encodeURIComponent(domain)}`;
}

/** 分类 key -> lucide 图标组件（数据驱动渲染） */
export const CATEGORY_ICONS: Record<CategoryKey, Component> = {
  assistant: MessagesSquare,
  code: Code2,
  image: Image,
  video: Clapperboard,
  office: Briefcase,
  search: Search,
  life: Smile,
  data: ChartColumnBig,
};

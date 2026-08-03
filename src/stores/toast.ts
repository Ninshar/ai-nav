/** 轻提示状态：任意组件可通过 useToastStore().show(msg) 触发 */
import { defineStore } from "pinia";

const TOAST_DURATION = 2200;

export const useToastStore = defineStore("toast", {
  state: () => ({
    message: "",
    visible: false,
    timer: null as ReturnType<typeof setTimeout> | null,
  }),
  actions: {
    show(message: string) {
      if (this.timer) clearTimeout(this.timer);
      this.message = message;
      this.visible = true;
      this.timer = setTimeout(() => {
        this.visible = false;
      }, TOAST_DURATION);
    },
  },
});

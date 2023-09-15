import { defineStore } from "pinia";

export const useTemplateStore = defineStore("toolTemplate", {
  state: () => {
    return {
      list: [],
    };
  },
  actions: {
    // 新增聊天模板
    add(params) {
      this.list.unshift({
        id: `template-${Date.now()}`,
        ...params
      })
    },
    delete(id) {
      this.list = this.list.filter(item => item.id != id);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});

import { defineStore } from "pinia";
import { indexedDBStorage } from "@/utils/storage";

export const useTemplateStore = defineStore("toolTemplate", {
  state: () => ({
    list: [],
  }),
  actions: {
    async init() {
      const toolTemplate = await indexedDBStorage.getItem('toolTemplate');
      if (!toolTemplate) return;
      const {list} = JSON.parse(toolTemplate);
      this.list = list;
    },
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
        storage: indexedDBStorage,
      },
    ],
  },
});

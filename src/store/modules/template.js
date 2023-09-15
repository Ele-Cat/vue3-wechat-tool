import { defineStore } from "pinia";

export const useTemplateStore = defineStore("toolTemplate", {
  state: () => {
    return {
      templateList: [],
    };
  },
  actions: {
    // 新增聊天模板
    addTemplate(params) {
      this.templateList.unshift({
        id: `template-${Date.now()}`,
        ...params
      })
    },
    delete(id) {
      this.templateList = this.templateList.filter(item => item.id != id);
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

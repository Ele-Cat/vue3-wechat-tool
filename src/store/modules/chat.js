import { defineStore } from "pinia";

export const useChatStore = defineStore("toolChat", {
  state: () => {
    return {
      chatList: [], // 聊天列表
    };
  },
  actions: {
    addChat() {
    },
    editChat() {
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

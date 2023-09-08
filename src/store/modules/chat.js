import { defineStore } from "pinia";

export const useChatStore = defineStore("toolChat", {
  state: () => {
    return {
      chatList: [], // 聊天列表
      activeType: "text",
    };
  },
  actions: {
    sentChat({role, type, content}) {
      this.chatList.push({
        id: "chat-" + Date.now(),
        type,
        content,
        role,
      })
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

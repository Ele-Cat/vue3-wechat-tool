import { defineStore } from "pinia";

export const useChatStore = defineStore("toolChat", {
  state: () => {
    return {
      chatList: [], // 聊天列表
      activeType: "text",
    };
  },
  actions: {
    sentChat(chatInfo) {
      this.chatList.push({
        id: "chat-" + Date.now(),
        ...chatInfo,
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

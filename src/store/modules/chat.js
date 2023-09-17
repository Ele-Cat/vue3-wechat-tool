import { defineStore } from "pinia";
import { useUserStore } from "./user"

export const useChatStore = defineStore("toolChat", {
  state: () => {
    return {
      chatList: [], // 聊天列表
      activeType: "text",
      inputText: "",
    };
  },
  getters: {
  },
  actions: {
    /**
     * 根据角色返回已发送消息列表
     * @returns 
     */
    receiveList() {
      let receiveList = this.chatList.filter(chat => chat.role === useUserStore().activeRole).map(chat => {
        return {
          label: chat.content || content,
          value: chat.id,
          disabled: chat.received,
        }
      });
      return receiveList;
    },
    receiveChat(chatId) {
      this.chatList.map(chat => {
        if (chat.id === chatId) {
          chat.received = true;
        }
      })
    },
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
        paths: ["chatList", "activeType"],
      },
    ],
  },
});

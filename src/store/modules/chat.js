import { defineStore } from "pinia";

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
     * 可领取的列表【红包、转账】，只能领取对方发送的
     * @param {*} activeRole 当前角色
     * @returns 
     */
    receiveList(activeRole) {
      let receiveList = this.chatList.filter(chat => ["transferAccounts", "redEnvelope"].includes(chat.type) && chat.role != activeRole).map(chat => {
        let content = chat.type === "transferAccounts" ? "转账" : "红包"
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
      },
    ],
  },
});

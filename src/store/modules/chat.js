import { defineStore } from "pinia";
import eventBus from '@/utils/eventBus';
import { indexedDBStorage } from "@/utils/storage";
import { useUserStore } from "./user";

export const useChatStore = defineStore("toolChat", {
  state: () => ({
    chatList: [], // 聊天列表
    activeType: "text",
    inputText: "",
    generateConfig: {
      minInterval: 1500,
      maxInterval: 3000,
    }
  }),
  getters: {
    /**
     * 根据角色返回已发送消息列表
     * @returns 
     */
    sendList() {
      let sendList = this.chatList.filter(chat => chat.role === useUserStore().activeRole).map(chat => {
        return {
          label: chat.content || content,
          value: chat.id,
          disabled: chat.received,
        }
      });
      return sendList;
    }
  },
  actions: {
    async init() {
      const toolChat = await indexedDBStorage.getItem('toolChat');
      if (!toolChat) return;
      const {chatList, activeType, generateConfig} = JSON.parse(toolChat);
      this.chatList = chatList;
      this.activeType = activeType;
      this.generateConfig = generateConfig;
    },
    // 将某条消息置为已接收
    receiveChat(chatId) {
      this.chatList.map(chat => {
        if (chat.id === chatId) {
          chat.received = true;
        }
      })
    },
    // 发送消息
    sentChat(chatInfo) {
      this.chatList.push({
        id: "chat-" + Date.now(),
        user: useUserStore().activeUser,
        ...chatInfo,
      })
      eventBus.emit("sentChat");
    },
    // 修改消息
    editChat(chatInfo) {
      const editIndex = this.chatList.findIndex(chat => chat.id === chatInfo.id);
      this.chatList.splice(editIndex, 1, chatInfo);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: indexedDBStorage,
        paths: ["chatList", "activeType", "generateConfig"],
      },
    ],
  },
});

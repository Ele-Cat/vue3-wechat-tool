import { defineStore } from "pinia";
import { otherAvatar } from "@/utils/avatar";
import { indexedDBStorage } from "@/utils/storage";

export const useUserStore = defineStore("toolUser", {
  state: () => ({
    userList: [],
    activeUserId: "",
  }),
  getters: {
    activeRole() {
      return this.activeUserId === "user-0" ? "own" : "other";
    },
    ownInfo() {
      return this.userList[0];
    },
    activeUser() {
      const user = this.userList.find(user => user.id === this.activeUserId) || {};
      return user;
    },
  },
  actions: {
    async init() {
      const toolUser = await indexedDBStorage.getItem('toolUser');
      if (!toolUser) return;
      const {userList, activeUserId} = JSON.parse(toolUser);
      this.userList = userList;
      this.activeUserId = activeUserId;
    },
    addUser() {
      this.userList.push({
        nickname: "微信用户",
        // avatar: otherAvatar,
        role: "other",
        id: "user-" + Date.now(),
      })
    },
    selectUser(id) {
      this.activeUserId = id;
    },
    deleteUser(id) {
      this.userList = this.userList.filter(user => user.id != id);
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

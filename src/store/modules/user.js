import { defineStore } from "pinia";
import { otherAvatar } from "@/utils/avatar";

export const useUserStore = defineStore("toolUser", {
  state: () => {
    return {
      selectedOther: "",
      userList: [],
      activeUserId: "",
    };
  },
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
    setUserAvatar(userId, avatar) {
      // 限制 base64 长度，防止超出 localStorage
      if (avatar && avatar.length > 100 * 1024) { // 约100KB
        // 可以用 toast 或 alert 提示
        alert("图片过大，无法作为头像保存！");
        return;
      }
      const user = this.userList.find(u => u.id === userId);
      if (user) user.avatar = avatar;
    }
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

import { defineStore } from "pinia";
import { otherAvatar } from "@/utils/avatar";

export const useUserStore = defineStore("toolUser", {
  state: () => {
    return {
      activeRole: "own",
      selectedOther: "",
      userList: [],
      activeOther: "",
    };
  },
  actions: {
    addUser() {
      this.userList.push({
        nickname: "微信用户",
        avatar: otherAvatar,
        role: "other",
        id: "user-" + Date.now(),
      })
    },
    selectUser(id) {
      this.activeOther = id;
    },
    deleteUser(id) {
      if (this.activeOther === id) {
        this.activeOther = this.userList[1]['id'];
      }
      this.userList = this.userList.filter(user => user.id != id);
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

import { defineStore } from "pinia";

export const useUserStore = defineStore("toolUser", {
  state: () => {
    return {
      activeRole: "own",
      selectedOther: "",
      userList: [
        {
          name: "你自己",
          avatar: "http://img.adoutu.com/article/1606320519924.jpg",
        },
        {
          name: "小甜甜",
          avatar: "http://img.adoutu.com/article/1606320520101.jpg",
        }
      ],
    };
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

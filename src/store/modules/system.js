import { defineStore } from "pinia";
import dayjs from 'dayjs';

export const useSystemStore = defineStore("toolSystem", {
  state: () => {
    return {
      activeMenu: "chat", // 当前聚焦的工具栏目
      appearance: {
        model: "apple",
        darkMode: false,
        networkType: "wifi",
        wifiSignal: "3",
        phoneSignal: "4",
        phoneTime: dayjs('12:21', 'HH:mm'),
        isCharging: true,
        phoneBattery: 60,
        earphoneMode: true,
        unreadMessages: 1,
        chatTitle: "小甜甜",
        voiceMode: false,
        chatBackground: "",
      },
      hadDisclaimer: false, // 已经确认过声明
      qqGroupLink: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=FBr4JIxIckrUqgDK-rbdMkoQYfJT4BCs&authKey=Dl1dUP8%2BXRNefHTYG38DyEi3CAOf20Pc8yyIJwKQ7HlP5WX7nYhURs2vVtmttNHX&noverify=0&group_code=887911914", // 跳转加群链接
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

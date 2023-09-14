import { defineStore } from "pinia";
import _ from "lodash";
const appearance = {
  model: "ios",
  darkMode: false,
  networkType: "wifi",
  wifiSignal: "3",
  phoneSignal: "4",
  phoneTimeHour: "12",
  phoneTimeMinute: "21",
  timeFollowSystem: false,
  isCharging: false,
  phoneBattery: 60,
  earphoneMode: true,
  unreadMessages: 1,
  voiceMode: false,
  syncInputText: true,
  chatBackground: "",
}

export const useSystemStore = defineStore("toolSystem", {
  state: () => {
    return {
      activeMenu: "appearance", // 当前聚焦的工具栏目
      appearance: _.cloneDeep(appearance),
      phoneWidth: 1125,
      phoneHeight: 2436,
      phoneScale: 1,
      hadDisclaimer: false, // 已经确认过声明
      qqGroupLink: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=FBr4JIxIckrUqgDK-rbdMkoQYfJT4BCs&authKey=Dl1dUP8%2BXRNefHTYG38DyEi3CAOf20Pc8yyIJwKQ7HlP5WX7nYhURs2vVtmttNHX&noverify=0&group_code=887911914", // 跳转加群链接
    };
  },
  actions: {
    resetAppearance() {
      this.appearance = _.cloneDeep(appearance)
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

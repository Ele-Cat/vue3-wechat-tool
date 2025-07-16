import { defineStore } from "pinia";

export const useContextMenuStore = defineStore("toolContextMenu", {
  state: () => ({
    menuVisible: false, // 是否显示右键菜单
    menuLeft: 0, // 菜单位置横坐标
    menuTop: 0, // 菜单位置纵坐标
    activeChatId: "",
  }),
  actions: {
    // 显示右键菜单
    showContextMenu(clientX, clientY, chatId) {
      this.activeChatId = chatId;
      this.menuLeft = clientX;
      this.menuTop = clientY;
      this.menuVisible = true;
    },
    // 隐藏右键菜单
    hideContextMenu() {
      this.menuVisible = false;
    },
  },
});

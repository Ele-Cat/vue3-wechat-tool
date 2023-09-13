<template>
  <div class="custom-menu" v-show="useContextMenuStore.menuVisible"
    :style="{ top: useContextMenuStore.menuTop + 'px', left: useContextMenuStore.menuLeft + 'px' }">
    <ul>
      <li v-for="contextMenu in contextMenuList" :key="contextMenu.type" :class="{ 'border-top': contextMenu.borderTop }"
        @click.stop="handleMenuClick(contextMenu.value)">{{ contextMenu.label }}</li>
    </ul>
  </div>
  <!-- <DragModal /> -->
</template>

<script setup>
import { ref, watch } from 'vue';
import useStore from '@/store';
const { useContextMenuStore, useChatStore } = useStore();
import { toast } from "@/utils/feedback";

// 点击菜单条目
const handleMenuClick = (type) => {
  const activeChatId = useContextMenuStore.activeChatId
  const activeChatInfo = useChatStore.chatList.find(chat => chat.id === activeChatId);
  const activeChatIndex = useChatStore.chatList.findIndex(chat => chat.id === activeChatId);
  if (type === "moveUp") {
    if (activeChatIndex === 0) {
      toast({
        type: "warning",
        content: "已是第一条！",
      });
    } else {
      const item = useChatStore.chatList.splice(activeChatIndex, 1);
      useChatStore.chatList.splice(activeChatIndex - 1, 0, item[0]);
    }
  } else if (type === "moveDown") {
    if (activeChatIndex === useChatStore.chatList.length - 1) {
      toast({
        type: "warning",
        content: "已是第后一条！",
      });
    } else {
      const item = useChatStore.chatList.splice(activeChatIndex, 1);
      useChatStore.chatList.splice(activeChatIndex + 1, 0, item[0]);
    }
  } else if (type === "receive") {
    useChatStore.sentChat(Object.assign({}, {
      type: "receive",
      role: activeChatInfo.role === "own" ? "other" : "own",
      money: activeChatInfo.money,
      receivedChatId: activeChatId,
      receivedChatType: activeChatInfo["type"]
    }));
    useChatStore.receiveChat(activeChatId);
  } else if (type === "delete") {
    useChatStore.chatList.splice(activeChatIndex, 1);
  }
  useContextMenuStore.activeChatId = "";
  useContextMenuStore.menuVisible = false;
}

// 根据点击的对象展示对应的菜单列表
const contextMenuList = ref([])

watch(() => useContextMenuStore.activeChatId, (newVal) => {
  if (newVal) {
    const chatInfo = useChatStore.chatList.find(chat => chat.id === useContextMenuStore.activeChatId);
    if (["transferAccounts", "redEnvelope"].includes(chatInfo.type) && !chatInfo.received) {
      contextMenuList.value = [
        {
          label: "上移",
          value: "moveUp",
        },
        {
          label: "下移",
          value: "moveDown",
        },
        {
          label: "领取",
          value: "receive",
        },
        {
          label: "移除",
          value: "delete",
          borderTop: true,
        }
      ]
    } else {
      contextMenuList.value = [
        {
          label: "上移",
          value: "moveUp",
        },
        {
          label: "下移",
          value: "moveDown",
        },
        {
          label: "移除",
          value: "delete",
          borderTop: true,
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.custom-menu {
  position: fixed;
  top: 0;
  left: 0;
  // width: 144px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 99;

  >ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 12px;
    color: #000000;
    border: 1px solid #C4C4C4;

    li {
      height: 28px;
      line-height: 28px;
      padding: 0 20px;

      &:hover {
        background-color: #E2E2E2;
      }
    }

    .border-top {
      border-top: 1px solid #EDEDED;
    }
  }

  &.show {
    display: block;
  }
}
</style>
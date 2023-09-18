<template>
  <div class="custom-menu" v-show="useContextMenuStore.menuVisible"
    :style="{ top: useContextMenuStore.menuTop + 'px', left: useContextMenuStore.menuLeft + 'px' }">
    <ul>
      <li v-for="contextMenu in contextMenuList" :key="contextMenu.type" :class="{ 'border-top': contextMenu.borderTop, 'red': contextMenu.value === 'delete' }"
        @click.stop="handleMenuClick(contextMenu.value)">{{ contextMenu.label }}</li>
    </ul>
  </div>
  <a-modal title="对话修改" :width="466" v-model:open="editorModalVisible" :footer="null">
    <GenerateForm :title="editorModalTitle" formType="edit" :chatInfo="chatInfo" @close="editorModalVisible = false" />
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import useStore from '@/store';
const { useContextMenuStore, useChatStore, useUserStore } = useStore();
import { toast } from "@/utils/feedback";
import GenerateForm from "./GenerateForm.vue";
import { addTypes } from "@/utils/enum";

const editorModalVisible = ref(false);
const editorModalTitle = ref("");
const chatInfo = ref({});
// 点击菜单条目
const handleMenuClick = (type) => {
  const activeChatId = useContextMenuStore.activeChatId
  const activeChatInfo = useChatStore.chatList.find(chat => chat.id === activeChatId);
  const activeChatIndex = useChatStore.chatList.findIndex(chat => chat.id === activeChatId);
  if (type === "moveUp") {
    if (activeChatIndex === 0) {
      toast({
        type: "warning",
        content: "已经是第一条！",
      });
    } else {
      const item = useChatStore.chatList.splice(activeChatIndex, 1);
      useChatStore.chatList.splice(activeChatIndex - 1, 0, item[0]);
    }
  } else if (type === "moveDown") {
    if (activeChatIndex === useChatStore.chatList.length - 1) {
      toast({
        type: "warning",
        content: "已经是最后一条！",
      });
    } else {
      const item = useChatStore.chatList.splice(activeChatIndex, 1);
      useChatStore.chatList.splice(activeChatIndex + 1, 0, item[0]);
    }
  } else if (type === "edit") {
    editorModalVisible.value = true;
    let sendRole = ""
    if (!["time"].includes(activeChatInfo.type)) {
      sendRole = activeChatInfo.role === 'own' ? '你自己：' : `${useUserStore.otherInfo.nickname}：`
    }
    editorModalTitle.value = sendRole + addTypes.find(item => item.value === activeChatInfo.type)['label'];
    activeChatInfo['editTime'] = Date.now();
    chatInfo.value = activeChatInfo;
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
          label: "修改",
          value: "edit",
        },
        {
          label: "领取",
          value: "receive",
          borderTop: true,
        },
        {
          label: "移除",
          value: "delete",
          borderTop: true,
        }
      ]
    } else if (["takeAPat", "revoke", "time"].includes(chatInfo.type)) {
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
          label: "修改",
          value: "edit",
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
      &.red {
        color: #ff4d4f;
      }

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
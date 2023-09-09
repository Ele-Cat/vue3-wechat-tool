<template>
  <div class="phone-body" ref="contentRef" @contextmenu.stop="handlePhoneBodyContextMenu">
    <div class="wechat-content">
      <div class="wechat-item" v-for="chat in useChatStore.chatList" :key="chat.id" :class="{'wechat-item-right': chat.role === 'own', 'active': useContextMenuStore.activeChat.id === chat.id}" @contextmenu.stop="e => rightClicked(e, chat)">
        <div class="wechat-item-avatar">
          <img :src="chat.role === 'own' ? ownAvatar : otherAvatar" alt="">
        </div>
        <div class="wechat-item-text" v-html="renderText(chat.content)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import useStore from "@/store";
const { useUserStore, useChatStore, useContextMenuStore } = useStore();
import useAutoScrollBottom from "@/hooks/useAutoScrollBottom"
import emojiBase64 from "@/utils/emojiBase64";

const ownAvatar = computed(() => {
  return useUserStore.userList.length ? useUserStore.userList[0]['avatar'] : '';
})
const otherAvatar = computed(() => {
  const user = useUserStore.userList.find(user => user.id === useUserStore.activeOther)
  return user ? user['avatar'] : '微信用户';
})

const handlePhoneBodyContextMenu = (e) => {
  e.preventDefault();
  useContextMenuStore.hideContextMenu();
  useContextMenuStore.activeChat = {};
}

const rightClicked = (e, chat) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientX, e.clientY, chat);
};

const contentRef = ref(null)
useAutoScrollBottom(contentRef)

const renderText = (text) => {
  const replacedText = text.replace(/\[.*?\]/g, (match) => {
    console.log('match: ', match);
    const emoticon = match.trim().replace('[', '').replace(']', '');
    if (emojiBase64.hasOwnProperty(emoticon)) {
      const imageUrl = emojiBase64[emoticon];
      return `<img class="emoji-img" style="width:68px;margin:0 4px;vertical-align:top;" src="data:image/png;base64,${imageUrl}" alt="${emoticon}">`;
    }
    return match;
  })
  
  return replacedText;
}
</script>

<style lang="less" scoped>
.phone-body {
  position: absolute;
  top: 264px;
  bottom: 269px;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: scroll;
  .wechat-content {
    .wechat-item {
      padding: 25px 36px;
      position: relative;
      display: flex;
      &:hover, &.active {
        background-color: rgba(0, 0, 0, .15);
      }
      .wechat-item-avatar {
        width: 123px;
        height: 123px;
        background: #f1f1f1;
        border-radius: 15px;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        background-position: center;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .wechat-item-text {
        background: #fff;
        padding: 28px 38px;
        font-size: 48px;
        border-radius: 15px;
        margin-right: 140px;
        word-break: break-all;
        margin-left: 160px;
        display: inline-block;
        position: relative;
        line-height: normal;
        min-height: 123px;
        .emoji-img {
          width: 24px !important;
          height: 24px !important;
        }
        &:after {
          content: '';
          background: #fff;
          width: 24px;
          height: 24px;
          border-bottom-left-radius: 4px;
          top: 50px;
          left: -12px;
          position: absolute;
          transform: rotate(45deg);
        }
      }
      &.wechat-item-right {
        justify-content: flex-end;
        .wechat-item-face {
          right: 0;
        }
        .wechat-item-text {
          background: #98e970;
          margin-left: 140px;
          margin-right: 160px;
          &:after {
            background: #98e970;
            left: auto;
            right: -10px;
            border-top-right-radius: 4px;
            border-bottom-left-radius: 0;
          }
        }
      }
    }
  }
}
</style>

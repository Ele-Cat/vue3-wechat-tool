<template>
  <div class="phone-body" ref="contentRef" @contextmenu.stop="handlePhoneBodyContextMenu">
    <div class="wechat-content">
      <div class="wechat-item" v-for="chat in useChatStore.chatList" :key="chat.id" :class="{'wechat-item-right': chat.role === 'own', 'active': useContextMenuStore.activeChat.id === chat.id}" @contextmenu.stop="e => rightClicked(e, chat)">
        <div class="wechat-item-avatar" v-if="!['time'].includes(chat.type)">
          <img :src="chat.role === 'own' ? useUserStore.ownInfo.avatar : useUserStore.otherInfo.avatar" alt="">
        </div>
        <div class="wechat-item-text" v-if="chat.type === 'text'" v-html="renderText(chat.content)"></div>
        <div class="wechat-item-text wechat-item-image" v-else-if="chat.type === 'image'">
          <img :src="chat.content" alt="">
        </div>
        <div class="wechat-item-text wechat-item-trans" v-else-if="chat.type === 'transferAccounts'">
          <div class="wechat-item-trans-content">
            <i></i> 
            <div>
              <span>¥{{ chat.money.toFixed(2) }}</span> 
              <span class="font" v-if="!chat.content">转账给{{ chat.role === 'own' ? useUserStore.otherInfo.nickname : "你" }}</span>
              <span class="font" v-else>{{ chat.content }}</span>
            </div>
          </div>
          <div class="wechat-item-trans-bottom">
            <span>微信转账</span>
          </div>
        </div>
        <div class="wechat-item-text wechat-item-trans" v-else-if="chat.type === 'redEnvelope'">
          <div class="wechat-item-trans-content wechat-item-redp-content">
            <i></i> 
            <div>
              <!-- <span>¥{{ chat.money.toFixed(2) }}</span>  -->
              <span>{{ chat.content || "恭喜发财，大吉大利" }}</span>
            </div>
          </div>
          <div class="wechat-item-trans-bottom">
            <span>微信红包</span>
          </div>
        </div>
        <div class="wechat-item-text wechat-item-voice" v-else-if="chat.type === 'radio'">
          <i></i> 
          <span>{{ chat.duration }}"</span>
          <div :style="{width: chat.duration * 5 + 'px'}"></div>
          <em v-if="!chat.readed"></em>
        </div>
        <div class="wechat-item-notice" v-else-if="chat.type === 'time'">
          <span>{{ chat.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useStore from "@/store";
const { useUserStore, useChatStore, useContextMenuStore } = useStore();
import useAutoScrollBottom from "@/hooks/useAutoScrollBottom"
import emojiBase64 from "@/utils/emojiBase64";

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

// 替换[emoji]为图片
const renderText = (text) => {
  const replacedText = text.replace(/\[.*?\]/g, (match) => {
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
::-webkit-scrollbar {
  display: none;
}
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
        &.wechat-item-image {
          border: 1px #d5d5d5 solid;
          padding: 0;
          background: none !important;
          overflow: hidden;
          img {
            max-width: 420px;
            max-height: 420px;
          }
          &:after {
            display: none;
          }
        }
        &.wechat-item-trans {
          background: #f79c46 !important;
          width: 700px;
          padding-top: 0;
          padding-bottom: 0;
          .wechat-item-trans-content {
            display: flex;
            height: 192px;
            align-items: center;
            position: relative;
            i {
              width: 120px;
              height: 120px;
              background: url(@/assets/images/content/wechat-trans-icon1.png) no-repeat;
            }
            div {
              flex: 1;
              display: flex;
              flex-direction: column;
              margin-left: 30px;
              overflow: hidden;
              span {
                font-size: 48px;
                color: #fff;
                margin-top: -9px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .font {
                font-size: 36px;
                color: #fff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .wechat-item-redp-content {
            i {
              width: 102px;
              margin-left: 9px;
              background: url(@/assets/images/content/wechat-trans-icon3.png) no-repeat;
            }
          }
          .wechat-item-trans-bottom {
            height: 71px;
            align-items: center;
            display: flex;
            span {
              font-size: 36px;
              color: #faecda;
            }
          }
          &:after {
            content: '';
            background: #f79c46 !important;
          }
        }
        &.wechat-item-voice {
          display: flex;
          align-items: center;
          span {
            font-size: 42px;
            padding-right: 20px;
          }
          i {
            width: 34px;
            height: 49px;
            background: url(@/assets/images/content/wechat-voice-icon1.png) no-repeat;
            margin-right: 30px;
            margin-left: 16px;
          }
          em {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #e75e58;
            position: absolute;
            right: -61px;
          }
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
          &.wechat-item-voice {
            flex-direction: row-reverse;
            span {
              padding-left: 20px;
              padding-right: 0;
            }
            i {
              background: url(@/assets/images/content/wechat-voice-icon2.png) no-repeat;
              margin-left: 30px;
              margin-right: 16px;
            }
            em {
              left: -61px;
            }
          }
        }
      }
      .wechat-item-notice {
        font-size: 36px;
        color: #a6a6a6;
        display: flex;
        justify-content: center;
        flex: 1;
      }
    }
  }
}
</style>

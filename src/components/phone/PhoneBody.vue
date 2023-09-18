<template>
  <div class="phone-body" :class="{'dark': appearance.darkMode}" ref="phoneBodyRef" @contextmenu.stop="handlePhoneBodyContextMenu">
    <div class="wechat-content">
      <div class="wechat-item" :id="chat.id" v-for="chat in useChatStore.chatList" :key="chat.id" :class="{'wechat-item-right': chat.role === 'own', 'wechat-item-rejected': chat.role === 'own' && chat.rejected, 'wechat-item-notice-box': !showAvatar(chat), 'active': useContextMenuStore.activeChatId === chat.id}" @contextmenu.stop="e => rightClicked(e, chat.id)">
        <div class="wechat-item-avatar" v-if="showAvatar(chat)">
          <img :src="chat.role === 'own' ? useUserStore.ownInfo.avatar : useUserStore.otherInfo.avatar" alt="">
        </div>
        <div class="wechat-item-text" v-if="chat.type === 'text'" v-html="renderText(chat.content, emojiBase64)"></div>
        <div class="wechat-item-text wechat-item-image" v-else-if="chat.type === 'image'">
          <img :src="chat.content" alt="">
        </div>
        <div class="wechat-item-text wechat-item-trans" :class="{'wechat-item-trans-received': chat.received}" v-else-if="chat.type === 'transferAccounts'">
          <div class="wechat-item-trans-content">
            <i></i> 
            <div>
              <span>¥{{ chat.money.toFixed(2) }}</span> 
              <span class="font" v-if="chat.received">已被领取</span>
              <span class="font" v-else-if="!chat.content">转账给{{ chat.role === 'own' ? useUserStore.otherInfo.nickname : "你" }}</span>
              <span class="font" v-else>{{ chat.content }}</span>
            </div>
          </div>
          <div class="wechat-item-trans-bottom">
            <span>微信转账</span>
          </div>
        </div>
        <div class="wechat-item-text wechat-item-trans" :class="{'wechat-item-trans-received': chat.received}" v-else-if="chat.type === 'redEnvelope'">
          <div class="wechat-item-trans-content wechat-item-redp-content">
            <i></i> 
            <div>
              <!-- <span>¥{{ chat.money.toFixed(2) }}</span>  -->
              <span>{{ chat.content || "恭喜发财，大吉大利" }}</span>
              <span class="font" v-if="chat.received">已领取</span>
            </div>
          </div>
          <div class="wechat-item-trans-bottom">
            <span>微信红包</span>
          </div>
        </div>
        <div class="wechat-item-notice" v-else-if="chat.type === 'receive' && chat.receivedChatType === 'redEnvelope'">
          <i></i>{{ chat.role === 'own' ? "你" : useUserStore.otherInfo.nickname }}领取了{{ chat.role === 'own' ? useUserStore.otherInfo.nickname : "你" }}的<em>红包</em>
        </div>
        <div class="wechat-item-text wechat-item-trans wechat-item-trans-received" v-else-if="chat.type === 'receive' && chat.receivedChatType === 'transferAccounts'">
          <div class="wechat-item-trans-content">
            <i></i> 
            <div>
              <span>¥{{ chat.money.toFixed(2) }}</span> 
              <span class="font">已收款</span>
            </div>
          </div>
          <div class="wechat-item-trans-bottom">
            <span>微信转账</span>
          </div>
        </div>
        <!-- <div class="wechat-item-text wechat-item-voice" v-else-if="chat.type === 'voice'">
          <i></i> 
          <span>{{ chat.duration }}"</span>
          <div :style="{width: chat.duration * 5 + 'px'}"></div>
          <em v-if="!chat.received"></em>
        </div> -->
        <div class="wechat-item-voice-wrapper" v-else-if="chat.type === 'voice'">
          <div class="wechat-item-text wechat-item-voice">
            <i></i> 
            <span>{{ chat.duration }}"</span>
            <div :style="{width: chat.duration * 5 + 'px'}"></div>
            <em v-if="!chat.received"></em>
          </div>
          <div class="wechat-item-text wechat-item-voice-text" v-if="chat.content">{{ chat.content }}</div>
        </div>
        <div class="wechat-item-text wechat-item-av" v-else-if="chat.type === 'avInvite'">
          <i :class="[chat.invateType]"></i>
          <span v-if="chat.state === 'success'">通话时长 {{ chat.duration }}</span>
          <span v-else>{{ chat.role === "other" ? "对方" : "" }}{{ filterLabel(avInviteStates, chat.state) }}</span>
        </div>
        <div class="wechat-item-notice bg" :class="{'bold': chat.type === 'takeAPat' && chat.patBold}" v-else-if="['time', 'takeAPat', 'revoke'].includes(chat.type)">
          <span v-if="chat.type !== 'revoke'">{{ chat.content }}</span>
          <span v-else>{{ chat.role === 'own' ? "你" : useUserStore.otherInfo.nickname }}撤回了一条消息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useStore from "@/store";
const { useUserStore, useChatStore, useContextMenuStore } = useStore();
import useAutoScrollBottom from "@/hooks/useAutoScrollBottom";
import { renderText, filterLabel } from "@/utils/utils";
import { avInviteStates } from "@/utils/enum";

const props = defineProps({
  appearance: {
    type: Object,
    default: () => {},
  },
  emojiBase64: {
    type: Object,
    default: () => {},
  },
})

const handlePhoneBodyContextMenu = (e) => {
  e.preventDefault();
  useContextMenuStore.hideContextMenu();
  useContextMenuStore.activeChatId = "";
}

const rightClicked = (e, chatId) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientX, e.clientY, chatId);
};

const phoneBodyRef = ref(null)
useAutoScrollBottom(phoneBodyRef)

watch(() => useContextMenuStore.activeChatId, (newVal) => {
  if (newVal) {
    const targetElement = document.getElementById(newVal);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // start center end nearest
      });
    }
  }
})

const showAvatar = (chat) => {
  return !['time', 'takeAPat', 'revoke'].includes(chat.type) && !(chat.type === 'receive' && chat.receivedChatType === 'redEnvelope') 
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
      .wechat-item-voice-wrapper {
        display: flex;
        flex-direction: column;
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
          img {
            max-width: 420px;
            max-height: 420px;
            border-radius: 15px;
            overflow: hidden;
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
                margin-top: -5px;
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
                margin-top: 4px;
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
        &.wechat-item-trans-received {
          background: #f8e2c6 !important;
          .wechat-item-trans-content {
            i {
              background: url(@/assets/images/content/wechat-trans-icon2.png) no-repeat;
            }
          }
          .wechat-item-redp-content {
            i {
              background: url(@/assets/images/content/wechat-trans-icon4.png) no-repeat;
            }
          }
          .wechat-item-trans-bottom {
            span {
              color: #FFFFFF;
            }
          }
          &:after {
            background: #f8e2c6 !important;
          }
        }
        &.wechat-item-voice {
          display: flex;
          align-items: center;
          max-width: fit-content;
          span {
            font-size: 42px;
            padding-right: 20px;
            width: 120px;
          }
          i {
            width: 34px;
            height: 49px;
            background: url(@/assets/images/content/wechat-voice-icon1-light.png) no-repeat;
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
        &.wechat-item-voice-text {
          text-align: justify;
          margin-top: 20px;
          &:after {
            display: none;
          }
        }
        &.wechat-item-av {
          display: flex;
          align-items: center;
          span {
            margin: 0 12px;
          }
          i {
            display: block;
            position: relative;
            top: 2px;
            width: 64px;
            height: 28px;
            background-image: url(@/assets/images/content/wechat-audio-light.png);
            background-repeat: no-repeat;
            background-size: 100%;
            margin: 0px 18px 0 4px;
            &.video {
              width: 64px;
              height: 38px;
              background-image: url(@/assets/images/content/wechat-video-light.png);
            }
          }
        }
      }
      &.wechat-item-right {
        justify-content: flex-end;
        .wechat-item-face {
          right: 0;
        }
        .wechat-item-voice-wrapper {
          align-items: end;
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
              background: url(@/assets/images/content/wechat-voice-icon2-light.png) no-repeat;
              margin-left: 30px;
              margin-right: 16px;
            }
            em {
              left: -61px;
            }
          }
          &.wechat-item-voice-text {
            color: var(--dark-text-color) !important;
          }
          &.wechat-item-av {
            flex-direction: row-reverse;
            i {
              margin: 0px 4px 0 18px;
              &.video {
                background-image: url(@/assets/images/content/wechat-video-light.png);
              }
            }
          }
        }
      }
      &.wechat-item-notice-box {
        padding: 12px 38px;
        justify-content: center;
        .wechat-item-notice {
          font-size: 36px;
          color: #a6a6a6;
          justify-content: center;
          padding: 12px 16px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          &.bg {
            color: var(--light-text-color);
            background-color: rgba(255, 255, 255, 0.6);
          }
          &.bold {
            span {
              font-weight: bold;
            }
          }
          i {
            width: 45px;
            height: 51px;
            background: url(@/assets/images/content/wechat-redp-icon1.png) no-repeat;
            margin-right: 18px;
            margin-top: -5px;
          }
          em {
            font-style: normal;
            color: #ef9d49;
          }
        }
      }
      &.wechat-item-rejected {
        .wechat-item-text:not(.wechat-item-voice-text) {
          position: relative;
          &:before {
            content: "!";
            position: absolute;
            width: 64px;
            text-align: center;
            height: 64px;
            line-height: 64px;
            left: -91px;
            top: 50%;
            margin-top: -32px;
            font-size: 42px;
            color: var(--dark-text-color);
            border-radius: 50%;
            background-color: #FA5151;
          }
          &.wechat-item-voice {
            em {
              display: none;
            }
          }
        }
      }
    }
  }
  &.dark {
    .wechat-content {
      .wechat-item {
        &:hover, &.active {
          background-color: rgba(255, 255, 255, .15);
        }
        .wechat-item-text {
          background: #2b2b2b;
          color: #d5d5d5;
          &:after {
            content: '';
            background: #2b2b2b;
          }
          &.wechat-item-voice {
            i {
              background: url(@/assets/images/content/wechat-voice-icon1-dark.png) no-repeat;
            }
          }
          &.wechat-item-av {
            i {
              background-image: url(@/assets/images/content/wechat-audio-dark.png);
              &.video {
                background-image: url(@/assets/images/content/wechat-video-dark.png);
              }
            }
          }
        }
        &.wechat-item-right {
          .wechat-item-text {
            background: #3eb575;
            color: #000;
            &:after {
              background: #3eb575;
            }
            &.wechat-item-voice {
              i {
                background: url(@/assets/images/content/wechat-voice-icon2-light.png) no-repeat;
              }
            }
            &.wechat-item-av {
              i {
                background-image: url(@/assets/images/content/wechat-audio-light.png);
                &.video {
                  background-image: url(@/assets/images/content/wechat-video-light.png);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="phone-bottom" :class="{'dark': appearance.darkMode}">
    <div class="phone-bottom-chat">
      <div class="wechat-bottom-icon" :class="[appearance.voiceMode ? 'wechat-voice-say-icon' : 'wechat-voice-icon']">
        语音
      </div>
      <div class="wechat-input" :class="{'wechat-input-say': appearance.voiceMode, 'wechat-input-sync': !appearance.voiceMode && appearance.syncInputText}" v-html="wechatInput"></div>
      <div class="wechat-bottom-icon wechat-emoji-icon">表情</div>
      <div class="wechat-bottom-icon" :class="[!appearance.voiceMode && appearance.syncInputText && useChatStore.inputText && useUserStore.activeRole === 'own' ? 'wechat-bottom-sync': 'wechat-more-icon']">发送</div>
    </div>
    <div class="phone-bottom-bar"><i>返回桌面</i></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import useStore from "@/store";
const { useChatStore, useUserStore } = useStore();
import { renderText } from "@/utils/utils";

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

const wechatInput = ref("")
watch(() => [props.appearance.voiceMode, useChatStore.inputText, useUserStore.activeRole], () => {
  if (props.appearance.voiceMode) {
    wechatInput.value = "按住 说话"
  } else if (useUserStore.activeRole === "other") {
    wechatInput.value = ""
  } else {
    wechatInput.value = renderText(useChatStore.inputText, props.emojiBase64)
  }
}, {
  immediate: true,
})
</script>

<style lang="less" scoped>
.phone-bottom {
  background: #f6f6f6;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 269px;
  .phone-bottom-chat {
    height: 167px;
    display: flex;
    align-items: center;
    color: var(--light-text-color);
    .wechat-bottom-icon {
      width: 80px;
      height: 80px;
      text-indent: -9999px;
      &.wechat-voice-say-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon4-light.png)
          no-repeat;
        margin-left: 32px;
      }
      &.wechat-voice-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon1-light.png)
          no-repeat;
        margin-left: 32px;
      }
      &.wechat-emoji-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon2-light.png)
          no-repeat;
      }
      &.wechat-more-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon3-light.png)
          no-repeat;
        margin: 0 32px 0 39px;
      }
      &.wechat-bottom-sync {
        text-indent: 0;
        font-size: 48px;
        text-align: center;
        height: 88px;
        line-height: 88px;
        width: 160px;
        margin: 0 24px;
        border-radius: 16px;
        background-color: #05C160;
        color: #FFF;
      }
    }
    .wechat-input {
      height: 120px;
      background: #fff;
      border-radius: 15px;
      flex: 1;
      text-indent: -9999px;
      margin: 0 32px;
    }
    .wechat-input-say {
      font-size: 48px;
      text-indent: 0;
      text-align: center;
      line-height: 120px;
      font-weight: 500;
    }
    .wechat-input-sync {
      display: flex;
      align-items: center;
      font-size: 48px;
      text-indent: 0;
      padding: 0 0.6em;
      line-height: 120px;
      font-weight: 500;
      overflow: hidden;
    }
  }
  .phone-bottom-bar {
    height: 102px;
    display: flex;
    justify-content: center;
    i {
      width: 402px;
      height: 15px;
      background: url(@/assets/images/bottom/phone-bottom-bar-light.png) no-repeat;
      margin-top: 63px;
      text-indent: -9999px;
    }
  }
  &.dark {
    background: var(--dark-bg-color);
    .phone-bottom-chat {
      color: var(--dark-text-color);
      .wechat-bottom-icon {
        &.wechat-voice-say-icon {
          background: url(@/assets/images/bottom/wechat-bottom-icon4-dark.png) no-repeat;
        }
        &.wechat-voice-icon {
          background: url(@/assets/images/bottom/wechat-bottom-icon1-dark.png) no-repeat;
        }
        &.wechat-emoji-icon {
          background: url(@/assets/images/bottom/wechat-bottom-icon2-dark.png) no-repeat;
        }
        &.wechat-more-icon {
          background: url(@/assets/images/bottom/wechat-bottom-icon3-dark.png) no-repeat;
        }
      }
      .wechat-input {
        background: #2b2b2b;
      }
    }
    .phone-bottom-bar {
      i {
        background: url(@/assets/images/bottom/phone-bottom-bar-dark.png) no-repeat;
      }
    }
  }
}
</style>

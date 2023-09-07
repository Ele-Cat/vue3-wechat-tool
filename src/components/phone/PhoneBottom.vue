<template>
  <div class="phone-bottom">
    <div class="phone-bottom-chat">
      <div class="wechat-bottom-icon" :class="[appearance.voiceMode ? 'wechat-voice-say-icon' : 'wechat-voice-icon']">
        语音
      </div>
      <div class="wechat-input" :class="{'wechat-input-say': appearance.voiceMode}">按住 说话</div>
      <div class="wechat-bottom-icon wechat-emoji-icon">表情</div>
      <div class="wechat-bottom-icon wechat-more-icon">更多功能</div>
    </div>
    <div class="phone-bottom-bar"><i>返回桌面</i></div>
  </div>
</template>

<script setup>
const props = defineProps({
  appearance: {
    type: Object,
    default: () => {},
  }
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
    .wechat-bottom-icon {
      width: 80px;
      height: 80px;
      text-indent: -9999px;
      &.wechat-voice-say-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon4.png)
          no-repeat;
        margin-left: 32px;
      }
      &.wechat-voice-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon1.png)
          no-repeat;
        margin-left: 32px;
      }
      &.wechat-emoji-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon2.png)
          no-repeat;
      }
      &.wechat-more-icon {
        background: url(@/assets/images/bottom/wechat-bottom-icon3.png)
          no-repeat;
        margin: 0 32px 0 39px;
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
      color: #1a1a1a;
      font-size: 48px;
      text-indent: 0;
      text-align: center;
      line-height: 120px;
      font-weight: 500;
    }
  }
  .phone-bottom-bar {
    height: 102px;
    display: flex;
    justify-content: center;
    i {
      width: 402px;
      height: 15px;
      background: url(@/assets/images/bottom/phone-bottom-bar.png) no-repeat;
      margin-top: 63px;
      text-indent: -9999px;
    }
  }
}
</style>

<template>
  <div class="phone-bar" :class="{dark: appearance.darkMode}">
    <div class="phone-time">{{ appearance.phoneTimeHour }}:{{ appearance.phoneTimeMinute }}</div>
    <div class="phone-sigle" :class="['phone-sigle-v' + appearance.phoneSignal]">信号</div>
    <div class="phone-wifi" :class="['phone-wifi-s' + appearance.wifiSignal]" v-if="appearance.networkType === 'wifi'">wifi</div>
    <div class="phone-no-wifi" v-else>{{appearance.networkType}}G</div>
    <div class="phone-battery" :class="{'phone-battery-charge': appearance.isCharging}">
      <span class="battery-box"> <span class="battery-width" :style="{width: appearance.phoneBattery + '%'}">电量</span> <i></i> </span>
    </div>
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
.phone-bar {
  height: 132px;
  display: flex;
  align-items: center;
  padding: 0 43px 0 95px;
  position: relative;
  z-index: 99999;
  background-color: #ededed;
  // &.dark {
  //   background-color: #111111;
  // }

  .phone-time {
    font-size: 45px;
    flex: 1;
    font-weight: 600;
  }
  .phone-sigle {
    width: 54px;
    height: 36px;
    background: url(@/assets/images/status/ios-single-4-dark.png) no-repeat;
    margin-right: 6px;
    text-indent: -9999px;
    &.phone-sigle-v1 {
      background-image: url(@/assets/images/status/ios-single-1-dark.png);
    }
    &.phone-sigle-v2 {
      background-image: url(@/assets/images/status/ios-single-2-dark.png);
    }
    &.phone-sigle-v3 {
      background-image: url(@/assets/images/status/ios-single-3-dark.png);
    }
  }
  .phone-wifi {
    width: 63px;
    height: 45px;
    background: url(@/assets/images/status/ios-wifi-3-dark.png) no-repeat;
    margin-right: 6px;
    text-indent: -9999px;
    &.phone-wifi-s1 {
      background-image: url(@/assets/images/status/ios-wifi-1-dark.png);
    }
    &.phone-wifi-s2 {
      background-image: url(@/assets/images/status/ios-wifi-2-dark.png);
    }
  }
  .phone-no-wifi {
    text-indent: 0;
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    width: 63px;
    height: auto;
    margin-right: 6px;
  }
  .phone-battery {
    width: 75px;
    height: 36px;
    background: url(@/assets/images/status/ios-battery-dark.png) no-repeat;
    position: relative;
    padding: 7px;
    padding-right: 16px;
    .battery-box {
      position: absolute;
      left: 7px;
      right: 16px;
      .battery-width {
        height: 22px;
        background: #000;
        width: 50%;
        display: block;
        border-radius: 4px;
        text-indent: -9999px;
      }
    }
    &.phone-battery-charge {
      font {
        background: #65c466;
      }
      i {
        width: 18px;
        height: 36px;
        background: url(@/assets/images/status/ios-battery-charge-dark.png) no-repeat;
        position: absolute;
        left: 50%;
        margin-left: -9px;
        top: 50%;
        margin-top: -18px;
      }
    }
  }
}
</style>

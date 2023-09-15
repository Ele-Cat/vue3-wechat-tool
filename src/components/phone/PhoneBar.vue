<template>
  <div class="phone-bar" :class="{dark: appearance.darkMode}">
    <div class="phone-time">{{ appearance.phoneTimeHour }}:{{ appearance.phoneTimeMinute }}</div>
    <div class="phone-sigle" :class="[`phone-sigle-v${appearance.phoneSignal}-${appearance.darkMode ? 'dark' : 'light'}`]">信号</div>
    <div class="phone-wifi" :class="[`phone-wifi-v${appearance.wifiSignal}-${appearance.darkMode ? 'dark' : 'light'}`]" v-if="appearance.networkType === 'wifi'">wifi</div>
    <div class="phone-no-wifi" v-else>{{appearance.networkType}}G</div>
    <div class="phone-battery" :class="{'phone-battery-charge': appearance.isCharging, 'dark': appearance.darkMode}">
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
  .phone-time {
    font-size: 45px;
    flex: 1;
    font-weight: 600;
  }
  .phone-sigle {
    width: 54px;
    height: 36px;
    background-repeat: no-repeat;
    margin-right: 6px;
    text-indent: -9999px;
    &.phone-sigle-v1-light {
      background-image: url(@/assets/images/bar/ios-single-1-light.png);
    }
    &.phone-sigle-v2-light {
      background-image: url(@/assets/images/bar/ios-single-2-light.png);
    }
    &.phone-sigle-v3-light {
      background-image: url(@/assets/images/bar/ios-single-3-light.png);
    }
    &.phone-sigle-v4-light {
      background-image: url(@/assets/images/bar/ios-single-4-light.png);
    }
    &.phone-sigle-v1-dark {
      background-image: url(@/assets/images/bar/ios-single-1-dark.png);
    }
    &.phone-sigle-v2-dark {
      background-image: url(@/assets/images/bar/ios-single-2-dark.png);
    }
    &.phone-sigle-v3-dark {
      background-image: url(@/assets/images/bar/ios-single-3-dark.png);
    }
    &.phone-sigle-v4-dark {
      background-image: url(@/assets/images/bar/ios-single-4-dark.png);
    }
  }
  .phone-wifi {
    width: 63px;
    height: 45px;
    background-repeat: no-repeat;
    margin-right: 6px;
    text-indent: -9999px;
    &.phone-wifi-v1-light {
      background-image: url(@/assets/images/bar/ios-wifi-1-light.png);
    }
    &.phone-wifi-v2-light {
      background-image: url(@/assets/images/bar/ios-wifi-2-light.png);
    }
    &.phone-wifi-v3-light {
      background-image: url(@/assets/images/bar/ios-wifi-3-light.png);
    }
    &.phone-wifi-v1-dark {
      background-image: url(@/assets/images/bar/ios-wifi-1-dark.png);
    }
    &.phone-wifi-v2-dark {
      background-image: url(@/assets/images/bar/ios-wifi-2-dark.png);
    }
    &.phone-wifi-v3-dark {
      background-image: url(@/assets/images/bar/ios-wifi-3-dark.png);
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
    background-image: url(@/assets/images/bar/ios-battery-light.png);
    background-repeat: no-repeat;
    position: relative;
    padding: 7px;
    padding-right: 16px;
    .battery-box {
      position: absolute;
      left: 5px;
      right: 15px;
      .battery-width {
        height: 22px;
        background: #000;
        width: 50%;
        display: block;
        border-radius: 4px;
        text-indent: -9999px;
      }
    }
    &.dark {
      background: url(@/assets/images/bar/ios-battery-dark.png);
      .battery-width {
        background: var(--dark-text-color);
      }
      &.phone-battery-charge {
        i {
          background: url(@/assets/images/bar/ios-battery-charge-dark.png) no-repeat;
        }
      }
    }
    &.phone-battery-charge {
      .battery-width {
        background: #65c466;
      }
      i {
        width: 18px;
        height: 36px;
        background: url(@/assets/images/bar/ios-battery-charge-light.png) no-repeat;
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

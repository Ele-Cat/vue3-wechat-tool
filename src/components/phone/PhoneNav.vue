<template>
  <div class="phone-nav" :class="{'dark': appearance.darkMode}">
    <div class="phone-nav-left">
      <div class="phone-nav-back">返回</div>
      <span v-if="appearance.unreadMessages">{{appearance.unreadMessages > 99 ? '99+' : appearance.unreadMessages}}</span>
    </div>
    <div class="phone-nav-center">
      <span class="center-span"> <span class="user-name">{{chatTitle}}</span> <i class="do-not-disturb" v-if="appearance.doNotDisturb"></i><i class="ear-phone-mode" v-if="appearance.earphoneMode"></i> </span>
    </div>
    <div class="phone-nav-right">
      <div class="phone-nav-more">更多</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useStore from "@/store";
const { useSystemStore } = useStore();
import { truncateMiddle } from "@/utils/utils"

const props = defineProps({
  appearance: {
    type: Object,
    default: () => {},
  }
})

const chatTitle = computed(() => {
  return truncateMiddle(useSystemStore.appearance.chatTitle, 14)
})
</script>

<style lang="less" scoped>
.phone-nav {
  height: 132px;
  position: relative;
  z-index: 99999;
  display: flex;
  align-items: center;
  padding: 0 50px;
  .phone-nav-left {
    width: 150px;
    position: relative;

    .phone-nav-back {
      width: 27px;
      height: 52px;
      background: url(@/assets/images/nav/wechat-nav-back-light.png) no-repeat;
      text-indent: -9999px;
    }

    span {
      position: absolute;
      font-size: 36px;
      height: 72px;
      line-height: 72px;
      background: #d5d5d5;
      min-width: 72px;
      border-radius: 36px;
      text-align: center;
      padding: 0 24px;
      top: 50%;
      margin-top: -36px;
      left: 45px;
      font-weight: 600;
    }
  }

  .phone-nav-center {
    flex: 1;
    display: flex;
    justify-content: center;
    .center-span {
      font-size: 51px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      .user-name {
        // max-width: 600px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      i {
        width: 31px;
        height: 42px;
        margin: 8px 0 0 15px;
        &.do-not-disturb {
          width: 40px;
          height: 44px;
          background: url(@/assets/images/nav/wechat-trans-do-not-disturb-light.png) no-repeat;
          background-size: 100% 100%;
        }
        &.ear-phone-mode {
          background: url(@/assets/images/nav/wechat-trans-earphone-light.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .phone-nav-right {
    width: 150px;
    display: flex;
    justify-content: flex-end;
    .phone-nav-more {
      width: 70px;
      height: 12px;
      background: url(@/assets/images/nav/wechat-nav-right-light.png) no-repeat;
      text-indent: -9999px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.67px;
    background: #d5d5d5;
    overflow: hidden;
    left: 0;
    bottom: 2px;
  }

  &.dark {
    .phone-nav-back {
      background: url(@/assets/images/nav/wechat-nav-back-dark.png) no-repeat;
    }
    .phone-nav-center {
      .center-span {
        i {
          &.do-not-disturb {
            background: url(@/assets/images/nav/wechat-trans-do-not-disturb-dark.png) no-repeat;
            background-size: 100% 100%;
          }
          &.ear-phone-mode {
            background: url(@/assets/images/nav/wechat-trans-earphone-dark.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .phone-nav-right {
      .phone-nav-more {
        background: url(@/assets/images/nav/wechat-nav-right-dark.png) no-repeat;
      }
    }
  }
}
</style>

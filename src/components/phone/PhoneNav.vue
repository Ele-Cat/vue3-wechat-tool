<template>
  <div class="phone-nav">
    <div class="phone-nav-left">
      <div class="phone-nav-back">返回</div>
      <span v-if="appearance.unreadMessages">{{appearance.unreadMessages > 99 ? '99+' : appearance.unreadMessages}}</span>
    </div>
    <div class="phone-nav-center">
      <span> <font>{{activeUserName}}</font> <i v-if="appearance.earphoneMode"></i> </span>
    </div>
    <div class="phone-nav-right">
      <div class="phone-nav-more">更多</div>
    </div>
  </div>
</template>

<script setup>
import useStore from "@/store";
import { computed } from "vue";
const { useUserStore } = useStore();
const activeUserName = computed(() => {
  const user = useUserStore.userList.find(user => user.id === useUserStore.activeOther)
  return user ? user['nickname'] : '微信用户';
})

const props = defineProps({
  appearance: {
    type: Object,
    default: () => {},
  }
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
  background-color: #ededed;

  .phone-nav-left {
    width: 150px;
    position: relative;

    .phone-nav-back {
      width: 27px;
      height: 52px;
      background: url(@/assets/images/top/wechat-nav-back.png) no-repeat;
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
    span {
      font-size: 51px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font {
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        width: 31px;
        height: 42px;
        background: url(@/assets/images/top/wechat-trans-earphone.png) no-repeat;
        margin: 8px 0 0 15px;
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
      background: url(@/assets/images/top/wechat-nav-right.png) no-repeat;
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
}
</style>

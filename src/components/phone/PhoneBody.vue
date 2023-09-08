<template>
  <div class="phone-body">
    <div class="wechat-content">
      <div class="wechat-item wechat-item-right">
        <div class="wechat-item-avatar">
          <img :src="ownAvatar" alt="">
        </div>
        <div class="wechat-item-text">
          你是谁
        </div>
      </div>
      <div class="wechat-item">
        <div class="wechat-item-avatar">
          <img :src="otherAvatar" alt="">
        </div>
        <div class="wechat-item-text">
          我叫小甜甜
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useStore from "@/store";
const { useUserStore } = useStore();

const ownAvatar = computed(() => {
  return useUserStore.userList.length ? useUserStore.userList[0]['avatar'] : '';
})
const otherAvatar = computed(() => {
  const user = useUserStore.userList.find(user => user.id === useUserStore.activeOther)
  return user ? user['avatar'] : '微信用户';
})
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
    padding: 36px;
    .wechat-item {
      margin-bottom: 50px;
      position: relative;
      display: flex;
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

<template>
  <perfect-scrollbar>
    <div class="wt-content">
      <!-- <div class="wt-skeleton" v-if="useSystemStore.activeMenu === 'chat'">
        大纲
      </div> -->
      <div class="wt-preview">
        <div class="phone-wrap">
          <div class="phone-scale" :style="{transform: `scale(${phoneScale})`}">
            <div id="phone" class="phone" :style="{width: phoneWidth + 'px', height: phoneHeight + 'px'}">
              <div class="phone-bar">状态栏</div>
              <div class="phone-header">导航栏</div>
              <div class="phone-body">内容</div>
              <div class="phone-footer">底部操作</div>
            </div>
          </div>
        </div>
        <div class="wt-ctrl">
          <div class="wtc-button">生成图片</div>
          <div class="wtc-button">生成动图</div>
          <div class="wtc-button">生成视频</div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script setup>
import { ref, watch } from "vue";
import useStore from "@/store";
const { useSystemStore } = useStore();
import { models } from "@/utils/enum"

const phoneWidth = ref(1200)
const phoneHeight = ref(2700)
const phoneScale = ref(1)
watch(() => useSystemStore.appearance.model, (newVal) => {
  // ios:1125*2436
  // android:1224*2700
  // 做缩放是为了在预览时好看，同时在生成图片、视频时高清
  const { width, height } = models.find(model => model.value === newVal)
  phoneWidth.value = width
  phoneHeight.value = height
  phoneScale.value = (360 / width).toFixed(2)
}, {
  immediate: true,
})
</script>

<style lang="less" scoped>
.wt-content {
  display: flex;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
  .wt-skeleton {
    width: 40%;
    padding: 10px;
    background-color: #F1F1F1;
  }
  .wt-preview {
    position: relative;
    .phone-wrap {
      width: 360px;
      height: 100%;
      // background-color: #E0E0E0;
      .phone-scale {
        transform-origin: 0 0;
      }
      .phone {
        background-color: #EDEDED;
        position: relative;
        font-size: 36px;
        .phone-bar {
          height: 132px;
        }
        .phone-header {
          height: 132px;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: .67px;
            background: #d5d5d5;
            overflow: hidden;
            left: 0;
            bottom: 2px;
          }
        }
        .phone-body {
          position: absolute;
          top: 264px;
          bottom: 269px;
          left: 0;
          right: 0;
          -webkit-overflow-scrolling: touch;
          overflow-y: scroll;
        }
        .phone-footer {
          background: #f6f6f6;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 269px;
        }
      }
    }
    .wt-ctrl {
      position: absolute;
      top: 50%;
      right: -66px;
      width: 60px;
      transform: translate(0, -50%);
      .wtc-button {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 12px;
        background-image: linear-gradient( 135deg, #FFE985 10%, #FA742B 100%);
        background-image: linear-gradient( 135deg, #FFA8A8 10%, #FCFF00 100%);
        background-image: linear-gradient( 135deg, #3B2667 10%, #BC78EC 100%);
        background-image: linear-gradient( 135deg, #F6D242 10%, #FF52E5 100%);
        background-image: linear-gradient( 135deg, #FD6E6A 10%, #FFC600 100%);
        border-radius: 50%;
        margin-bottom: 12px;
        color: #FFFFFF;
      }
    }
  }
}
</style>
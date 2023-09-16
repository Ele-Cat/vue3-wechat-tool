<template>
  <perfect-scrollbar>
    <div class="wt-content">
      <div class="wt-preview">
        <div class="phone-wrap" :style="{height: wrapperHeight + 'px'}">
          <div class="phone-scale" :style="{ transform: `scale(${phoneScale})` }">
            <div id="phone" class="phone" :class="{'dark': useSystemStore.appearance.darkMode}" :style="{ width: phoneWidth + 'px', height: phoneHeight + 'px' }">
              <PhoneBar :appearance="appearance" />
              <PhoneNav :appearance="appearance" />
              <div class="phone-bg">
                <img :src="useSystemStore.appearance.chatBackground" v-if="useSystemStore.appearance.chatBackground" class="phone-bg-for-height" />
              </div>
              <PhoneBody :appearance="appearance" :emojiBase64="emojiBase64" />
              <PhoneBottom :appearance="appearance" :emojiBase64="emojiBase64" />
            </div>
          </div>
        </div>
        <PhoneTools />
        <PhoneGenerate />
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script setup>
import { ref, watch } from "vue";
import useStore from "@/store";
const { useSystemStore } = useStore();
import { models } from "@/utils/enum"
import PhoneBar from "./phone/PhoneBar.vue";
import PhoneNav from "./phone/PhoneNav.vue";
import PhoneBody from "./phone/PhoneBody.vue";
import PhoneBottom from "./phone/PhoneBottom.vue";
import PhoneGenerate from "./phone/PhoneGenerate.vue"
import PhoneTools from "./phone/PhoneTools.vue"
import emojiBase64 from "@/utils/emojiBase64";

const phoneWidth = ref(1125)
const phoneHeight = ref(2436)
const phoneScale = ref(1)
const appearance = ref({})
const wrapperHeight = ref(0)
watch(() => useSystemStore.appearance, (newVal) => {
  // ios:1125*2436
  // android:1224*2700
  // 做缩放是为了在预览时好看，同时在生成图片、视频时高清
  appearance.value = newVal
  const { width, height } = models.find(model => model.value === newVal.model)
  useSystemStore.phoneWidth = phoneWidth.value = width
  useSystemStore.phoneHeight = phoneHeight.value = height
  useSystemStore.phoneScale = phoneScale.value = (360 / width).toFixed(2)
  wrapperHeight.value = parseInt(height * phoneScale.value)
}, {
  immediate: true,
})
</script>

<style lang="less" scoped>
.wt-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
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
      .phone-scale {
        transform-origin: 0 0;
      }
      .phone {
        font-family: SF Pro, PingFang SC;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        background-color: var(--light-bg-color);
        position: relative;
        font-size: 36px;
        &.dark {
          background-color: var(--dark-bg-color);
          color: var(--dark-text-color);
        }
        .phone-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 264px;
          bottom: 270px;
          width: 100%;
          overflow: hidden;
          .phone-bg-for-height {
            width: 100%;
            max-width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}</style>
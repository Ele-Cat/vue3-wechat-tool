<template>
  <perfect-scrollbar>
    <div class="wt-content">
      <!-- <div class="wt-skeleton" v-if="useSystemStore.activeMenu === 'chat'">
        大纲
      </div> -->
      <div class="wt-preview">
        <div class="phone-wrap">
          <div class="phone-scale" :style="{ transform: `scale(${phoneScale})` }">
            <div id="phone" class="phone" :style="{ width: phoneWidth + 'px', height: phoneHeight + 'px' }">
              <PhoneBar :appearance="appearance" />
              <PhoneNav :appearance="appearance" />
              <div class="phone-bg">
                <img :src="useSystemStore.appearance.chatBackground" class="phone-bg-for-height" />
              </div>
              <PhoneBody />
              <PhoneBottom :appearance="appearance" />
            </div>
          </div>
        </div>
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

const phoneWidth = ref(1200)
const phoneHeight = ref(2700)
const phoneScale = ref(1)
const appearance = ref({})
watch(() => useSystemStore.appearance, (newVal) => {
  // ios:1125*2436
  // android:1224*2700
  // 做缩放是为了在预览时好看，同时在生成图片、视频时高清
  appearance.value = newVal
  const { width, height } = models.find(model => model.value === newVal.model)
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

        .phone-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: absolute;
          top: 0;
          width: 100%;
          overflow: hidden;
          .phone-bg-for-height {
            width: auto;
            max-width: none;
            height: 100%;
          }
        }
      }
    }
  }
}</style>
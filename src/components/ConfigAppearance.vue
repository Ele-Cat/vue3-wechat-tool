<template>
  <perfect-scrollbar>
    <a-form :model="formState" :label-col="{style: {width: '88px'}}" class="config-appearance">
      <a-form-item label="机型">
        <a-select :options="models" v-model:value="formState.model" disabled></a-select>
      </a-form-item>
      <a-form-item label="深色模式">
        <a-switch v-model:checked="formState.darkMode" />
      </a-form-item>
      <a-form-item label="网络类型">
        <a-select :options="networkTypes" v-model:value="formState.networkType"></a-select>
      </a-form-item>
      <a-form-item label="wifi信号" v-if="formState.networkType === 'wifi'">
        <a-select :options="wifiSignals" v-model:value="formState.wifiSignal"></a-select>
      </a-form-item>
      <a-form-item label="手机信号">
        <a-select :options="phoneSignals" v-model:value="formState.phoneSignal"></a-select>
      </a-form-item>
      <a-form-item label="手机时间">
        <div class="phone-time">
          <a-select :options="toArr(24)" v-model:value="formState.phoneTimeHour"></a-select>:
          <a-select :options="toArr(60)" v-model:value="formState.phoneTimeMinute"></a-select>
          <a-tooltip title="是否跟随当前设备时间" placement="right">
            <a-switch v-model:checked="formState.timeFollowSystem" />
          </a-tooltip>
        </div>
      </a-form-item>
      <a-form-item label="是否充电">
        <a-switch v-model:checked="formState.isCharging" />
      </a-form-item>
      <a-form-item label="手机电量">
        <a-row :gutter="12">
          <a-col :span="16">
            <a-slider v-model:value="formState.phoneBattery" :tip-formatter="value => `${value}%`" :min="0" :max="100" />
          </a-col>
          <a-col :span="8">
            <a-input-number v-model:value="formState.phoneBattery" :min="0" :max="100" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="听筒模式">
        <a-switch v-model:checked="formState.earphoneMode" />
      </a-form-item>
      <a-form-item label="未读消息数">
        <a-input-number v-model:value="formState.unreadMessages" :min="0" :max="10000" />
      </a-form-item>
      <a-form-item label="聊天标题">
        <a-input v-model:value="formState.chatTitle" />
      </a-form-item>
      <a-form-item label="显示用户名">
        <a-switch v-model:checked="formState.showChatName" />
      </a-form-item>
      <a-form-item label="语音模式">
        <a-switch v-model:checked="formState.voiceMode" />
      </a-form-item>
      <a-form-item label="聊天背景">
        <ImageEditor :imageInfo="imageInfo" :aspectRatio="aspectRatio" :allowClear="true" tip="只可上传小于1M的JPG或PNG图片" @use="handleUse"></ImageEditor>
      </a-form-item>
    </a-form>
  </perfect-scrollbar>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { LoadingOutlined, PlusOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
// import { useFetch } from '@vueuse/core'
import { models, networkTypes, wifiSignals, phoneSignals } from "@/utils/enum";
import { toArr } from "@/utils/utils";
import useStore from "@/store";
const { useSystemStore } = useStore();
import ImageEditor from "@/components/common/ImageEditor.vue";

let timer = null;
onUnmounted(() => {
  timer && clearInterval(timer);
})

const formState = ref({});

watch(() => useSystemStore.appearance.timeFollowSystem, (newVal) => {
  if (newVal) {
    timer = setInterval(() => {
      formState.value.phoneTimeHour = ('00' + dayjs().get('hour')).slice(-2)
      formState.value.phoneTimeMinute = ('00' + dayjs().get('minute')).slice(-2)
    }, 1000)
  } else {
    timer && clearInterval(timer);
  }
}, {
  immediate: true,
})
onMounted(() => {
  watch(() => useSystemStore.appearance, (newVal) => {
    formState.value = newVal
    imageInfo.url = newVal.chatBackground;
  }, {
    immediate: true,
    deep: true,
  })
})

const imageInfo = reactive({
  url: formState.value.chatBackground,
  width: 100,
  height: 100,
})
const handleUse = (url) => {
  formState.value.chatBackground = imageInfo.url = url;
}
const aspectRatio = ref(1)
watch(() => [useSystemStore.phoneWidth, useSystemStore.phoneHeight], (newVal) => {
  aspectRatio.value = +(newVal[0] / newVal[1]).toFixed(2)
}, {
  immediate: true,
})
</script>

<style lang="less" scoped>
.config-appearance {
  overflow-x: hidden;

  .phone-time {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ant-select {
      width: 38%;
    }
  }

  .ant-input-number {
    width: 100%;
  }

  .avatar-uploader {
    .ant-upload {
      width: 128px;
      height: 128px;
    }

    .ant-upload-select-picture-card {
      i {
        font-size: 32px;
        color: #999;
      }

      .ant-upload-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .img-remove {
        position: absolute;
        left: 90px;
        top: -8px;
        border-radius: 50%;
        background-color: #FFFFFF;
        font-size: 22px;
        color: #F05F57;

        &:hover {
          color: red;
        }
      }

      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
  }
}
</style>
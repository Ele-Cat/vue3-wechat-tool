<template>
  <a-tooltip title="生成动图、视频配置" placement="right">
    <div class="wtc-button" @click="handleConfig">配置</div>
  </a-tooltip>

  <a-modal v-model:open="modalVisible" centered title="动图、视频生成配置" :width="600" :footer="null" @cancel="handleCancel">
    <a-form :model="configState" :label-col="{ style: { width: '80px' }}">
      <a-form-item label="会话间隔" style="margin-top:40px;">
        <a-space>
          <a-tooltip title="最小间隔">
            <a-input-number v-model:value="useChatStore.generateConfig.minInterval" :min="0" :max="10000" placeholder="最小间隔" :precision="0" addon-after="ms" style="width:160px;" />
          </a-tooltip>
          <p>~</p>
          <a-tooltip title="最大间隔">
            <a-input-number v-model:value="useChatStore.generateConfig.maxInterval" :min="0" :max="10000" placeholder="最大间隔" :precision="0" addon-after="ms" style="width:160px;" />
          </a-tooltip>
        </a-space>
        <p class="form-tip">会话间隔可以理解为<b>回复考虑时长</b>，考虑时长为<b>最小间隔</b>~<b>最大间隔</b>的随机数</p>
      </a-form-item>
      <a-form-item label="发送音效" style="margin-top:40px;">
        <a-switch v-model:checked="useChatStore.generateConfig.chatSound" disabled />
        <p class="form-tip">生成视频时，每次会话发送时是否有音效</p>
      </a-form-item>
    </a-form>
    <a-row align="center" style="margin-top:40px;">
      <a-button @click="handleCancel">关闭</a-button>
    </a-row>
  </a-modal>
</template>

<script setup>
import { ref, watch } from "vue";
import useStore from "@/store";
const { useChatStore } = useStore();
import { toast } from "@/utils/feedback";

const modalVisible = ref(false);
const handleConfig = () => {
  modalVisible.value = true;
}
watch(() => useChatStore.generateConfig.minInterval, (newVal, oldVal) => {
  if (newVal > useChatStore.generateConfig.maxInterval) {
    toast({
      type: "warning",
      content: "最小间隔需小于等于最大间隔！"
    })
    useChatStore.generateConfig.minInterval = oldVal
  }
})
watch(() => useChatStore.generateConfig.maxInterval, (newVal, oldVal) => {
  if (newVal < useChatStore.generateConfig.minInterval) {
    toast({
      type: "warning",
      content: "最大间隔需大于等于最小间隔！"
    })
    useChatStore.generateConfig.maxInterval = oldVal
  }
})
const handleCancel = () => {
  modalVisible.value = false;
}
</script>
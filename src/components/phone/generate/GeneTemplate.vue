<template>
  <a-tooltip title="将当前对话保存为模板" placement="right">
    <div class="wtc-button" @click="handleSaveTemplate">存为模板</div>
  </a-tooltip>

  <a-modal v-model:open="addTemplateModalVisible" centered title="保存模板" :width="400" @cancel="handleTemplateCancel"
    @ok="handleTemplateOk">
    <a-form :model="templateState" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="模板标题" style="margin-top:40px;">
        <a-input v-model:value="templateState.templateTitle" placeholder="请输入模板标题" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import { useHtmlToImage } from '@/hooks/useHtmlToImage';
import useStore from "@/store";
import { toast } from "@/utils/feedback";
const { imageUrl, captureHtmlToImage } = useHtmlToImage();
const { useChatStore, useTemplateStore } = useStore();

// 将当前对话保存为模板
const templateState = reactive({
  templateTitle: "",
})
const addTemplateModalVisible = ref(false);
const handleSaveTemplate = () => {
  templateState.templateTitle = `聊天模板${dayjs().format("YYYY-MM-DD HH:mm:ss")}`
  addTemplateModalVisible.value = true;
}
// 保存模板
const handleTemplateOk = async () => {
  if (!templateState.templateTitle.trim()) {
    toast({
      type: "warning",
      content: "请输入模板标题",
    });
    return;
  }
  const phoneWrap = document.querySelector('.phone-wrap');
  await captureHtmlToImage(phoneWrap);
  useTemplateStore.add({
    title: templateState.templateTitle,
    chatList: useChatStore.chatList,
    snapshot: imageUrl.value,
  });
  addTemplateModalVisible.value = false;
  toast({
    type: "success",
    content: "模板保存成功，请在模板管理栏目查看",
  });
}
// 取消保存
const handleTemplateCancel = () => {
  addTemplateModalVisible.value = false;
}
</script>
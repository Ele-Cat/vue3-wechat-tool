<template>
  <a-tooltip title="将当前对话保存为模板" placement="right">
    <div class="wtc-button" @click="handleSaveTemplate">存为模板</div>
  </a-tooltip>
  <a-tooltip title="导出聊天为JSON文件" placement="right">
    <div class="wtc-button" @click="handleExportChat">导出聊天</div>
  </a-tooltip>
  <a-tooltip title="导入JSON文件为聊天" placement="right">
    <div class="wtc-button">
      <label class="label" for="json">
        导入聊天
        <input id="json" type="file" accept=".json" hidden @change="handleImportChat" />
      </label>
    </div>
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
import FileSaver from 'file-saver'
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

const handleExportChat = () => {
  const chatList = useChatStore.chatList;
  const jsonObj = {
    chatList,
  }
  const blob = new Blob([JSON.stringify(jsonObj, null, 2)], {
    type: 'application/json'
  })
  FileSaver.saveAs(blob, `聊天记录 - ${dayjs().format('YYYYMMDDHHmmss')}.json`);
}

const handleImportChat = (e) => {
  const file = e.target.files[0]
  if (!file.name.includes('json')) {
    toast({
      type: "warning",
      content: "只能插入json文件",
    });
    return
  }
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = (res) => {
    const { chatList } = JSON.parse(res.target.result)
    if (chatList && chatList.length) {
      useChatStore.chatList = chatList;
    } else {
      toast({
        type: "warning",
        content: "JSON文件中的格式有问题，请检查后重试",
      });
    }
  }
}
</script>
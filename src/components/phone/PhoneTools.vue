<template>
  <div class="phone-tools">
    <a-popconfirm title="确认重置外观？" placement="right" @confirm="resetAppearance">
      <a-tooltip title="重置外观" placement="left">
        <a-button type="primary" shape="circle" :icon="h(RotateLeftOutlined)" />
      </a-tooltip>
    </a-popconfirm>
    <a-popconfirm title="确认清空对话？" placement="right" @confirm="resetChat">
      <a-tooltip title="清空对话" placement="left">
        <a-button danger type="primary" shape="circle" :icon="h(DeleteOutlined)" />
      </a-tooltip>
    </a-popconfirm>
  </div>
</template>

<script setup>
import { h } from 'vue';
import { RotateLeftOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import useStore from "@/store";
const { useSystemStore } = useStore();
import { toast } from "@/utils/feedback";

const resetAppearance = () => {
  useSystemStore.resetAppearance();
  toast({
    type: "success",
    content: "重置外观成功！",
  });
}

const resetChat = () => {
  toast({
    type: "warning",
    content: "开发中！",
  });
}
</script>

<style lang="less" scoped>
.phone-tools {
  position: absolute;
  top: 0;
  left: -42px;
  display: flex;
  flex-direction: column;
  .ant-btn {
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="config-template">
    <div class="template-control">
      已有{{ useTemplateStore.templateList.length }}个模板
      <!-- <a-button type="primary">新增模板</a-button> -->
    </div>
    <a-table size="small" :columns="columns" :data-source="useTemplateStore.templateList" :pagination="false" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-popconfirm title="本操作会覆盖右侧聊天内容，确认应用本模板？" @confirm="handleUseTemplate(record.id)" :overlayStyle="{width:'200px'}">
              <a-typography-link>应用</a-typography-link>
              <!-- <a-button size="small" type="primary">应用</a-button> -->
            </a-popconfirm>
            <!-- <a-button size="small" type="primary" @click="handleUseTemplate(record.id)">编辑</a-button> -->
            <a-popconfirm title="确认删除该模板？" @confirm="handleDeleteTemplate(record.id)">
              <a-button danger size="small" type="primary">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import _ from "lodash";
import { DownOutlined } from '@ant-design/icons-vue';
import useStore from "@/store";
const { useTemplateStore, useChatStore } = useStore();
import { toast } from "@/utils/feedback";

const columns = [
  {
    title: '模板标题',
    dataIndex: 'title',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '140px',
    align: 'center',
  },
];

// 删除模板
const handleDeleteTemplate = (id) => {
  useTemplateStore.delete(id);
  toast({
    type: "success",
    content: "删除成功",
  });
}

// 应用模板
const handleUseTemplate = (id) => {
  const useChatList = useTemplateStore.templateList.find(item => item.id === id)["chatList"];
  useChatStore.chatList = _.cloneDeep(useChatList);
  toast({
    type: "success",
    content: "应用成功",
  });
}
</script>

<style lang="less" scoped>
.template-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: var(--theme-color);
}
</style>
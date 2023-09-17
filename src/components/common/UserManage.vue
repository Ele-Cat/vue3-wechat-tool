<template>
  <a-drawer :width="480" title="用户管理" placement="left" :open="open" @close="close" class="user-manage">
    <div class="user-control">
      已有{{ useUserStore.userList.length - 1 }}个用户
      <a-button type="primary" @click="handleAddUser">新增用户</a-button>
    </div>
    <a-table size="small" :columns="columns" :data-source="useUserStore.userList" :pagination="false" bordered :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <ImageEditor :imageInfo="{
            url: text,
            width: 46,
            height: 46,
          }" :aspectRatio="1" @use="url => handleUse(url, record)"></ImageEditor>
        </template>
        <template v-if="column.dataIndex === 'nickname' && record.role != 'own'">
          <a-input v-model:value="record.nickname" maxlength="20" style="margin: -5px 0;text-align: center;" />
        </template>
        <template v-if="column.dataIndex === 'operation' && record.role != 'own'">
          <a-space>
            <a-typography-link @click="handleSelectUser(record.id)" v-if="record.id !== useUserStore.activeOther">选择</a-typography-link>
            <a-typography-text block disabled v-else>已选</a-typography-text>
            <a-popconfirm title="确认删除该用户？" @confirm="handleDeleteUser(record.id)">
              <a-typography-link type="danger" v-if="useUserStore.userList.length > 2">删除</a-typography-link>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-drawer>
</template>

<script setup>
import { ref } from "vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import useStore from "@/store";
const { useUserStore } = useStore();
import { fileToBase64 } from "@/utils/utils";
import ImageEditor from "@/components/common/ImageEditor.vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['close'])
const close = () => {
  emit("close")
}

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: '60px',
    align: 'center',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '120px',
    align: 'center',
  },
];

const handleAddUser = () => {
  useUserStore.addUser();
}
const handleSelectUser = (id) => {
  useUserStore.selectUser(id);
}
const handleDeleteUser = (id) => {
  useUserStore.deleteUser(id);
}

const handleUse = (url, record) => {
  record.avatar = url;
}
</script>

<style lang="less" scoped>
.user-manage {
  .user-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    color: var(--theme-color);
  }
}
</style>

<style lang="less">
.user-manage {
  .table-striped td {
    background-color: #FAFAFA !important;
  }
}
</style>
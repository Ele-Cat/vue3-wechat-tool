<template>
  <a-drawer :width="480" title="用户管理" placement="left" :open="open" @close="close" class="user-manage">
    <div class="user-control">
      已有{{ useUserStore.userList.length - 1 }}个用户
      <a-button type="primary" @click="handleAddUser">新增用户</a-button>
    </div>
    <a-table size="small" :columns="columns" :data-source="useUserStore.userList" :pagination="false" bordered>
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
          <div class="editable-row-operations">
            <a-typography-link @click="handleSelectUser(record.id)" v-if="record.id !== useUserStore.activeOther">选择</a-typography-link>
            <a-typography-text block disabled v-else>已选</a-typography-text>
            <a-popconfirm title="确认删除该用户？" @confirm="handleDeleteUser(record.id)">
              <a-button danger size="small" type="primary" v-if="useUserStore.userList.length > 2">删除</a-button>
            </a-popconfirm>
          </div>
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
    width: '140px',
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

  .editable-row-operations {
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-btn {
      margin-left: 10px;
    }
  }

  .avatar-uploader {
    color: red;

    .ant-upload {
      width: 60px !important;
      height: 60px !important;
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

      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
  }
}
</style>

<style lang="less">
.user-manage {
  .ant-upload {
    width: 46px !important;
    height: 46px !important;
    margin-inline-end: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>
<template>
  <a-drawer :width="480" title="用户管理" placement="left" :open="open" @close="close" class="disclaimers-drawer">
    <a-table size="small" :columns="columns" :data-source="dataSource" :pagination="false" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <img src="http://img.adoutu.com/article/1606320519924.jpg" alt="" style="max-width:36px;">
        </template>

        <template v-if="column.dataIndex === 'nickname'">
          <a-input
            v-model:value="dataSource[record.key]['nickname']"
            style="margin: -5px 0"
          />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <a-typography-link @click="save(record.key)" v-if="true">选择</a-typography-link>
            <a-typography-link v-else>已选</a-typography-link>
            <a-popconfirm title="确认删除该用户？" @confirm="cancel(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </a-drawer>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['onClose'])

const close = () => {
  emit("onClose")
}

import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: '160px',
    align: 'center',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: '160px',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
  },
];
const data = [];
for (let i = 0; i < 6; i++) {
  data.push({
    key: i.toString(),
    nickname: `Edrward ${i}`,
  });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  console.log('editableData: ', editableData);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = key => {
  delete editableData[key];
};
</script>

<style lang="less" scoped>
.disclaimers-drawer {
  p {
    margin: 0 0 6px 0;
    text-align: justify;
    line-height: 1.2;
    &:nth-of-type(1), &:nth-last-of-type(1) {
      font-weight: bold;
    }
  }
}
.editable-row-operations a {
  margin: 0 4px;
}
</style>
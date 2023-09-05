<template>
  <div class="wt-content">
    <div class="wt-skeleton" v-if="useSystemStore.activeMenu === 'chat'">
      大纲
    </div>
    <div class="wt-preview">
      预览
    </div>
  </div>
</template>

<script setup>
import useStore from "@/store";
const { useSystemStore } = useStore();
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
    width: 50%;
    padding: 10px;
    background-color: #E0E0E0;
  }
}
</style>
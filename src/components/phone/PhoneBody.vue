<template>
  <div class="phone-body">
    <p v-for="i in 100" :key="i">这里写内容{{ i }}</p>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.phone-body {
  position: absolute;
  top: 264px;
  bottom: 269px;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}
</style>

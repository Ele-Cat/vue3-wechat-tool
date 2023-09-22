<template>
  <div class="wt-ctrl">
    <GeneTemplate />

    <a-divider style="border-color: var(--theme-color)" />
        
    <GenePng />

    <a-divider style="border-color: var(--theme-color)" />

    <GeneConfig />
    <GeneGif />
    <GeneVideo />
  </div>
</template>

<script setup>
import GeneTemplate from "./generate/GeneTemplate.vue";
import GenePng from "./generate/GenePng.vue";
import GeneConfig from "./generate/GeneConfig.vue"
import GeneGif from "./generate/GeneGif.vue";
import GeneVideo from "./generate/GeneVideo.vue";
</script>

<style lang="less">
.wt-ctrl {
  position: absolute;
  top: 0;
  right: -10px;
  transform: translate(100%, 0);

  .wtc-button {
    width: 72px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    background-image: linear-gradient(135deg, #fd6e6a 10%, #ffc600 100%);
    border-radius: 6px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.5s ease;
    .label {
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    &+.wtc-button {
      margin-top: 10px;
    }
    &:hover {
      transition: all 0.5s ease;
      box-shadow: 0 0 20px inset #fd6e6a;
      background-image: linear-gradient(135deg, #ffc600 10%, #fd6e6a 100%);
    }
  }
}
</style>

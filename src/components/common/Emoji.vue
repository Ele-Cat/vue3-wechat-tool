<template>
  <div class="emoji_wrap" style="margin-top: 10px">
    <!-- <a v-for="(emoji, index) in emojis" :key="index" :style="{backgroundImage: `url(../../assets/emoji/emoji_${index + 1}.png)`}" :title="emoji" @click="handleEmojiClick(emoji)"> -->
    <a v-for="(emoji, index) in emojiList" :key="index" :title="emoji" @click="handleEmojiClick(emoji)">
      <img :src="'data:image/png;base64,' + emojiBase64[emoji]" alt="">
      <p>{{ emoji }}</p>
    </a>
  </div>
</template>

<script setup>
import { emojiList } from "@/utils/enum";
import emojiBase64 from "@/utils/emojiBase64";
const emit = defineEmits()

const handleEmojiClick = (emoji) => {
  console.log('emoji: ', emoji);
  emit("add", emoji)
}
</script>

<style lang="less" scoped>
.emoji_wrap {
  display: flex;
  flex-wrap: wrap;
  a {
    display: block;
    width: 24px;
    height: 24px;
    margin: 4px 5px;
    // background-image: url(@/assets/emoji/emoji_1.png) !important;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    img {
      width: 100%;
      height: 100%;
    }
    p {
      text-indent: -9999px;
      color: red;
    }
  }
}
</style>

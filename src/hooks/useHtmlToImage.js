import { ref } from 'vue';
import html2canvas from 'html2canvas';
import GIF from 'gif.js';

export function useHtmlToImage() {
  const imageUrl = ref('');

  const captureHtmlToImage = async (element, params = {}) => {
    const canvas = await html2canvas(element, {...params});
    imageUrl.value = canvas.toDataURL();
  };

  return {
    imageUrl,
    captureHtmlToImage,
  };
}

export function useHtmlToGif() {
  const gifUrl = ref('');

  const captureHtmlToGif = async (element) => {
    const canvas = await html2canvas(element);
    // 创建一个 GIF 实例
    const gif = new GIF();
    // 将 Canvas 添加到 GIF 帧中
    gif.addFrame(canvas, { delay: 2000, copy: false, });
    // 完成 GIF 编码
    gif.on('finished', (blob) => {
      // 创建 GIF 对象的 URL
      const url = URL.createObjectURL(blob);
      // 更新组件数据以显示 GIF
      gifUrl.value = url;
    });

    // 开始编码 GIF
    gif.render();
  };

  return {
    gifUrl,
    captureHtmlToGif,
  };
}
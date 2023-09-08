import { ref } from 'vue';
import html2canvas from 'html2canvas';

export function useHtmlToImage() {
  const imageUrl = ref('');

  const captureHtmlToImage = async (element) => {
    const canvas = await html2canvas(element);
    imageUrl.value = canvas.toDataURL();
  };

  return {
    imageUrl,
    captureHtmlToImage,
  };
}
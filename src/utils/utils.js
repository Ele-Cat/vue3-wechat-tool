/**
 * 将图片文件转换为 Base64 格式
 * @param {File} file - 图片文件对象
 * @returns {Promise} - 返回 Promise 对象
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export async function urlToBase64(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const reader = new FileReader();
        const blob = await response.blob();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      } else {
        throw new Error('图片加载失败');
      }
    } catch (error) {
      console.error(error);
    }
  });
}

/**
 * 获取时分下拉
 * @param {Number} num 
 * @returns 
 */
export function toZeroStr(num) {
  let res = [];
  for (let i = 0; i < num; i++) {
    let obj = {
      label: ('00' + i).slice(-2),
      value: ('00' + i).slice(-2),
    };
    res.push(obj)
  }
  return res || []
}

export const getAssetsFile = (url) => {
  return new URL(`${url}`, import.meta.url).href
}
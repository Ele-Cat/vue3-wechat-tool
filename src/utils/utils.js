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
export function toArr(num, zero = true, start = 0, unit = "") {
  let res = [];
  for (let i = start; i < num; i++) {
    let obj = {
      label: zero ? ('00' + i).slice(-2) : i + unit,
      value: zero ? ('00' + i).slice(-2) : i + unit,
    };
    res.push(obj)
  }
  return res || []
}

/**
 * 获取年份下拉
 * @returns 
 */
export function toYearStr() {
  let res = [];
  for (let i = 2018; i < 2048; i++) {
    let obj = {
      label: i + "年",
      value: i + "年",
    };
    res.push(obj)
  }
  return res || []
}

export const getAssetsFile = (url) => {
  return new URL(`${url}`, import.meta.url).href
}
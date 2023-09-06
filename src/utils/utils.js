export const getAssetsFile = (url) => {
  return new URL(`${url}`, import.meta.url).href
}
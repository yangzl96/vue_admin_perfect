/**
 * 判断是否为外部资源
 * @param {*} path
 */
export function isExternal(path) {
  // 以这几个开头的，都认为是外部资源
  return /^(https?:|mailto:|tel:)/.test(path)
}

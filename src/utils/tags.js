// 白名单
const whiteList = ['/login', '/import', '/404', '/401']

/**
 * @param {*} path 是否需要被缓存
 * @returns
 */
export function isTags(path) {
  return !whiteList.includes(path)
}

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // 复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 复杂数据类型是string了的，但是这里不好单独处理，使用try catch
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}

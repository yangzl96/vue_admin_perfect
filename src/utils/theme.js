import axios from 'axios'
// 在CSS中提出的颜色函数的解析器和转换器
import color from 'css-color-function'
// 转换RGB(A)颜色为十六进制
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'

/**
 * 写入新样式到 style
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = elNewStyle => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * 根据主色值，生成最新的样式表
 * primaryColor: 主题色
 */
export const generateNewStyle = async primaryColor => {
  // 1. 根据主色生成色值表
  const colors = generateColors(primaryColor)
  // 2. 获取当前element-plus的默认样式表，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // console.log(cssText)
  // 3. 遍历生成的色值表，在默认样式表中 进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })
  return cssText
}

// 生成色值表
export const generateColors = primary => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formula).forEach(key => {
    // 替换色值表中的 primary字符串 变成真实的 颜色变量
    // 色值表中的 "color(primary shade(10%))" 'primary' 全部替换为主题色
    const value = formula[key].replace(/primary/g, primary)
    // 生成16进制的色值
    colors[key] = '#' + rgbHex(color.convert(value))

    // colors:
    // {
    //   "shade-1": '#' + rgbHex(color.convert(value))
    // }
  })
  return colors
}

// 获取element-plus的默认样式表
const getOriginalStyle = async () => {
  // 从官网的 安装里面找：//unpkg.com/element-plus/dist/index.css
  // 复制到浏览器得到这个地址栏：https://unpkg.com/element-plus@2.1.10/dist/index.css
  // 但是这里从官网获取的版本和我们本地安装的版本不一定是一样的，所以不使用这种方式获取
  // 使用获取我们当前的版本替换中间的版本号
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

// 把需要替换的色值打上标记
// 比如说 element-plus 中的一个全局变量：--el-color-primary: '#409eff'
// 那么打上标记就是：--el-color-primary: '要替换掉'
// 然后在所有项目里找到 '要替换掉'的 value
// 前提：哪些色值需要打上标记，去element-plus中找常见的色值
const getStyleTemplate = data => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    // 标记结果：例子
    // --el-color-primary: '#409eff' => --el-color-primary: 'primary'
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

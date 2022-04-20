
// 1. 导入所有的svg图标 需要webpack的api
// 2. 完成SvgIcon的全局注册
import SvgIcon from '@/components/SvgIcon'

// 通过这个api去创建一个文件上下文，三个参数：要搜索的目录 是否搜索子目录 要匹配的文件
// 返回一个require函数(不就是导入文件的那个方法吗)，我们用svgRequire接收，这个函数接收一个request参数，后会被用去require导入
// 同时这个函数有三个属性：resolve, keys, id
// keys可以获取所有被匹配的文件，是一个数组

const svgRequire = require.context('./svg', false, /\.svg$/)
// 遍历所有匹配的文件，通过require去导入所有的svg图标
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// 全局挂载
export default app => {
  app.component('svg-icon', SvgIcon)
}

import { createApp } from 'vue'
// 导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'

const app = createApp(App)
// element-plus
installElementPlus(app)
// svg-icon
installIcons(app)

app.use(store).use(router).use(i18n).mount('#app')

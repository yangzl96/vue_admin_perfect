import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'

const app = createApp(App)
// element-plus
installElementPlus(app)
// svg-icon
installIcons(app)
app.use(store).use(router).mount('#app')

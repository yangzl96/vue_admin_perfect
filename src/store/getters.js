// 快捷访问
import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters = {
  token: state => state.user.token,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => {
    return {
      // 为了自动更新 所以取theme里面定义的
      // 在theme里面触发state.variables的修改 让这里自动更新获取新的颜色
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}

export default getters

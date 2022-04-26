import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    // 侧边栏
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 国际化
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    // 添加tag
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => item.path === tag.path)
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 为指定的 tag 修改 title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  action: {}
}

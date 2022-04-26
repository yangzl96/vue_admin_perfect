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
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      const index = payload.index
      const length = state.tagsViewList.length
      if (payload.type === 'index') {
        state.tagsViewList.splice(index, 1)
      } else if (payload.type === 'other') {
        // 删除自身前面的和后面的
        state.tagsViewList.splice(index + 1, length - index + 1)
        state.tagsViewList.splice(0, index)
      } else if (payload.type === 'right') {
        // 删除自身右边所有的
        state.tagsViewList.splice(index + 1, length - index + 1)
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  action: {}
}

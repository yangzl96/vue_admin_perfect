import { createStore } from 'vuex'
import user from './modules/user'
import getters from '@/store/getters'

export default createStore({
  getters,
  modules: {
    user
  }
})

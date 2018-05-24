import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
/*import * as  getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'*/
import counts from './modules/counts'
import login from './modules/login'

Vue.use(Vuex)
/*//全局state数据
const state = {
  count: 0
}*/

export default new Vuex.Store({
  // strict: true, //严格模式
/*  state,
  getters,
  mutations,
  actions,*///全局vuex
  modules:{          //模块vuex
    counts,
    login
  },
  plugins: [createLogger()]

})

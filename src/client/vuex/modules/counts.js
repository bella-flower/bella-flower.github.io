import * as mutation from '../mutation-type'

const state = {
  count: 0
}

// getters
const getters = {

}

// actions
const actions = {
  increment: ({ commit }) => commit(mutation.increment),
  decrement: ({ commit }) => commit(mutation.decrement),

}

// mutations
const mutations = {
//数据变化方法mutation
  [mutation.increment]:(state) =>  state.count++ ,
  [mutation.decrement] :(state) =>  state.count--,
}

export default {
  state,
  getters,
  actions,
  mutations
}

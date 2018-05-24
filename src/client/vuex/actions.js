import  * as types from './mutation-type'
//用来提交mutation的命令
export const increment = ({ commit }) => commit(types.increment)
export const decrement = ({ commit }) => commit(types.decrement)


//getter”（可以认为是 store 的计算属性）。Getter 会暴露为 store.getters 对象：
export const evenOrOdd = state => state.count % 2 === 0 ? 'even' : 'odd'

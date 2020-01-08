export const state = () => ({
  list: []
})

export const mutations = {
  add(state, category) {
    state.list.push(category)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}

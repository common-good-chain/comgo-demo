export const state = () => ({
  list: [],
  sortBy: 'createdAt'
})

export const mutations = {
  add(state, talent) {
    state.list.push(talent)
  },
  emptyList(state) {
    state.list = []
  },
  changeSortMethod(state, value) {
    state.sortBy = value
  }
}

export const getters = {
  list: state => {
    return state.list
  },
  sortBy: state => {
    return state.sortBy
  }
}

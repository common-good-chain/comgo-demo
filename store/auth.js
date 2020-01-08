import Cookies from 'js-cookie'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    console.log('mutation', user)
    state.user = JSON.stringify(user)
    Cookies.set('user', user)
  },
  logout(state) {
    state.user = null
    strapi.clearToken()
    Cookies.set('user', null)
    this.$router.push('/')
  }
}

export const getters = {
  user: state => {
    return state.user && JSON.parse(state.user)
  }
}

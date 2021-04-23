import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    change (state,token) {
      state.token = token
    }
  }
})
export default store
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
import VueRouter from 'vue-router'
import router from "./router.js"

import Vuex from 'vuex'

Vue.use(Vuex)


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = Axios
Vue.use(VueRouter)
Axios.defaults.withCredentials = true

const store = new Vuex.Store({
  state: {
    token: "",
	role: [],
	permission: [],
	levelOne: false,
	levelTwo: false,
  },
  mutations: {
    change (state,token) {
      state.token = token
    },
	setRole (state,role) {
		state.role = role
	},
	setPermission (state,permission) {
		state.permission = permission
	},
	setLevelOne (state) {
		let len = state.role.length
		for(var i = 0; i < len; i++) {
			if (state.role[i] == 'level_one') {
				state.levelOne = true;
			}
		}
	},
	setLevelTwo (state) {
		let len = state.role.length
		for(var i = 0; i < len; i++) {
			if (state.role[i] == 'level_two') {
				state.levelTwo = true;
			}
		}
	}
  }
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

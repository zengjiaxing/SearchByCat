import Vue from "vue";
import VueRouter from "vue-router";

import login from "./components/login.vue";
import register from "./components/register.vue";
import Sign from "./components/Sign.vue";
import home from "./components/home.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
		path: "/login",
		component: login
	},
	{
		path: "/register",
		component: register
	},
	{
		path: "/Sign",
		component: Sign
	},
	{
		path: "/home",
		component: home
	},
	{
		path: '/',
		redirect: '/Sign'
	}
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
var router = new VueRouter({
	routes
})
export default router;

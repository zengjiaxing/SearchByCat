<template>
	<div id="index">
		<!-- <img alt="Vue logo" src="./assets/logo.png"> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<!-- <home></home> -->
		<!-- <router-link v-bind:to="url">
			<el-button v-on:click="history()" type="info" icon="el-icon-time" circle style="position: absolute; top: 25px; right: 300px;z-index: 4;">
			</el-button>
		</router-link> -->
		<el-button @click="search()" type="info" icon="el-icon-d-arrow-left" circle style="position: absolute; top: 25px; right: 0px;z-index: 4;">
		</el-button>

		<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="300px" @click="search()">
			<a v-bind:href="tourl('https://zh.wikipedia.org/wiki/')" style="position: absolute; top: 70px;right: 20px;" target=_blank><img src="../../public/wiki.png" /></a>
			<a v-bind:href="tourl('https://so.csdn.net/so/search/s.do?q=')" style="position: absolute; top: 70px;right: 150px;" target=_blank><img src="../../public/CSDN.png" /></a>
			<a v-bind:href="tourl('https://github.com/search?q=')" style="position: absolute; top: 200px;right: 20px;" target=_blank><img src="../../public/github.png" /></a>
			<a v-bind:href="tourl('https://www.google.com/')" style="position: absolute; top: 200px;right: 150px;" target=_blank><img src="../../public/google.png" /></a>
			<a v-bind:href="tourl('https://stackoverflow.com/nocaptcha?s=')" style="position: absolute; top: 330px;right: 20px;" target=_blank><img src="../../public/stackoverflow.png" /></a>
			<a v-bind:href="tourl('https://search.gitee.com/?skin=rec&type=repository&q=')" style="position: absolute; top: 330px;right: 150px;" target=_blank><img src="../../public/gitee.png" /></a>
			<el-button type="info" @click="drawer = false" icon="el-icon-d-arrow-right" circle style="position: absolute; top: 25px; right: 0px;z-index: 4;">
			</el-button>
		</el-drawer>

		<!-- <router-link v-bind:to="urlvue">
			<el-button v-on:click="getUrl()" type="info" icon="el-icon-user" circle style="position: absolute; top: 25px; right: 200px;z-index: 4;">
			</el-button>
		</router-link> -->
		<el-dropdown style="position: absolute; top: 25px; right: 200px;z-index: 4;">
			<span class="el-dropdown-link">
				<router-link v-bind:to="urlvue">
					<el-button v-on:click="getUrl()" type="info" icon="el-icon-user" circle>
					</el-button>
				</router-link>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="getUrl()">用户主页</el-dropdown-item>
				<el-dropdown-item @click.native="logout()">登出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

		<router-link to="/Sign">
			<el-button type="info" icon="el-icon-search" circle style="position: absolute; top: 25px; right: 100px;z-index: 4;">
			</el-button>
		</router-link>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>

	</div>
</template>

<script>
	/* import login from './login.vue' */
	import pipe from '../pipe.js'
	import {
		mapMutations
	} from 'vuex'
	import axios from 'axios';

	export default {
		name: 'index',
		components: {
			/* login */
		},
		data() {
			return {
				urlvue: "/login",
				drawer: false,
				//url: "http://127.0.0.1:7070/",
				url: "http://1.15.56.11:7070/",
				val: ""
			};
		},
		/* mounted: function() {
			pipe.$on('getUrl', (data) => {
				this.url = data
			})
		}, */
		/* methods:{
			getUrl(){
				pipe.$on('getUrl', (data) => {
					this.url = data
				})
			}
		} */
		/* created: function() {
			axios.get(this.url + 'test')
				.then(response => {
					console.log(response.data);
				});
		}, */
		/* computed: {
			url: function(){
				var url;
				axios.get('http://192.168.43.17:7070/querySign')
					.then(response => {
						if (response.data === 1) {
							url = '/home';
							this.$router.push({
								path: '/home'
							});
						}
					});
					return url;
			}
		}, */
		computed: {
			//jwt传回的token
			token() {
				return this.$store.state.token
			},
			
			//通过token是否为空来决定按钮状态
			disabled() {
				return (this.$store.state.token == '')
			}
		},
		methods: {
			...mapMutations([
				'change', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
			]),
			tourl(url) {
				return url + this.val;
			},
			search() {
				this.drawer = true;
				pipe.$on('val', (data) => {
					this.val = data
				})
			},
			logout() { //登出
				axios.get(this.url + 'logout').then(response => {
					this.change('');
					if (response.data == 1) {
						this.change('');
						//window.location.reload(true);
						this.$router.push({
							path: '/Sign'
						});
						window.location.reload(true);
					} else {
						console.log("");
					}
				});
			},
			getUrl() { //查询是否已登录
						if (!this.disabled) {
							this.urlvue = '/home';
							this.$router.push({
								path: '/home'
							});
						} else {
							this.urlvue = '/login';
							this.$router.push({
								path: '/login'
							});
						}
			},
			history() {
				this.$store.commit('increment');
			}
		}


	}
</script>

<style>
	.el-dropdown-link {
		cursor: pointer;
		color: #3d4243;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.el-drawer__body {
		flex: 1;
		background-color: #2c3e50;
	}

	a {
		text-decoration: none;
	}
</style>

<template>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="ruleForm.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
		</el-form-item>


		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm()">注册</el-button>
		</el-form-item>
		<!-- <p>{{this.$store.state.count}}</p> -->
	</el-form>
</template>

<script>
	/* import pipe from '../pipe.js'; */
	import axios from 'axios';
	import {
		mapMutations
	} from 'vuex'
	axios.defaults.withCredentials = true;

	export default {
		data() {
			var checkUsername = (rule, value, callback) => {
				if (!value) {
					callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};

			return {
				ruleForm: {
					pass: '',
					username: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					username: [{
						validator: checkUsername,
						trigger: 'blur'
					}]
				},
				//url: "http://127.0.0.1:7070/",
				url: "http://1.15.56.11:7070/",
			};
		},
		computed: {
			message() {
				return this.$store.state.message
			},
		},
		methods: {
			...mapMutations([
				'change', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
				'setRole',
				'setPermission',
				'setLevelOne',
				'setLevelTwo',
			]),
			submitForm(formName) {
				this.$refs[formName].validate((valid) => { //登录
					if (valid) {
						let data = {
							"username": this.ruleForm.username,
							"password": this.ruleForm.pass
						}
						axios.post(this.url + 'login', data)
							.then(response => {
								if (response.data.code == 200) {
									/* pipe.$emit('getUrl', '/home'); */
									this.$router.push({
										path: '/Sign'
									});
				
								}
								this.change(response.data.token);
								this.setRole(response.data.role);
								this.setPermission(response.data.permission);
								this.setLevelOne();
								this.setLevelTwo();
								
							});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.$router.push({
					path: '/register'
				});
			}
		}
	}
</script>

<style>
	.demo-ruleForm {
		margin-top: 275px;
		margin-left: 700px;
		width: 500px;
	}
</style>

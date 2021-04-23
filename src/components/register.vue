<template>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="ruleForm.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	/* import pipe from '../pipe.js'; */
	import axios from 'axios';
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
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					pass: '',
					checkPass: '',
					username: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
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
		methods: {
			submitForm(formName) {//注册
				this.$refs[formName].validate((valid) => {
					if (valid) {
						/* let data = {"username":this.ruleForm.username,"password":this.ruleForm.pass} */
						axios.get(this.url+'addUser/' + this.ruleForm.username + '/' + this.ruleForm.pass)
							.then(response => {
								if (response.data == 1) {
									/* pipe.$emit('getUrl', '/home'); */
									this.$router.push({
										path: '/Sign'
									});
								}else if (response.data == 0) {
									alert("重复的用户名")
								}
							});
					} else {
						alert('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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

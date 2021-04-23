<template>
	<el-button :disabled="disabled" round v-bind:icon="sign" @click='like' size="mini" class="like">{{prop.like_count}}</el-button>
</template>

<script>
	import axios from 'axios';
	export default {
		props: {
			'like_count': Number,
			'id': Number,
			'tip': Number,
			'flg': Number,
		},
		data() {
			return {
				prop: Object.assign({},this.$props),
				sign: "el-icon-circle-check",
				//url: "http://127.0.0.1:7070/",
				url: "http://1.15.56.11:7070/",
			}
		},
		watch: {
		},
		computed: {
			token() {
				return this.$store.state.token
			},
			disabled() {
				return (this.$store.state.token === '')
			}
		},
		created(){
			if(this.prop.flg != 0) {
				this.prop.flg = false
				this.sign = "el-icon-success";
			} else {
				this.prop.flg = true
				this.sign = "el-icon-circle-check";
			}
		},
		methods: {
			like() {
				axios.defaults.headers.common["token"] = this.token;
				if (this.prop.flg) {
					this.prop.like_count++;
					this.prop.flg = false;
					this.sign = "el-icon-success";
					if (this.prop.tip === 0) {
						let data = {
							"sign": 1,
							"contentId": this.prop.id,
						};

						axios.post(this.url + 'info-like/change',
							data
						).then(response => {
							console.log(response.data)
						});
					} else {
						let data = {
							"sign": 1,
							"paraphrase_comment_id": this.prop.id,
							
						};
						axios.post(this.url + 'paraphrase-comment-like/change',
							data
						).then(response => {
							console.log(response.data)
						});
					}


				} else {
					this.prop.like_count--;
					this.prop.flg = true;
					this.sign = "el-icon-circle-check";
					if (this.prop.tip === 0) {
						let data = {
							"sign": 0,
							"contentId": this.prop.id,
						};
						axios.post(this.url + 'info-like/change',
							data
						).then(response => {
							console.log(response.data)
						});
					} else {
						let data = {
							"sign": 0,
							"paraphrase_comment_id": this.prop.id,
							
						};
						axios.post(this.url + 'paraphrase-comment-like/change',
							data
						).then(response => {
							console.log(response.data)
						});
					}
				}
			}
		}

	}
</script>

<style>
	.like {
		position: relative;
	}
</style>

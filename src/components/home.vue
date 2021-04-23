<template>
	<div>
		<el-container class="home">
			<el-header></el-header>
			<el-main>
				<el-tabs :tab-position="tabPosition" style="height: 200px;" v-model="selectd" v-on:tab-click="get()">
					<el-tab-pane label="用户主页" name="用户主页"></el-tab-pane>
					<!-- <el-tab-pane label="收藏" name="收藏">
						<el-collapse v-model="activeNames" accordion>
							<div v-for="aop in infos" v-bind:key="aop.enName" @focusin="checkswitch(aop.id)" @click="click(aop.id)">
								<el-collapse-item v-bind:title="name(aop)" v-bind:name="name(aop)">
									<el-card class="box-card" shadow="never" style="width: 100%">
										<el-switch @change="switchset(aop.id)" active-value="1" inactive-value="0" v-model="value" v-bind:disabled="useful" active-color="#567a9e" inactive-color="#909399">
										</el-switch>
										<div class="text item">
											<p>{{aop.cnName}}</p>
											<p>{{aop.enName}}</p>
											<p>{{aop.abbreviation}}</p>
											<p>{{aop.content}}</p>
										</div>
										<div class="tag-group">
											<el-tag v-for="tag in aop.tags" :key="tag" effect="plain">
												{{ tag }}
											</el-tag>
										</div>
										<el-table :data="aop.literatureList" style="width: 98%" :row-class-name="tableRowClassName">
											<el-table-column prop="bookName" label="bookName" width="180">
											</el-table-column>
											<el-table-column prop="author" label="author" width="180">
											</el-table-column>
											<el-table-column prop="url" label="url">
												<template slot-scope="scope">
													<a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.url}}</a>
												</template>
											</el-table-column>
										</el-table>
									</el-card>
								</el-collapse-item>
							</div>
						</el-collapse>
					</el-tab-pane>
					<el-tab-pane label="历史" name="历史">
						<el-collapse v-model="activeNames" accordion>
							<div v-for="aop in infos" v-bind:key="aop.enName" @focusin="checkswitch(aop.id)" @click="click(aop.id)">
								<el-collapse-item v-bind:title="name(aop)" v-bind:name="name(aop)">
									<el-card class="box-card" shadow="never" style="width: 100%">
										<el-switch @change="switchset(aop.id)" active-value="1" inactive-value="0" v-model="value" v-bind:disabled="useful" active-color="#567a9e" inactive-color="#909399">
										</el-switch>
										<div class="text item">
											<p>{{aop.cnName}}</p>
											<p>{{aop.enName}}</p>
											<p>{{aop.abbreviation}}</p>
											<p>{{aop.content}}</p>
										</div>
										<div class="tag-group">
											<el-tag v-for="tag in aop.tags" :key="tag" effect="plain">
												{{ tag }}
											</el-tag>
										</div>
										<el-table :data="aop.literatureList" style="width: 98%" :row-class-name="tableRowClassName">
											<el-table-column prop="bookName" label="bookName" width="180">
											</el-table-column>
											<el-table-column prop="author" label="author" width="180">
											</el-table-column>
											<el-table-column prop="url" label="url">
												<template slot-scope="scope">
													<a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.url}}</a>
												</template>
											</el-table-column>
										</el-table>
									</el-card>
								</el-collapse-item>
							</div>
						</el-collapse>
					</el-tab-pane> -->
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	/* import axios from 'axios' */
	export default {
		data() {
			return {
				tabPosition: 'left',
				selectd: "用户主页",
				//url: "http://127.0.0.1:7070/",
				url: "http://1.15.56.11:7070/",
				/* input1: '',
				activeNames: ['1'],
				infos: [],
				str: '',
				sign: 0,
				dataId: "",
				value: "0",
				useful: false */
			};
		},
		/* methods: {
			switchset(id){//收藏与取消收藏
				if(this.value == "1"){
					axios.get(this.url + 'addCollection/' + id).then(response => {
						console.log(response.data);
					});
				}else{
					axios.get(this.url + 'deleteCollection/' + id).then(response => {
						console.log(response.data);
					});
				}	
			},
			checkswitch(id){//检测是否被收藏，并改变收藏按钮的状态
				axios.get(this.url + 'queryCollection/' + id).then(response => {
					if(response.data == 1){
						this.value = "1";
					}else if(response.data == 0){
						this.value = "0";
					}
				});
				
			},
			name(info) {//当中文名为空时，改用英文名为标题
				if (info.cnName === "") {
					return info.enName;
				} else {
					return info.cnName;
				}
			},
			click(id) {//记录浏览记录，判断用户登录状态，当用户未登录时禁用收藏
				axios.get(this.url + 'querySign/').then(response => {
					if(response.data == 1){
						this.useful = false;
					}else{
						this.useful = true;
					}
				});
				
				if (this.dataId === id) {
					console.log(id);
				} else {
					this.dataId = id;
					axios.get(this.url + 'addRecord/' + id).then(response => (console.log(response.data)));
				}
			},
			get() {//当选定不同的栏目时查询不同的词条
				if (this.selectd === "历史") {
					axios.get(this.url+'getRecord').then(response => (this.infos =
						response.data));
				}
				if(this.selectd === "收藏"){
					axios.get(this.url+'getCollection').then(response => (this.infos =
						response.data));
				}
				this.activeNames ="";
			},
		} */
	};
</script>

<style scoped>
	.home>>>.el-tabs {
		height: auto !important;
	}

	.home>>>.el-tabs__item.is-active {
		color: #535353 !important;
	}

	.home>>>.el-tabs__active-bar {
		background-color: #ffffff;
	}

	.home>>>.el-header,
	.home>>>.el-footer {
		position: absolute;
		left: 0px;
		right: 0px;
		height: 90px !important;
		background-color: #3d4243;
		color: #333;
		text-align: center;
		line-height: 20px;
	}

	.home>>>.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.home>>>.el-main {
		position: absolute;
		background-color: #a3a3a3;
		left: 0px;
		right: 0px;
		color: #333;
		top: 90px;
		bottom: 0;
		text-align: center;
		line-height: 160px;
	}

	.home>>>.el-container {
		margin-bottom: 40px;
	}

	.home>>>.el-container:nth-child(5) .el-aside,
	.home>>>.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.home>>>.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>

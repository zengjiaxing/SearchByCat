<template>
	<el-container class="sign">

		<el-header>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12">
          <div style="">
            <el-input placeholder="请输入内容" v-model="input1" class="input-with-select" v-on:keyup.native="get()">
              <el-button slot="append" icon="el-icon-search" v-on:click="get()"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="4">
          <!-- Form -->
          <el-button v-if="true" :disabled="disabled" type="info" style="background-color: #909399; border-color: #909399 ;"
                     icon="el-icon-plus" @click="dialogFormVisible3 = true" circle></el-button>
          <el-dialog title="新增词条" :visible.sync="dialogFormVisible3">
            <el-form :model="form">
              <el-form-item label="中文名" :label-width="formLabelWidth">
                <el-input type="text" v-model="form.cnName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="英文名" :label-width="formLabelWidth">
                <el-input type="text" v-model="form.enName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="缩略名" :label-width="formLabelWidth">
                <el-input type="text" v-model="form.slug" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="词条概述" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelForm()">取 消</el-button>
              <el-button type="primary" @click="commitInfo()">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="4">
          <el-dropdown style="">
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
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
          <el-button type="info" @click="drawer = true" icon="el-icon-d-arrow-right" circle style="">
          </el-button>
          <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="300px" @click="search()">
            <a v-bind:href="tourl('https://zh.wikipedia.org/wiki/')" style="position: absolute; top: 70px;right: 20px;" target=_blank><img src="../../public/wiki.png" /></a>
            <a v-bind:href="tourl('https://so.csdn.net/so/search/s.do?q=')" style="position: absolute; top: 70px;right: 150px;" target=_blank><img src="../../public/CSDN.png" /></a>
            <a v-bind:href="tourl('https://github.com/search?q=')" style="position: absolute; top: 200px;right: 20px;" target=_blank><img src="../../public/github.png" /></a>
            <a v-bind:href="tourl('https://www.google.com/')" style="position: absolute; top: 200px;right: 150px;" target=_blank><img src="../../public/google.png" /></a>
            <a v-bind:href="tourl('https://stackoverflow.com/nocaptcha?s=')" style="position: absolute; top: 330px;right: 20px;" target=_blank><img src="../../public/stackoverflow.png" /></a>
            <a v-bind:href="tourl('https://search.gitee.com/?skin=rec&type=repository&q=')" style="position: absolute; top: 330px;right: 150px;" target=_blank><img src="../../public/gitee.png" /></a>
          </el-drawer>
        </el-col>
      </el-row>


    </el-header>

		<el-container>
			<el-main>
				<el-row>
					<el-col :span="6" class="one">
						<div class="grid-content bg-purple">
							<template>
								<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" infinite-scroll-distance="0">
									<li v-for="info in infos" v-bind:key="info.enName" class="infinite-list-item">
										<el-card shadow="hover" class="button" @click.native="getInfoContent(info)">
											{{name(info)}}
										</el-card>
									</li>
								</ul>
							</template>
						</div>
					</el-col>
					<el-col :span="10" class="two">
						<div class="grid-content bg-purple-light">
							<template v-if="top===1">
								<el-card v-if="top===1" class="box-card" @click.native="changeInfoContent(info)">
									<div slot="header" class="clearfix">
										<span>{{allName(info)}}</span>
										<!-- <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button> -->
									</div>
									<div class="text item">
										{{info.content}}
									</div>
								</el-card>

								<el-card class="box-card" v-for="paraphrase in paraphrases" v-bind:key="paraphrase.paraphraseId" @click.native="reChangeParaphrase(paraphrase)">
									<div slot="header" class="clearfix">
										<span>{{paraphrase.paraphraseTitle}}</span>
										<el-button v-if="(levelone || leveltwo)" :disabled="disabled" style="float: right; padding: 3px 0" type="text"
										@click="getPa(paraphrase)">编辑</el-button>
										<el-dialog title="编辑词条栏目" :visible.sync="dialogFormVisible2">
											<el-form :model="form">
												<el-form-item label="编辑" :label-width="formLabelWidth">
													<el-input type="textarea" v-model="form.pa" autocomplete="off"></el-input>
												</el-form-item>
											</el-form>
											<div slot="footer" class="dialog-footer">
												<el-button @click="cancelForm()">取 消</el-button>
												<el-button type="primary" @click="regetPa()">确 定</el-button>
											</div>
										</el-dialog>
									</div>
									<b class="text item">
                    {{paraphrase.paraphraseContent}}
									</b>
								</el-card>
								<el-button v-if="leveltwo" :disabled="disabled" style="margin-left: 718px;" icon="el-icon-plus" size="mini"
								@click="dialogFormVisible4 = true"></el-button>
								<el-dialog title="新增栏目" :visible.sync="dialogFormVisible4">
									<el-form :model="form">
										<el-form-item label="栏目名" :label-width="formLabelWidth">
											<el-input type="text" v-model="form.pName" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="栏目内容" :label-width="formLabelWidth">
											<el-input type="textarea" v-model="form.pContent" autocomplete="off"></el-input>
										</el-form-item>
									</el-form>
									<div slot="footer" class="dialog-footer">
										<el-button @click="cancelForm()">取 消</el-button>
										<el-button type="primary" @click="CPC()">确 定</el-button>
									</div>
								</el-dialog>
							</template>
						</div>
					</el-col>
					<el-col :span="8" class="three">
						<div class="grid-content bg-purple-three">
							<template>
								<div v-if="threeSign === 0">
									<div v-for="infoContent in infoContents" v-bind:key="infoContent.infoContentId">
										<el-card style="float:left;" class="box-card-three">
											<div class="text item">
												{{infoContent.content}}
											</div>
											<like v-if="threeSign === 0" :disabled="disabled" style="margin-left: 500px" :like_count="infoContent.likeNum"
											:id="infoContent.infoContentId" :tip="0" :flg="infoContent.sign"></like>
										</el-card>
									</div>
									<!-- Form -->
									<el-button :disabled="disabled" style="margin-left: 548px;" icon="el-icon-plus" size="mini" @click="dialogFormVisible0 = true"></el-button>

									<el-dialog title="新增概述" :visible.sync="dialogFormVisible0">
										<el-form :model="form">
											<el-form-item label="概述内容" :label-width="formLabelWidth">
												<el-input type="textarea" v-model="form.detail" autocomplete="off"></el-input>
											</el-form-item>
										</el-form>
										<div slot="footer" class="dialog-footer">
											<el-button @click="cancelForm()">取 消</el-button>
											<el-button type="primary" @click="reGetDetail()">确 定</el-button>
										</div>
									</el-dialog>
								</div>
								<div v-if="threeSign === 1">
									<div v-for="paraphraseComment in paraphraseComments" v-bind:key="paraphraseComment.paraphraseCommentId">
										<el-card style="float:left;" class="box-card-three">
											<div class="text item">
												{{paraphraseComment.username +':   '+paraphraseComment.paraphraseComment}}
											</div>
											<span>
												<h16 style="float: left;">{{paraphraseComment.commentDate}}</h16>
											</span>
											<span>
												<like v-if="threeSign === 1" :disabled="disabled" style="margin-left: 513px" :like_count="paraphraseComment.likeNum"
												:id="paraphraseComment.paraphraseCommentId" :tip="1" :flg="paraphraseComment.sign"></like>
											</span>
										</el-card>
									</div>
									<!-- Form -->
									<el-button :disabled="disabled" style="margin-left: 548px;" icon="el-icon-plus" size="mini" @click="dialogFormVisible1 = true"></el-button>
									<el-dialog title="新增评论" :visible.sync="dialogFormVisible1">
										<el-form :model="form">
											<el-form-item label="评论内容" :label-width="formLabelWidth">
												<el-input type="textarea" v-model="form.comment" autocomplete="off"></el-input>
											</el-form-item>
										</el-form>
										<div slot="footer" class="dialog-footer">
											<el-button @click="cancelForm()">取 消</el-button>
											<el-button type="primary" @click="reGetComment()">确 定</el-button>
										</div>
									</el-dialog>
								</div>
							</template>
						</div>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import axios from 'axios';
	import like from './like.vue'
  import {mapMutations} from "vuex";
	export default {
		components: {
			like
		},
		data() {
			return {
        urlvue: "/login",
        drawer: false,
        val: "",
				/* form-begin */
				//弹窗可视化
				dialogFormVisible0: false,
				dialogFormVisible1: false,
				dialogFormVisible2: false,
				dialogFormVisible3: false,
				dialogFormVisible4: false,
				//弹窗表单
				form: {
					detail: '',
					comment: '',
					pa: '',
					cnName: '',
					enName: '',
					slug: '',
					content: '',
					pName: '',
					pContent: '',
				},
				//弹窗宽度
				formLabelWidth: '120px',
				/* form-end */
				threeSign: 3, //第三窗口是否可见
				top: 0, //第二窗口是否可见
				input1: '', //搜索框内容
				infos: [],
				info: '',
				infoContents: [],
				paraphrases: [],
				paraphrase: "",
				paraphraseComments: [],
				//url: "http://127.0.0.1:7070/",
				url: "http://1.15.56.11:7070/",
				from: 0,
			};
		},
		computed: {
      value() {
        return this.$store.state.val
      },

      //通过token是否为空来决定按钮状态
			//jwt传回的token
			token() {
				return this.$store.state.token;
			},
			//通过token是否为空来决定按钮状态
			disabled() {
				return (this.$store.state.token == '')
			},
			levelone() {
				return this.$store.state.levelOne;
			},
			leveltwo() {
				return this.$store.state.levelTwo;
			}
		},

		watch: {
			$route() {
				this.top = 0;
				this.threeSign = 3;
				this.infos = [];
			}
		},
		methods: {
      ...mapMutations([
        'change', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
        'setRole',
        'setPermission',
        'setLevelOne',
        'setLevelTwo',
        'setVal',
      ]),
      tourl(url) {
        return url + this.value;
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
      },
			//清空弹窗可视化和弹窗内容
			cancelForm() {
				this.dialogFormVisible0 = false;
				this.dialogFormVisible1 = false;
				this.dialogFormVisible2 = false;
				this.dialogFormVisible3 = false;
				this.dialogFormVisible4 = false;
				this.form.detail = "";
				this.form.comment = "";
				this.form.pa = "";
				this.form.cnName = "";
				this.form.enName = "";
				this.form.slug = "";
				this.form.content = "";
				this.form.pName = "";
				this.form.pContent = "";
			},
			//提交新词条
			commitInfo() {
				axios.defaults.headers.common["token"] = this.token;
				let data = {
					"cnName": this.form.cnName,
					"enName": this.form.enName,
					"slug": this.form.slug,
					"content": this.form.content,
				};
				axios.post(this.url + 'info/add', data).then(response => {
					console.log(response.data);
				});
				this.cancelForm();
				this.dialogFormVisible3 = false; //操作完在关闭
			},
			//async 同步关键字 提交栏目信息
			async commitPContent() {
				axios.defaults.headers.common["token"] = this.token;
				let data = {
					"infoId": this.info.esId,
					"paraphraseTitle": this.form.pName,
					"paraphraseContent": this.form.pContent,
					"order": 1,
				};
				await axios.post(this.url + 'paraphrase/add', data).then(response => {
					console.log(response.data);
				});
				this.cancelForm();
				this.dialogFormVisible4 = false;
			},
			//等待栏目提交完成后在获取词条和栏目信息
			async CPC() {
				await this.commitPContent();
				this.getInfoContent(this.info);
			},
			//编辑栏目时，获取栏目原值赋予pa，获取栏目评论，把栏目存在同名属性下。
			getPa(paraphrase) {
				if (this.dialogFormVisible2 == false) {
					this.dialogFormVisible2 = true;
					this.paraphrase = paraphrase;
					this.form.pa = paraphrase.paraphraseContent;
					this.getParaphraseComment(paraphrase.paraphraseId);
					this.threeSign = 1;
				}
			},
			//提交栏目编辑
			async comitPa() {
				axios.defaults.headers.common["token"] = this.token;
				let data = {
					"paraphraseId": this.paraphrase.paraphraseId,
					"paraphraseContent": this.form.pa,
				};
				await axios.post(this.url + 'paraphrase/change', data).then(response => {
					console.log(response.data);
				});
				this.cancelForm();
			},
			//同步化，等待栏目编辑完成后，重新调用接口获取栏目。
			async regetPa() {
				await this.comitPa();
				this.getParaphrase(this.info);
				this.dialogFormVisible2 = false;
			},

			//提交概述
			async commitDetail() {
				axios.defaults.headers.common["token"] = this.token;
				let data = {
					"infoId": this.infoContents[0].infoId,
					"content": this.form.detail,
				};
				await axios.post(this.url + 'info-content/add', data).then(response => {
					console.log(response.data);
				});
				this.cancelForm();
			},
			async reGetDetail() {
				await this.commitDetail();
				this.dialogFormVisible0 = false;
				this.getInfoContent(this.info);
			},
			//提交评论
			async commitComment() {
				axios.defaults.headers.common["token"] = this.token;
				let data = {
					"paraphraseId": this.paraphrase.paraphraseId,
					"paraphraseComment": this.form.comment,
				};
				await axios.post(this.url + 'paraphrase-comment/add', data).then(response => {
					console.log(response.data);
				});
				this.cancelForm();
			},
			async reGetComment() {
				await this.commitComment();
				this.dialogFormVisible1 = false;
				this.changeParaphrase(this.paraphrase);
			},
			//测试
			test() {
				console.log("333");
			},
			//第三个窗口中关闭评论界面
			changeInfoContent(info) {
				this.getInfoContent(info);
			},
			//选定的栏目发生变化，评论也跟着发生变化
			changeParaphrase(paraphrase) {
				if (this.dialogFormVisible2 == false) {
					this.paraphrase = paraphrase;
					this.form.pa = paraphrase.paraphraseContent;
					this.getParaphraseComment(paraphrase.paraphraseId);

				}
			},
			reChangeParaphrase(paraphrase) {
				this.changeParaphrase(paraphrase)
			},
			//如果没有中文名，则以英文名作为词条标题
			name(info) {
				if (info.cnName === "") {
					return info.enName;
				} else {
					return info.cnName;
				}
			},
			//通过三个名字拼接词条名
			allName(info) {
				let name = "";
				if (info.cnName != "") {
					name = name.concat(info.cnName);
				}
				if (info.enName != "" && name != "") {
					name = name.concat("-", info.enName)
				} else if (info.enName != "" && name === "") {
					name = name.concat(info.enName);
				}
				if (info.slug != "" && name != "") {
					name = name.concat("-", info.slug)
				} else if (info.slug != "" && name === "") {
					name = name.concat(info.slug);
				}
				return name;
			},
			//滚动获取词条
			load() {
				this.size = this.size + 1;
				this.getOption();
			},
			//获取初始词条
			get() {
				this.size = 3;
				this.getOption();
				this.setVal(this.input1)
			},
			//获取词条概述
			async getInfoContent(info) {
				axios.defaults.headers.common["token"] = this.token;
				this.info = info;
				this.getParaphrase(info);
				await axios.post(this.url + 'info-content/get/' + info.esId).then(response => {
					this.infoContents = response.data
				});
				this.top = 1;
				this.threeSign = 0;
			},
			//获取栏目
			getParaphrase(info) {
				axios.defaults.headers.common["token"] = this.token;
				/* this.getInfoContent(info); */
				axios.get(this.url + 'paraphrase/get/' + info.esId).then(response => {
					this.paraphrases = response.data
				});
			},
			//获取栏目评论
			async getParaphraseComment(id) {
				axios.defaults.headers.common["token"] = this.token;
				await axios.get(this.url + 'paraphrase-comment/get/' + id).then(response => {
					this.paraphraseComments = response.data
				});
				this.threeSign = 1;

			},
			//获取词条
			getOption() { //根据选取的标签和搜索栏的数据进行查询
				axios.defaults.headers.common["token"] = this.token;
				if (this.input1 == '') {
					console.log("no");
				} else {
					axios.get(this.url + 'search/' + this.input1 + '/' + this.from + '/' + this.size).then(response => {
						this.infos = response.data
					});
				}
			}
		}
	}
</script>

<style scoped>
	.el-button:focus,
	.el-button:hover {
		color: #797979;
		border-color: #797979;
		background-color: #ecf5ff;
	}

	.sign>>>.button {
		margin: 0px;
		padding: 0px;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
	}


	/* layout 布局 */
	.sign>>>.el-row {
		margin: 0px;
		padding: 0px;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
	}

	.sign>>>.el-col {
		border-radius: 4px;
	}

	.sign>>>.bg-purple-dark {
		background: #99a9bf;
	}

	.sign>>>.bg-purple {
		background: #ffffff;
		overflow-y: scroll;
	}

	.sign>>>.bg-purple-three {
		background: #ffffff;
		overflow-y: scroll;
	}

	.sign>>>.bg-purple-light {
		background: #909399;
		overflow-y: scroll;
	}

	.sign>>>.grid-content {
		border-radius: 4px;
		height: 847px;
	}

	.sign>>>.row-bg {
		padding: 10px;
		background-color: #f9fafc;
	}

	.sign>>>.infinite-list {
		position: absolute;
		margin-top: 10px;
		padding: 0px;

		height: 840px;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		width: 460px;
	}

	.sign>>>.infinite-list-item {
		list-style-type: none;
		margin: 0px;
		padding: 0px;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}





	/*界面*/
	.sign>>>.el-header,
	.sign>>>.el-footer {
		position: absolute;
		left: 0px;
		right: 0px;
		height: 90px !important;
		background-color: #3d4243;
		color: #333;
		text-align: center;
		line-height: 20px;
	}

	.sign>>>.el-aside {
		display: block;
		position: absolute;
		left: 0;
		top: 90px;
		bottom: 0;
		background-color: #ffffff;
		color: #333;
		text-align: center;
		line-height: 75px;

	}

	.sign>>>.el-main {
		padding-left: 0px;
		padding-top: 0px;
		padding-right: 0px;
		padding-bottom: 0px;
		position: absolute;
		left: 0px;
		right: 0px;
		top: 90px;
		bottom: 0;
		/* overflow-y: scroll; */
		background-color: #ffffff;
		color: #333;
		overflow-y: hidden;
	}

	/* card */
	.sign>>>.text {
		font-size: 14px;
    /*word-wrap: break-word;
    word-break: normal;*/
    white-space: pre-wrap;
  }

	.sign>>>.item {
		margin: 4px;
	}

	.sign>>>.clearfix:before,
	.sign>>>.clearfix:after {
		display: table;
		content: "";
	}

	.sign>>>.clearfix:after {
		clear: both
	}

	.sign>>>.box-card {
		width: 740px;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 10px;

	}

	.sign>>>.box-card-three {
		width: 570px;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 10px;
	}


	.sign>>>.el-card__header {
		padding: 18px 20px;
		border-bottom: 1px solid #EBEEF5;
		box-sizing: border-box;
		text-align: left;
	}


	.sign>>>.el-card__body {
		padding: 0px !important;
	}


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

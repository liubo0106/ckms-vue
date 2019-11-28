<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="6" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
				{{isCollapse?'':sysName}}
				<i class="el-icon-s-shop" style="font-size: 24px;" v-if="isCollapse"/>
			</el-col>
			<el-col :span="6">
				<div class="tools" @click.prevent="collapse" style="color: #000000;">
					<i :class="isCollapse?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
				</div>
			</el-col>
			<el-col :span="12" class="userinfo">
				<div style="display: flex;justify-content: flex-end;">
	<!--				<div class="flower">
						<div class="flower-top">
							<div class="flower-top-before"></div>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
						</div>
						<div class="flower-head">
							<div class="flower-head-after"></div>
							<div class="flower-head-before"></div>
						</div>
					</div>
					<iframe width="420" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&color=%23FFFFFF&bdc=%23&icon=3&num=3&site=16"></iframe>-->
					<el-dropdown trigger="hover">
						<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item divided @click.native="updatePwd">修改密码</el-dropdown-item>
							<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="isCollapse?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu active-text-color="#ffffff" :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router :collapse="isCollapse"
						 background-color="#20222A" text-color="rgba(255,255,255,.7)"
				>
					<template v-for="(item,index) in menuList">
						<el-submenu :index="index+''" v-if="item.children &&item.children.length>0">
							<template slot="title"><i :class="item.icon"></i><span slot="title">{{item.name}}</span></template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.id">
								<span slot="title">{{child.name}}</span>
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-else :index="item.path">
							<i :class="item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section :class="isCollapse?'content-container2':'content-container'">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
				<!--<div class="footer">2019 &copy;版权归属 陕西淘丁实业集团有限公司</div>-->
			</section>
		</el-col>
		<el-dialog title="修改密码" :visible.sync="pwdDialogFormVisible" :show-close="type != 2" :close-on-click-modal="type != 2" width="30%">
			<el-form :model="pwdDialogForm" :rules="rules" ref="pwdDialogForm">
				<el-form-item label="旧密码" prop="oldPassword" :label-width="formLabelWidth">
					<el-input placeholder='请输入' type="password" v-model="pwdDialogForm.oldPassword" autocomplete="off" :maxlength="16"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop='newPassword' :label-width="formLabelWidth">
					<el-input placeholder='请输入' type="password" v-model="pwdDialogForm.newPassword" autocomplete="off" :maxlength="16"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop='newPassword2' :label-width="formLabelWidth">
					<el-input placeholder='请输入' type="password" v-model="pwdDialogForm.newPassword2" autocomplete="off" :maxlength="16"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="pwdDialogFormVisible = false" v-if="type != 2">取 消</el-button>
				<el-button type="primary" @click="pwdDialogSubmitForm('pwdDialogForm')" :loading="saveLoading">确 定</el-button>
			</div>
		</el-dialog>
	</el-row>
</template>
<script type="text/ecmascript-6">
	import { mapGetters,mapActions } from 'vuex'
	import { requestGetMenus, requestUpdatePwd, requestLogout,requestUrl,requesTunreadNoticeCount,} from '../api/api';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value !='') {
					if(value === '123456'){
						callback(new Error('新密码不能为123456'));
					}else{
						callback();
					}
				} else {
					callback(new Error('新密码不能为空'));
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入新密码'));
				} else if (value !== this.pwdDialogForm.newPassword) {
					callback(new Error('两次输入的新密码不一致!'));
				} else {
					callback();
				}
			};
            var customerName= "中央厨房管理系统"
            var flag= sessionStorage.getItem('flag')
			if(flag=="store"){
                customerName= sessionStorage.getItem('customerName')
			}
			return {
				msgCount:0,
				type:1,
				saveLoading:false,
				sysName:customerName,
				isCollapse:false,
				sysUserName: '',
				sysUserAvatar: './static/img/admin.png',
				pwdDialogForm: {
					oldPassword: '',
					newPassword: '',
					newPassword2: ''
				},
                param: {
                    pageNo:1,
                    pageSize:0,
                },
				formLabelWidth: '100px',
				menuList:null,
				pwdDialogFormVisible:false,
				rules: {
					oldPassword: [
						{ required: true, message: '请输入旧密码', trigger: 'blur' },
						{ min: 4, max: 16, message: '长度在 4 到 16 个字', trigger: 'blur' }
					],
					newPassword: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
						{ min: 4, max: 16, message: '长度在 4 到 16 个字', trigger: 'blur' },
						{ validator: validatePass, trigger: 'blur' }
					],
					newPassword2: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
						{ min: 4, max: 16, message: '长度在 4 到 16 个字', trigger: 'blur' },
						{ validator: validatePass2, trigger: 'blur' }
					]
				}
			}
		},
		computed: {
			/*// 使用对象展开运算符将 getters 混入 computed 对象中
			...mapGetters([
				'getMsgCount'
			])*/
		},
		methods: {
			handleopen() {

			},
			handleclose() {

			},
			handleselect: function (a, b) {

			},

			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					requestLogout({}).then(res => {
						sessionStorage.removeItem('user');
						_this.$router.push('/login');
					});
				}).catch(() => {

				});
			},
			updatePwd(){
				this.pwdDialogFormVisible = true;
				this.$nextTick(()=>{
					this.$refs['pwdDialogForm'].resetFields();
				});
			},
			pwdDialogSubmitForm(formName){
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.saveLoading = true;
						let editFormParam ={
							oldPassword: _this.pwdDialogForm.oldPassword,
							newPassword: _this.pwdDialogForm.newPassword
						};
						requestUpdatePwd(editFormParam).then(res => {
							if(res.status == 200){
								this.$message({
									type: 'success',
									message: '操作成功!',
									duration:300,
									onClose:function(){
										_this.pwdDialogFormVisible = false;
										_this.saveLoading = false;
										requestLogout({}).then(res => {
											sessionStorage.removeItem('user');
											_this.$router.push('/login');
										});
									}
								});
							}else{
								this.$message({
									type: 'error',
									message: res.msg,
									duration:3000,
									onClose:function(){
										_this.pwdDialogFormVisible = true;
										_this.saveLoading = false;
									}
								});
							}
						});
					} else {
						return false;
					}
				});
			},
			//折叠导航栏
			collapse:function(){
				this.isCollapse=!this.isCollapse;
			}
		},
		beforeMount() {

//			this.$store.dispatch('increment');
			let _this = this;
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatarUrl || './static/img/admin.png';
				if(user.needModifyPW == 'Y'){//是否需要修改密码
					this.type = 2;
					this.$alert('您当前登录密码是123456，请进行修改！', '提示', {
						type:'warning',
						confirmButtonText: '确定',
						showClose:false,
						callback: action => {
							_this.updatePwd();
						}
					});
				}
			}
			//获取权限菜单列表
			requestGetMenus({}).then(res => {
				let data = res.data;
				if (data) {
					_this.menuList = data;
				} else {
					this.$message({
						message: '请求异常',
						type: 'error'
					});
				}
			});

		}
	}
</script>
<style scoped lang="scss">
	@import "../common/style/common.css";

	.el-menu-item {
		background-color: rgba(0,0,0,.3)  !important;
		border-left:4px solid transparent !important;
	}
	.el-menu-item:hover{
		color: #fff !important;
		border-left: 4px solid #eaa315 !important;
	}

	.el-menu-item.is-active {
		color: #fff !important;
		background: #eaa315 !important;
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background-color: #ffffff !important;
			border-bottom: 1px solid #f1f1f1;
			color:#fff;
			.userinfo {
				.item{
					margin-right: 20px;
				}
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#000;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px;
						float: left;
					}
				}
			}
			.logo {
				width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px -10px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:229px;
				background-color: #20222a;

			}
			.logo-collapse-width{
				width:60px;
				background-color: #20222a;
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.el-menu::-webkit-scrollbar{
			display: none;
		}
		.el-menu{
			overflow-y: hidden;
		}

		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				position: absolute;
				top: 0px;
				bottom: 0px;
				.el-menu{
					background-color: #ffffff;
					height: 100%;
					overflow-y:scroll ;

				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}

			.content-container,.content-container2 {
				background: #f1f2f7;
				flex:1;
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 230px;
				overflow: scroll;
				.breadcrumb-container {
					margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #f1f2f7;
					box-sizing: border-box;
				}
			}
			.content-container2{
				left: 60px;
			}

		}
	}
	.footer{
		font-size: 12px;
		position: fixed;
		right: 10px;
		bottom: 0;
		height: 20px;
		line-height: 20px;
		padding: 0 15px;
		color: #C0C4CC;
	}
	.flower{
		width:30px;
		height:60px;
		top:0;
		left:22px;
		-webkit-animation:rock 3s ease-in infinite;
		animation:rock 3s ease-in infinite;
		padding-right: 20px
	}
	.flower>div{position:absolute}
	.flower-top{
		position: absolute;
		left:0;
		width:30px;
		height:30px;
		z-index:2
	}
	.flower-top-before{
		position:absolute;
		width:8px;
		height: 8px;
		background-color:#fae134;
		border-radius:8px;
		top:50%;
		left:50%;
		margin:-4px 0 0 -4px;
		z-index:2
	}
	.flower-top p{
		position:absolute;
		top:50%;
		margin-top:-2px;
		width: 30px;
		height: 5px;
		background-color:#fff;
		border-radius:6px
	}
	.flower-top p:nth-child(2){transform:rotate(45deg);transform-origin:50% 50%}
	.flower-top p:nth-child(3){transform:rotate(90deg);transform-origin:50% 50%}
	.flower-top p:nth-child(4){transform:rotate(135deg);transform-origin:50% 50%}
	.flower-head{
		position: absolute;
		bottom:0;
		left:8px;
		width: 15px;
		height: 45px;
		border:3px solid #60ae34;
		border-radius:100% 0 0 100%/50%;
		border-right:none
	}
	.flower-head-after{
		position: absolute;
		bottom: 14px;
		left: -11px;
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 0 solid transparent;
		border-bottom: 12px solid #60ae34;
		transform: skewX(45deg);
	}
	.flower-head-before{
		position: absolute;
		bottom:20px;
		left:0;
		width:0;
		height:0;
		border-left:5px solid transparent;
		border-right:0 solid transparent;
		border-bottom:6px solid #60ae34;
		transform:skewX(-45deg)
	}
	@-webkit-keyframes rock{
		0%{transform:rotate(-5deg) translate3d(0,0,0)}
		50%{transform:rotate(5deg) translate3d(30%,0,0)}
		100%{transform:rotate(-5deg) translate3d(0,0,0)}
	}
	@keyframes rock{
		0%{transform:rotate(-5deg) translate3d(0,0,0)}
		50%{transform:rotate(5deg) translate3d(30%,0,0)}
		100%{transform:rotate(-5deg) translate3d(0,0,0)}
	}

	.inner-container::-webkit-scrollbar {
		display: none;
	}
</style>

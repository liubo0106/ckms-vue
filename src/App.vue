<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
::-webkit-scrollbar
{
	width: 6px;
	height: 6px;
	background-color: rgba(0,193,118,0.1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	background-color: rgba(0,193,118,0.1);
	border-radius: 10px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #ffa880;
}
//输入框获得焦点变红
.el-input.is-active .el-input__inner, .el-input__inner:focus{
	border-color:#4a5c94!important;
}
//分页样式
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
	border-radius: 100%!important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: #ffa880!important;
}
//全区tab框切换颜色
.el-tabs__item.is-active{
	color:#ffa880!important;
}
//全区tab框切换颜色
.el-tabs__active-bar{
	background-color: #ffa880!important;
}
.el-tabs__item:hover{
	color:#ffa880!important;
}
</style>

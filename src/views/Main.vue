<template>
	<section>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		</el-breadcrumb>
		<!--<div class="contentBody">
			<img src="../../static/img/logo@2x.png" style="width: 240px;height: 158px"/>
			<iframe width="800" scrolling="no" height="120" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=19&color=%23FFC000&bdc=%23&icon=3&py=changan&temp=1&num=5&site=16"></iframe>
		</div>-->
	</section>
</template>
<script type="text/ecmascript-6">
	export default {
		name: 'main-manage',
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>
<style scoped lang="scss">
	.el-breadcrumb{
		line-height: 4;
		padding-left: 20px;
		background-color: #ffffff;
	}
	.contentBody{
		margin: 20px;
		background-color: #ffffff;
		padding: 20px;
		.el-pagination{
			padding-top: 10px;
		}
		.self-time {
			position: absolute;
			right: 0;
			left: 0;
			margin: auto;
			top: 2px;
			z-index: 900;
		}
		.contentBottom{
			margin: 20px;
			background-color: #ffffff;
			.el-row{
				text-align: center;
				margin-bottom: 20px;
				.sizeF{
					font-size: 22px;
					font-weight: 900;
				}
			}
		}
		.year{
			position: absolute;
			right: 41px;
			top: 109px;
			color: rgb(252, 151, 175);
			font-weight: 900;
			font-size: 20px;
		}
	}
</style>
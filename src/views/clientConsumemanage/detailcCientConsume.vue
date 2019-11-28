<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/storeOrde' }">顾客消费情况管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody" style="padding-bottom: 0px;">
            <el-form inline label-width="100px" class="demo-ruleForm">
                <el-form-item label="桌号">
                    <i class="largeFont">{{orderDetail.deskNo}}</i>
                </el-form-item>
                <el-form-item label="订餐人数">
                    <i class="largeFont">{{orderDetail.people}}</i>
                </el-form-item>
                <el-form-item label="订单状态">
                    <i class="largeFont">{{orderDetail.statusName}}</i>
                </el-form-item>
                <el-form-item  label="应收金额">
                    <i class="largeFont">{{orderDetail.recPrice}}</i>（元）
                </el-form-item>
                <el-form-item  label="消费总额">
                    <i class="largeFont">{{orderDetail.totalPrice}}</i>（元）
                </el-form-item>
                <el-form-item  label="折扣">
                    <i class="largeFont">{{orderDetail.discount}}</i>
                </el-form-item>

                <el-form-item  label="实收金额">
                    <i class="largeFont">{{orderDetail.discountPrice}}</i>（元）
                </el-form-item>
                <el-form-item  label="下单时间">
                    <i class="largeFont">{{orderDetail.dateTime}}</i>
                </el-form-item>
                <el-form-item  label="备注:">
                    <i class="largeFont">{{orderDetail.remark}}</i>
                </el-form-item>
            </el-form>
        </div>
        <div class="contentBody">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="" label-width="0px">
                    <el-table :data="orderDetail.detailList" stripe>
                      <!--  <el-table-column label="商品图" prop="type" align="center" header-align='center' >
                            <el-form-item slot-scope="scope">
                                <el-image
                                        style="width: 100px; height: 100px"
                                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                        fit="fill"></el-image>
                            </el-form-item>
                        </el-table-column>-->
                      <!--  <el-table-column label="商品图" prop="pictureUrl" align="center" header-align='center' >
                            <template slot-scope="scope">
                                <el-image
                                        style="width: 20px; height: 20px"
                                        :src="scope.row.pictureUrl"
                                        fit="fill"></el-image>
                            </template>
                        </el-table-column>-->
                        <el-table-column label="名称" prop="name" align="center" header-align='center'></el-table-column>
                        <el-table-column label="数量" prop="number" align="center" header-align='center'></el-table-column>
                        <el-table-column label="口味" prop="flavor" align="center" header-align='center'></el-table-column>
                        <el-table-column label="单价(元)" prop="price" align="center" header-align='center'></el-table-column>
                        <el-table-column label="总计(元)" prop="subtotal" align="center" header-align='center'></el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button round @click="goBack()">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestStoreOrdeInfo} from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            return {
                orderId:sessionStorage.getItem('soId'),
                orderDetail:{}
            }
        },
        methods: {
            getAjaxDetail(){
                let _this = this;
                requestStoreOrdeInfo({id:_this.orderId}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            this.orderDetail = data;
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            goBack() {
                this.$router.push({ path: '/clientConsumemanage' });
            }
        },
        beforeMount() {
            if(this.orderId){
                this.getAjaxDetail();
            }
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
        .el-aside{
            width: auto;
            height: 700px;
        }
    }
    .self-select-width{
        width: 100%;
    }
    .self-cascader-width{
        width: 50%;
    }
    .largeFont{
        color: #ffa880;
        font-size: 24px;
    }
</style>
<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/memberConsumeManage' }">顾客消费情况管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody" >
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="deskNo" label="桌号" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="people" label="用餐人数" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="recPrice" label="应收金额" width="60" >
                    <template slot-scope="scope">
                        {{scope.row.recPrice == null ? '' :scope.row.recPrice.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="totalPrice" label="消费总额" width="60" >
                    <template slot-scope="scope">
                        {{scope.row.totalPrice == null ? '' :scope.row.totalPrice.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="discount" label="折扣" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="discountPrice" label="实收金额" width="60">
                    <template slot-scope="scope">
                        {{scope.row.discountPrice == null ? '' :scope.row.discountPrice.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="customerName" label="门店" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createTime" label="订单日期" width="160"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button  size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">详情</el-button>
                        <!--<el-button v-if='scope.row.status == 0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button v-if='scope.row.status == 0' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-form inline label-width="100px" class="demo-ruleForm">
                <el-form-item label="备注:" style=" display: flex;justify-content: flex-start;">
                    <i class="remark_i">{{remark}}</i>
                </el-form-item>
            </el-form>
        </div>
        <div class="contentBody">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="" label-width="0px">
                    <el-table :data="orderDetail.detailList" stripe>

                        <!--<el-table-column label="商品图" prop="pictureUrl" align="center" header-align='center' >-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-image-->
                                        <!--style="width: 20px; height: 20px"-->
                                        <!--:src="scope.row.pictureUrl"-->
                                        <!--fit="fill"></el-image>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
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
    import {requestDetailMemberRecord, requestStoreOrdeInfo} from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            return {
                orderId:sessionStorage.getItem('mcId'),
                orderDetail:{},
                detailList:[],
                tableData: null,
                param: {
                    content:"",
                    pageNo:1,
                    pageSize:15,
                },
                remark:'',
                param2: {
                    id:''
                },
                //totalNum:0
            }
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            /*handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },*/
            //请求顾客消费记录
            getAjaxDetail(){
                let _this = this;
                console.log(123);
                requestDetailMemberRecord({id:_this.orderId}).then((res) => {
                    console.log(res);
                    if(res.status == 200){
                        _this.remark=res.data.remark;
                        let data = res.data.orders;
                        if(data && data.length>0){
                            _this.tableData = data;


                           // _this.totalNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData = [];
                            //_this.totalNum = 0;
                        }

                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //请求顾客消费记录明细
            handleClick(index,row){
                let _this = this;
                _this.param2.id = row.id;
                this.getAjaxDetailInfo();

            },
            getAjaxDetailInfo(){
                let _this = this;
                requestStoreOrdeInfo(_this.param2).then(res => {
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
                this.$router.push({ path: '/memberConsumeManage' });
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
    .remark_i{
        color: #666;
        font-size: 16px;
        font-style: normal;
    }
</style>

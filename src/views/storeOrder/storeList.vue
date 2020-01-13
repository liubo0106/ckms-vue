<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/storeOrde' }">顾客订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>顾客订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="deskNo" label="桌号" width="80">
                    <template slot-scope="scope">
                        {{scope.row.deskNo}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="orderNo" label="订单号"></el-table-column>
                <el-table-column align="center" header-align='center' prop="statusName" label="订单状态" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' prop="people" label="用餐人数" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="totalPrice" label="总额(元)"></el-table-column>
                <el-table-column align="center" header-align='center' prop="dateTime" label="下单时间" width="180"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="120"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="360">
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">查看</el-button>
                       <!-- <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if="scope.row.status != 2"  size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>-->
                        <el-button icon="el-icon-success" style="background-color: #6faffd;color: #fff;border: none;" v-if="scope.row.status == 0" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>
<!--                        <el-button icon="el-icon-sold-out" style="background-color: #847ffe;color: #fff;border: none;" v-if="scope.row.status == 1" size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'pay')">结账</el-button>-->
                        <el-button icon="el-icon-printer" style="background-color: #28db67;color: #fff;border: none;" size="mini" type="success" @click="handleClick(scope.$index, scope.row, 'print')">出票</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="param.pageNo"
                    :page-sizes="[15, 30, 45, 60]"
                    :page-size="param.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        requestDeleteStoreOrde,
        requestPrintBill,
        requestSearchStoreOrde,
        requestStatusStoreOrde,
        requestUrl
    } from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId');
            if(customerId=="null"){
                customerId=''
            }
            return {
                loading: false,
                searchForm: {
                    status: '',
                    endDate:'',
                    beginDate:'',
                    orderNo:'',
                    deskNo:'',
                    customerId:customerId
                },
                tableData: null,
                param: {
                    status:"",
                    endDate:'',
                    beginDate:'',
                    orderNo:'',
                    deskNo:'',
                    pageNo:1,
                    pageSize:15,
                    customerId:'',
                },
                totalNum:0,
                saveLoadingId:''
            }
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchStoreOrde(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                    }else{
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                });
            },
            //报表导出
            exportClick(){

                location.href = requestUrl+'export/storeOrderReport?customerId='+this.searchForm.customerId+
                                                                                                                '&orderNo='+this.searchForm.orderNo+
                                                                                                                '&deskNo='+this.searchForm.deskNo+
                                                                                                                '&status='+this.searchForm.status+
                                                                                                                '&beginDate='+this.searchForm.beginDate+
                                                                                                                '&endDate='+this.searchForm.endDate

            },
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'ok'){
                    this.$confirm('真的确认该订单么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id,
                            status:1
                        };
                        requestStatusStoreOrde(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.param.pageNo =1;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(doType == 'pay'){
                    this.$confirm('真的确认该订单已结账, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id,
                            status:2
                        };
                        requestStatusStoreOrde(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.param.pageNo =1;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(doType == 'detail'){
                    sessionStorage.setItem('soId',row.id);
                    sessionStorage.setItem('type',0);
                    this.$router.push({ path: '/detailStoreOrde'});
                }else if(doType == 'delete'){
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteStoreOrde(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.param.pageNo =1;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'print'){
                    _this.saveLoadingId = row.id;
                    requestPrintBill({id:row.id}).then(res => {
                        if (res.status == 200) {
                            _this.saveLoadingId = '';
                        } else {
                            _this.saveLoadingId = '';
                            _this.$message({
                                message: '请求异常',
                                duration:'2000',
                                type: 'error'
                            });
                        }
                    });
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.status = this.searchForm.status;
                this.param.beginDate = this.searchForm.beginDate;
                this.param.endDate = this.searchForm.endDate;
                this.param.orderNo = this.searchForm.orderNo;
                this.param.deskNo = this.searchForm.deskNo;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                this.param.customerId=sessionStorage.getItem('customerId');
                this.param.orderNo=sessionStorage.getItem('soId');
                requestSearchStoreOrde(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                    }else{
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                });
            }
        },
        beforeMount() {
            sessionStorage.removeItem('userId');
            this.getAjaxList();
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
</style>

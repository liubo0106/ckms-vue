<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>顾客消费情况管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :inline="true" :model="searchForm" label-width="110px" class="demo-form-inline" label-position="left">
                <el-row :gutter="24" style="padding-left: 15px;">
                    <el-form-item label="订单号">
                        <el-input v-model="searchForm.orderNo" :maxlength="200" autocomplete="off" placeholder="请输入" clearable style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="桌号">
                        <el-input placeholder='请输入桌号' v-model="searchForm.deskNo" :maxlength="50" style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="搜索状态">
                        <el-select v-model="searchForm.status" placeholder="请选择" clearable style="width: 220px;">
                            <el-option label="待确认" value="0"></el-option>
                            <el-option label="已确认" value="1"></el-option>
                            <el-option label="已结账" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单日期-开始">
                        <el-date-picker
                                clearable
                                v-model="searchForm.beginDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单日期-结束">
                        <el-date-picker
                                clearable
                                v-model="searchForm.endDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="0">
                        <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                        <!--<el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>-->
                        <el-button type="primary" @click="exportClick()">导出</el-button>
                    </el-form-item>

                </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="orderNo" label="订单号" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="deskNo" label="桌号" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="people" label="用餐人数" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' prop="dateTime" label="订单日期" width="160"></el-table-column>
                <el-table-column align="center" header-align='center' prop="recPrice" label="应收金额"></el-table-column>
                <el-table-column align="center" header-align='center' prop="totalPrice" label="消费金额"></el-table-column>
                <el-table-column align="center" header-align='center' prop="discount" label="折扣" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="discountPrice" label="实收金额"></el-table-column>
                <el-table-column align="center" header-align='center' prop="statusName" label="订单状态" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="paymentStatusName" label="付款状态">
                    <!--<template slot-scope="scope">-->
                        <!--<span v-if="scope.row.paymentStatus == 0">待付款</span>-->
                        <!--<span v-if="scope.row.paymentStatus == 1">顾客支付</span>-->
                        <!--<span v-if="scope.row.paymentStatus == 2">门店支付</span>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="120"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="95">
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document"  size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">查看</el-button>
                        <!--<el-button v-if='scope.row.status == 0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button v-if='scope.row.status == 0' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>-->
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
    import {requestSearchStoreOrde, requestUrl} from '../../api/api'; //requestSearchSupplier
    export default {
        name: 'user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId');
            if(customerId=="null"){
                customerId=''
            }
            return {
                searchForm: {
                    status: '',
                    orderNo: '',
                    beginDate: '',
                    endDate: '',
                    deskNo:'',
                    customerId:customerId
                },
                tableData: null,
                param: {
                    content:"",
                    pageNo:1,
                    pageSize:15,
                },
                totalNum:0
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
                /*requestClientExport({customerId:this.searchForm.customerId,
                    orderNo:this.searchForm.orderNo,
                    deskNo:this.searchForm.deskNo,
                    status:this.searchForm.status,
                    beginDate:this.searchForm.beginDate,
                    endDate:this.searchForm.endDate,}).then(res => {
                    this.$message({
                        type: 'success',
                        message: '导出成功!',
                        duration:300,
                        onClose:function(){
                            _this.param.pageNo =1;
                            _this.getAjaxList();
                        }
                    });
                });*/
            },
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteSupplier(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
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
                }else if(doType == 'add'){
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editSupplier'});
                }else if(doType == 'detail'){
                    sessionStorage.setItem('soId',row.id);
                    this.$router.push({ path: '/detailcCientConsume'});
                }if(doType == 'ok'){
                    this.$confirm('是否确认该顾客订单?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestSupplier(sParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
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
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.status = this.searchForm.status;
                this.param.orderNo = this.searchForm.orderNo;
                this.param.beginDate = this.searchForm.beginDate;
                this.param.endDate = this.searchForm.endDate;
                this.param.deskNo = this.searchForm.deskNo;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
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
<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>顾客消费情况管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :inline="true" :model="searchForm" label-width="110px" class="demo-form-inline" label-position="left">
                <el-form-item label="姓名/电话">
                    <el-input v-model="searchForm.content" :maxlength="200" autocomplete="off" placeholder="姓名/电话" clearable></el-input>
                </el-form-item>
                <el-form-item label="订单日期-开始">
                    <el-date-picker
                            clearable
                            v-model="searchForm.beginDate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单日期-结束">
                    <el-date-picker
                            clearable
                            v-model="searchForm.endDate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="订单日期-开始">
                    <el-input v-model="searchForm.beginDate" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="订单日期-结束">
                    <el-input v-model="searchForm.endDate" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>-->
                <el-form-item label="顾客类型">
                    <el-select v-model="searchForm.type" placeholder="请选择" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="会员" value="2"></el-option>
                        <el-option label="普通顾客" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button @click.native.prevent="onSearch" native-type="submit">查询</el-button>
                    <el-button type="primary" @click="handleClick('', '', 'export')">导出</el-button>
                   <!-- <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>-->
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="姓名" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="phone" label="电话" width="120"></el-table-column>
                <el-table-column align="center" header-align='center' prop="deskNo" label="桌号" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="people" label="用餐人数" width="60"></el-table-column>
                <el-table-column align="center" header-align="center" prop="deductionAcount" label="积分抵扣">
                    <template slot-scope="scope">
                      {{scope.row.deductionAcount == null ? 0:scope.row.deductionAcount.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="couponMoney" label="优惠卷抵扣">
                    <template slot-scope="scope">
                      {{scope.row.couponMoney == null ? 0 :scope.row.couponMoney.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="recPrice" label="应收金额" width="60" >
                    <template slot-scope="scope">
                      {{scope.row.recPrice == null ? '' :scope.row.recPrice.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="totalPrice" label="消费金额" width="60" >
                    <template slot-scope="scope">
                        {{scope.row.totalPrice == null ? '' :scope.row.totalPrice.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="discount" label="折扣" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="fraction" label="抹零" width="60"></el-table-column>
                <el-table-column align="center" header-align='center' prop="discountPrice" label="实收金额" width="60">
                    <template slot-scope="scope">
                        {{scope.row.discountPrice == null ? '' :scope.row.discountPrice.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="customerName" label="门店" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="createTime"  width="160" label="订单日期" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button  style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" size="mini" @click="handleClick(scope.$index, scope.row, 'detail')" >查看</el-button>
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
    import {requestSearchMemberRecord, requestUrl} from '../../api/api'; //requestSearchSupplier
    export default {
        name: 'user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId');
            if(customerId=="null"){
                customerId=''
            }

            return {
                searchForm: {
                    content: '',
                    beginDate: '',
                    endDate: '',
                    customerId:customerId,
                    type:''
                },
                tableData: null,
                param: {
                    customerId:customerId,
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
                requestSearchMemberRecord(_this.param).then(res => {
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
                }else if(doType == 'detail'){
                    sessionStorage.setItem('mcId',row.id);
                    this.$router.push({ path: '/detailcMemberConsume'});
                }else if(doType == 'ok'){
                    this.$confirm('是否确认该客户订单?', '提示', {
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
                }else if(doType == 'export'){
                    location.href = requestUrl+'export/storeCheckoutReport?customerId='+this.searchForm.customerId+
                        '&content='+this.searchForm.content+
                        '&type='+this.searchForm.type+
                        '&beginDate='+this.searchForm.beginDate+
                        '&endDate='+this.searchForm.endDate
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.content = this.searchForm.content;
                this.param.type = this.searchForm.type;
                this.param.beginDate = this.searchForm.beginDate;
                this.param.endDate = this.searchForm.endDate;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchMemberRecord(_this.param).then(res => {
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
            sessionStorage.removeItem('mcId');
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
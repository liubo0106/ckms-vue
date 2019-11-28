<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店下单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :inline="true" :model="searchForm" label-width="110px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="订单号">
                            <el-input v-model="searchForm.orderNo" :maxlength="200" autocomplete="off" placeholder="请输入" clearable style="width: 220px;"></el-input>
                        </el-form-item>
                        <el-form-item label="订单名称">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable style="width: 220px;"></el-input>
                        </el-form-item>
                        <el-form-item label="搜索状态">
                            <el-select v-model="searchForm.status" placeholder="请选择活动区域" style="width: 220px;">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="草稿" value="0"></el-option>
                                <el-option label="已确认" value="1"></el-option>
                                <el-option label="已出库" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10.5">
                        <el-form-item label="下单日期-开始">
                            <el-date-picker
                                    clearable
                                    v-model="searchForm.beginDate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="下单日期-结束">
                            <el-date-picker
                                    clearable
                                    v-model="searchForm.endDate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="padding-left: 30px;">
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="orderNo" label="订单号" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="订单名称" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="customerName" label="门店"></el-table-column>
                <el-table-column align="center" header-align='center' prop="dateTime" label="下单日期" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="totalNumber" label="总量" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="totalPrice" label="总价" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalPrice |substr}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="statusName" label="状态" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="120"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">查看</el-button>
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" v-if='scope.row.status == 0' size="mini" type="primary" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.status == 0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button icon="el-icon-success" style="background-color: #6faffd;color: #fff;border: none;" v-if='scope.row.status == 0' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>
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
    import { requestSalesOrderPage, requestDeleteSalesOrder,requestSalesOrder,requestCheckStock} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    name: '',
                    orderNo:'',
                    beginDate:'',
                    endDate:'',
                    status:'',
                },
                tableData: null,
                param: {
                    name:"",
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
            timeData:function(data){
                var str=data.split('-');
                var y=str[0];
                if(str[1].length<2){
                    var m=`0${str[1]}`
                }else{
                    var m=`${str[1]}`
                }
                if(str[2].length<2){
                    var d=`0${str[2]}`
                }else{
                    var d=`${str[2]}`
                }
                return `${y}-${m}-${d}`

            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSalesOrderPage(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                    }else{
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                    for(let i=0;i<_this.tableData.length;i++){
                        _this.tableData[i].dateTime=_this.timeData(_this.tableData[i].dateTime)
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
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteSalesOrder(deleteParam).then(res => {
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
                }else if(doType == 'add'){
                    sessionStorage.setItem('sId', '');
                    this.$router.push({ path: '/editSalesOrder'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('sId', row.id);
                    this.$router.push({ path: '/editSalesOrder'});
                }else if(doType == 'detail'){
                    sessionStorage.setItem('sId', row.id);
                    this.$router.push({ path: '/detailSalesOrder'});
                }if(doType == 'ok'){

                    let cParam ={
                        id: row.id,

                    };
                    let sParam ={
                        id: row.id,
                        status:1
                    };
                    requestCheckStock(cParam).then(res => {
                        this.loading=true;
                       if(res.status==200){
                           requestSalesOrder(sParam).then(res => {
                               this.$message({
                                   type: 'success',
                                   message: '操作成功!',
                                   duration:2000,
                                   onClose:function(){
                                       _this.loading=false;
                                       _this.param.pageNo =1;
                                       _this.getAjaxList();
                                   }
                               });
                           });
                       }else{

                           if(res.status==600){
                               this.$message({
                                   type:'error',
                                   message:res.data[0],
                               })
                               _this.loading=false;
                           }else{
                               this.$confirm(res.data+',是否继续确认下单？', '提示', {
                                   confirmButtonText: '确定',
                                   cancelButtonText: '取消',
                                   type: 'warning'
                               }).then(() => {
                                   this.loading=true;
                                   requestSalesOrder(sParam).then(res => {
                                       this.$message({
                                           type: 'success',
                                           message: '操作成功!',
                                           duration:2000,
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
                                   _this.loading=false;
                               });
                           }

                       }

                    });




                    /*this.$confirm('是否确认下单?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestSalesOrder(sParam).then(res => {
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
                    });*/
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.name = this.searchForm.name;
                this.param.orderNo = this.searchForm.orderNo;
                this.param.beginDate = this.searchForm.beginDate;
                this.param.endDate = this.searchForm.endDate;
                this.param.status = this.searchForm.status;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSalesOrderPage(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                    }else{
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                    for(let i=0;i<_this.tableData.length;i++){
                        _this.tableData[i].dateTime=_this.timeData(_this.tableData[i].dateTime)
                    }
                });
            }
        },
        filters:{
            substr:function (value) {
                return Math.floor(value * 100) / 100;
            }
        },
        beforeMount() {
            sessionStorage.removeItem('sId');
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

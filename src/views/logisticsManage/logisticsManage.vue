<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>物流车辆信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :model="searchForm" :inline="true" label-width="40px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="搜索">
                            <el-input v-model="searchForm.username" :maxlength="200" style="width:400px" autocomplete="off" placeholder="车牌号/联系人/电话/公司名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="状态" prop="type" >
                            <el-select v-model="searchForm.type" placeholder="请选择">
                                <el-option  label="全部" value="">全部</el-option>
                                <el-option  label="停用" value="0">停用</el-option>
                                <el-option label="启用" value="1">启用</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="plateNumber" label="车牌号" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="contact" label="联系人" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="phone" label="电话" width="110"></el-table-column>
                <el-table-column align="center" header-align='center' prop="company" label="公司名称" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="statusName" label="状态" width="70"></el-table-column>
                <el-table-column align="center" header-align='center' prop="isDeleteName" label="是否启用" width="120">
                    <template slot-scope="scope">
                        <span :class="{'active': scope.row.isDelete=='0'}">{{scope.row.isDeleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="265">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" v-if='scope.row.status == 1 || scope.row.status == 0' size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.isDelete==1' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">停用</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.isDelete==0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'start')">启用</el-button>
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
    import {requestDeleteLogistics, requestLogistics, requestSearchLogistics,requestisEnabledLogistics} from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    username: '',
                    type:''
                },
                tableData: null,
                param: {
                    content:"",
                    pageNo:1,
                    pageSize:15,
                    isDelete:'',
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
                requestSearchLogistics(_this.param).then(res => {
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
            handleCurrentChange(){

            },
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    this.$confirm('真的停用该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id,
                            isDelete:0,
                        };
                        requestisEnabledLogistics(deleteParam).then(res => {
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
                }else if(doType=='start'){
                    let deleteParam ={
                        id: row.id,
                        isDelete:1,
                    };
                    requestisEnabledLogistics(deleteParam).then(res => {
                        this.$message({
                            type: 'success',
                            message: '启用成功',
                            duration:1000,
                            onClose:function(){
                                _this.loading=false;
                                _this.param.pageNo =1;
                                _this.getAjaxList();
                            }
                        });
                    });

                }else if(doType == 'add'){
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editLogistics'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editLogistics'});
                }if(doType == 'ok'){
                    this.$confirm('是否确认物流信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestLogistics(sParam).then(res => {
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
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.content = this.searchForm.username;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                this.param.isDelete=this.searchForm.type;
                requestSearchLogistics(_this.param).then(res => {
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
    .active{
        color: red !important;
    }
</style>

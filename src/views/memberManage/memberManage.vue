<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :model="searchForm" label-width="45px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="搜索">
                            <el-input v-model="searchForm.username" :maxlength="200" autocomplete="off" placeholder="姓名/电话" clearable></el-input>
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
                <el-table-column align="center" header-align='center' prop="name" label="姓名" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="phone" label="电话" width="110"></el-table-column>
                <el-table-column align="center" header-align='center' prop="amount" label="金额" width="110">
                    <template slot-scope="scope">
                        {{scope.row.amount == null ? '' :scope.row.amount.toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="discount" label="折扣" width="110"></el-table-column>
                <!--<el-table-column align="center" header-align='center' prop="level" label="等级" width="110"></el-table-column>-->
                <el-table-column align="center" header-align='center' prop="customerName" label="门店" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="wechat" label="微信号" width="140"></el-table-column>>
                <el-table-column align="center" header-align='center' prop="statusName" label="状态" width="70"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="70"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="265">
                    <template slot-scope="scope" >
                        <!--<el-button size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">详情</el-button>-->
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" v-if='scope.row.status == 0 || scope.row.status == 1' size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
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
    import {requestDeleteMember, requestMember, requestSearchMember} from '../../api/api'; //requestSearchSupplier
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    username: ''
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
                requestSearchMember(_this.param).then(res => {
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
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteMember(deleteParam).then(res => {
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
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editMember'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editMember'});
                }/*else if(doType == 'detail'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/detailSupplier'});
                }*/if(doType == 'ok'){
                    this.$confirm('是否确认该会员信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestMember(sParam).then(res => {
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
                requestSearchMember(_this.param).then(res => {
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
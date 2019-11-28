<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店桌号管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :model="searchForm" label-width="50px" inline label-position="left">
                <el-form-item label="搜索">
                    <el-input v-model="searchForm.username" style="width: 400px" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search"  @click.native.prevent="onSearch" native-type="submit">查询</el-button>
                    <el-button icon="el-icon-plus" type="primary" @click="handleClick('', '', 'add')">添加</el-button>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button @click="handleClick('', '', 'allQRcode')" type="warning">批量生成二维码</el-button>
                    <el-button @click="handleClick('', '', 'allExport')" type="success">导出二维码</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange" v-loading="tableLoading">
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="deskNo" label="桌号" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' label="二维码">
                    <template slot-scope="scope">
                        <el-image
                                v-if="scope.row.qrcodeUrl"
                                style="width: 150px; height: 150px"
                                :src="scope.row.qrcodeUrl"
                                fit="fit"></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="isOpenName" label="是否开放" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit"  size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button icon="el-icon-menu" size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'qrcode')">生成二维码</el-button>
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
    import {requestDeleteDesk, requestGenerateQRCode, requestSearchDesk, requestUrl} from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            var customerId= sessionStorage.getItem('customerId')
            return {
                loading: false,
                tableLoading:false,
                searchForm: {
                    username: ''
                },
                tableData: null,
                param: {
                    pageNo:1,
                    pageSize:15,
                    customerId:customerId,//门店ID
                },
                totalNum:0,
                multipleSelection:[]
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchDesk(_this.param).then(res => {
                    _this.tableLoading = false;
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
                        requestDeleteDesk(deleteParam).then(res => {
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
                    this.$router.push({ path: '/editStoreDesk'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editStoreDesk'});
                }else if(doType == 'qrcode'){
                    requestGenerateQRCode({ids:row.id}).then(res => {
                        if(res.status == 200){
                            this.$message({
                                type: 'success',
                                message: '生成成功!',
                                duration:300,
                                onClose:function(){
                                    _this.param.pageNo =1;
                                    _this.getAjaxList();
                                }
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '生成失败'
                            });
                        }
                    });
                }else if(doType == 'allQRcode'){
                    if (this.multipleSelection && this.multipleSelection.length > 0) {
                        let ids = [];
                        this.multipleSelection.forEach((item)=> {
                            ids.push(item.id);
                        });
                        if (ids && ids.length > 0) {
                            this.$confirm('批量生成二维码, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                _this.tableLoading = true;
                                let deleteParam = {
                                    ids: ids.toString()
                                };
                                requestGenerateQRCode(deleteParam).then(res => {
                                    if(res.status == 200){
                                        this.$message({
                                            type: 'success',
                                            message: '生成成功!',
                                            duration:300,
                                            onClose:function(){
                                                _this.param.pageNo =1;
                                                _this.getAjaxList();
                                            }
                                        });
                                    }else{
                                        _this.tableLoading = false;
                                        this.$message({
                                            type: 'error',
                                            message: '生成失败'
                                        });
                                    }
                                });
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                });
                            });
                        }
                    } else {
                        this.$message({
                            type: 'info',
                            message: '请至少选择一项！'
                        });
                    }
                }else if(doType == 'allExport'){
                    location.href = requestUrl+'export/downloadQrcode?customerId='+this.param.customerId;
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
                requestSearchDesk(_this.param).then(res => {
                    _this.tableLoading = false;
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
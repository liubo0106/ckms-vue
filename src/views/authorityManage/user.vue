<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="searchForm" label-width="60px" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="用户名">
                            <el-input v-model="searchForm.username" :maxlength="200" autocomplete="off" placeholder="用户名" clearable></el-input>
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
                <el-table-column align="center" header-align='center' prop="username" label="用户名"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="姓名"></el-table-column>
                <el-table-column align="center" header-align='center' prop="phone" label="手机号" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" :disabled="scope.row.username!= 'admin' ? false : true" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button icon="el-icon-key" style="background-color: #f37276;color: #fff;border: none;" size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'repassword')">重置密码</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" :disabled="scope.row.username!= 'admin' ? false : true" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
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
    import { requestSearchUser, requestDeleteUser, requestResetPwd} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                searchForm: {
                    username: '',
                    pageNo:'1',
                    pageSize:'15',
                },
                tableData: null,
                param: {
                    username:"",
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
                requestSearchUser(_this.param).then(res => {
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
                        requestDeleteUser(deleteParam).then(res => {
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
                }else if(doType == 'repassword'){
                    let updatePwdParam ={
                        id: row.id
                    };
                    requestResetPwd(updatePwdParam).then(res => {
                        this.$message({
                            type: 'success',
                            message: '密码重置成功!',
                            duration:300,
                            onClose:function(){
                                _this.getAjaxList();
                            }
                        });
                    });
                }else if(doType == 'add'){
                    sessionStorage.setItem('userId', '');
                    this.$router.push({ path: '/edituser' });
                }else if(doType == 'edit'){
                    sessionStorage.setItem('userId', row.id);
                    this.$router.push({ path: '/edituser' });
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.username = this.searchForm.username;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchUser(_this.param).then(res => {
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
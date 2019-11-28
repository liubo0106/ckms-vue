<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                </el-form-item>
            </el-form>
            <el-table
                    style="width: 100%;margin-bottom: 20px;"
                    border
                    row-key="id"
                    :data="tableData" :expand-all="expandAll" border>
                <el-table-column align="center" header-align='center' label="菜单名称" prop="name"></el-table-column>
                <el-table-column align="center" header-align='center' label="前台路由" prop="path"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestAllMenu, requestDeleteMenu } from '../../api/api';
    export default {
        name: 'menu-manage',
        data() {
            return {
                expandAll: false,
                tableData: []
            }
        },
        methods: {
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
                        requestDeleteMenu(deleteParam).then(res => {
                            if(res.status == 200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.getAjaxList();
                                    }
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'add'){
                    sessionStorage.setItem('menuId', '');
                    this.$router.push({ path: '/editmenu' });
                }else if(doType == 'edit'){
                    sessionStorage.setItem('menuId', row.id);
                    this.$router.push({ path: '/editmenu' });
                }
            },
            getAjaxList(){
                let _this = this;
                requestAllMenu().then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.tableData = data;
                        }else{
                            _this.tableData = [];
                        }
                    }
                });
            }
        },
        beforeMount() {
            sessionStorage.removeItem('menuId');
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
    }
</style>
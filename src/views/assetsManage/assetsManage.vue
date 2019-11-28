<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>固定资产及易消耗品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :inline="true" :model="searchForm" label-width="70px" class="demo-form-inline" label-position="left
">
                <el-form-item label="资产编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                    <el-input v-model="searchForm.serialNo" :maxlength="200" autocomplete="off" placeholder="资产编号" clearable></el-input>
                </el-form-item>
                <el-form-item label="资产名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                    <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="资产名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="资产类型" prop="type" >
                    <el-select v-model="searchForm.type" placeholder="请选择">
                        <el-option  label="全部" value="">全部</el-option>
                        <el-option  label="固定资产" value="1">固定资产</el-option>
                        <el-option label="易耗品" value="2">易耗品</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用状态" prop="type" >
                    <el-select v-model="searchForm.isDelete" placeholder="请选择">
                        <el-option  label="全部" value="">全部</el-option>
                        <el-option  label="停用" value="0">停用</el-option>
                        <el-option label="启用" value="1">启用</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                    <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="serialNo" label="资产编号" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="资产名称" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="model" label="型号" width="110"></el-table-column>
                <el-table-column align="center" header-align='center' prop="category" label="资产类别" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="isDeleteName" label="是否启用" width="120">
                    <template slot-scope="scope">
                        <span :class="{'active': scope.row.isDelete=='0'}">{{scope.row.isDeleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" style="background-color: #24cbc1;color: #fff;border: none;" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button icon="el-icon-delete" style="background-color: #fe8d29;color: #fff;border: none;" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')" v-if="scope.row.isDelete==1">停用</el-button>
                        <el-button icon="el-icon-delete" style="background-color: #fe8d29;color: #fff;border: none;" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'start')" v-else>启用</el-button>
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
    import { requestSearchAssets, requestDeleteAssets,requestisEnabledAssets} from '../../api/api';//requestSearchSupplier
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    name: '',
                    serialNo: '',
                    type: '',
                    isDelete:'',
                },
                tableData: null,
                param: {
                    content:"",
                    pageNo:1,
                    pageSize:15,
                    isDelete:''
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
                requestSearchAssets(_this.param).then(res => {
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
                        requestisEnabledAssets(deleteParam).then(res => {
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
                    requestisEnabledAssets(deleteParam).then(res => {
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

                }
                else if(doType == 'add'){
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editAssets'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editAssets'});
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.name = this.searchForm.name;
                this.param.serialNo = this.searchForm.serialNo;
                this.param.type = this.searchForm.type;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                this.param.isDelete=this.searchForm.isDelete;
                requestSearchAssets(_this.param).then(res => {
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

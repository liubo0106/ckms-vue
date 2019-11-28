<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>复合调料包</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-container>
                <el-main>
                    <el-form :inline="true" :model="searchForm" label-width="55px" label-position="left" class="demo-form-inline" style="padding-left: 0px !important;">
                        <el-form-item label="编号：">
                            <el-input v-model="searchForm.serialNo" :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称：">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>

                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border :row-class-name="tableRowClassName">
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="180"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="80"></el-table-column>
                        <el-table-column align="left" header-align='center' label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button icon="el-icon-edit" style="background-color: #24cbc1;color: #fff;border: none;" size="small" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                                <el-button icon="el-icon-delete" style="background-color: #fe8d29;color: #fff;border: none;"  size="small" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
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
                </el-main>
            </el-container>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestSearchCompound,
        requestDeleteCompound,
        requestSaveCompound} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    name: ''
                },
                tableData: null,
                param: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:''
                },
                totalNum:0,
                //orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                checkNodeKey:'',
                pathIds:''
            }
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchCompound(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData = data;
                            _this.totalNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData = [];
                            _this.totalNum = 0;
                        }
                    }
                });
            },
            handleCurrentChange(){

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
                        requestDeleteCompound(deleteParam).then(res => {
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
                    sessionStorage.setItem('pathIds', this.pathIds);
                    sessionStorage.setItem('UPageNo', this.param.pageNo);
                    sessionStorage.setItem('UContent', this.param.name);
                    sessionStorage.setItem('deptId', this.param.deptId);
                    sessionStorage.setItem('groupId', '');
                    this.$router.push({ path: '/editCompositeFlavour'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('pathIds', this.pathIds);
                    sessionStorage.setItem('UPageNo', this.param.pageNo);
                    sessionStorage.setItem('UContent', this.param.name);
                    sessionStorage.setItem('deptId', this.param.deptId);
                    sessionStorage.setItem('groupId', row.id);
                    this.$router.push({ path: '/editCompositeFlavour' });
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (row.isWarning==1 &&(row.stock <= row.safeStock)) {
                    return 'warning-row';
                }
                return '';
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.name = this.searchForm.name;
                this.param.serialNo = this.searchForm.serialNo;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchCompound(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData = data;
                            _this.totalNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData = [];
                            _this.totalNum = 0;
                        }
                    }
                });
            },
           /* getTreeAjaxList(){
                let _this = this;
                requestSearchGroup({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData = data;
                        }else{
                            _this.orgTreeData = [];
                        }
                    }
                });
            }*/
        },
        beforeMount() {
            let dept = sessionStorage.getItem('deptId');
            let pageNo = sessionStorage.getItem('UPageNo');
            let content = sessionStorage.getItem('UContent');
            sessionStorage.removeItem('groupId');
            if(dept){
                this.param.deptId = dept;
                this.checkNodeKey = dept;
            }else{
                this.checkNodeKey = '';
            }
            if(pageNo){
                this.param.pageNo = parseInt(pageNo);
            }
            if(name){
                this.searchForm.name = name;
                this.param.name = name;
            }
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
    .el-table .warning-row {
        color: red;
    }
</style>
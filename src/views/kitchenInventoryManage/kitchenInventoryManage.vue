<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>厨房库存</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-container>
                <el-aside>
                    <el-tree :highlight-current="true" node-key="id"
                             default-expand-all style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);"
                             :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                             :current-node-key="checkNodeKey"
                             :expand-on-click-node="false"></el-tree>
                </el-aside>
                <el-main>
                    <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline">
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="原料编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                                    <el-input v-model="searchForm.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="原料名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                                    <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                                    <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table :data="tableData" border style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);"    :row-class-name="tableRowClassName">
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="180"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="price" label="出售单价" ></el-table-column>
                        <!--<el-table-column align="center" header-align='center' prop="stock" label="库存量" width="120"></el-table-column>-->
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="120"></el-table-column>
                       <!-- <el-table-column align="center" header-align='center' label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button icon="el-icon-edit" size="small" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                                <el-button icon="el-icon-delete" size="small" style="background:#e16870;color:rgba(255,255,255,1);border-radius:5px;" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                                <el-button v-if='scope.row.isWarning == 0' type="warning" size="small" @click="handleClick(scope.$index, scope.row, 'isOpen')">开启预警</el-button>
                                <el-button  v-if='scope.row.isWarning == 1' size="small" @click="handleClick(scope.$index, scope.row, 'isClose')">取消预警</el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="param.pageNo"
                            :page-size="param.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalNum">
                    </el-pagination>
                </el-main>
            </el-container>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSearchProductList, requestDeleteProduct,requestSearchProduct, requestSaveProduct} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                searchForm: {
                    name: ''
                },
                tableData: null,
                param: {
                    name:"",
                    pageNo:1,
                    pageSize:15,
                    deptId:'',
                    checkChild:'all',
                    serialNo:''
                },
                totalNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                checkNodeKey:'',
                pathIds:''
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (row.isWarning==1 &&(row.stock <= row.safeStock)) {
                    return 'warning-row';
                }
                return '';
            },
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            //点击树节点
            handleNodeClick(data) {
                this.searchForm.name = '';
                this.param.name = '';
                this.param.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.param.categoryId = data.id;
                }

                this.param.pageNo = 1;
                if(data.pathIds){
                    this.pathIds = '0'+','+data.pathIds;
                }
                this.getAjaxList();
                this.checkNodeKey = data.id;
                sessionStorage.setItem('UContent', this.param.name);
                sessionStorage.setItem('deptId', this.param.deptId);
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
                        requestDeleteProduct(deleteParam).then(res => {
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
                    sessionStorage.setItem('pathIds', this.pathIds);
                    sessionStorage.setItem('UPageNo', this.param.pageNo);
                    sessionStorage.setItem('UContent', this.param.name);
                    sessionStorage.setItem('deptId', this.param.deptId);
                    sessionStorage.setItem('userId', '');
                    this.$router.push({ path: '/editCommodity' });
                }else if(doType == 'edit'){
                    sessionStorage.setItem('pathIds', this.pathIds);
                    sessionStorage.setItem('UPageNo', this.param.pageNo);
                    sessionStorage.setItem('UContent', this.param.name);
                    sessionStorage.setItem('deptId', this.param.deptId);
                    sessionStorage.setItem('userId', row.id);
                    this.$router.push({ path: '/editCommodity' });
                }else if(doType == 'manager'){
                    if(this.param.deptId){
                        let mParam ={
                            id: this.param.deptId,
                            managerId: row.id
                        };
                        requestSaveProduct(mParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '设置成功!',
                                duration:300,
                                onClose:function(){
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }else{
                        this.$message({
                            type: 'success',
                            message: '请选择机构!'
                        });
                    }

                }else if(doType == 'isOpen'){
                    this.$confirm('是否开启预警?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let deleteParam ={
                            id: row.id,
                            isWarning:1
                        };
                        requestSaveProduct(deleteParam).then(res => {
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
                }else if(doType == 'isClose'){
                    this.$confirm('是否取消预警?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let deleteParam ={
                            id: row.id,
                            isWarning:0
                        };
                        requestSaveProduct(deleteParam).then(res => {
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
                this.param.serialNo = this.searchForm.serialNo;
                this.param.name = this.searchForm.name;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchProductList(_this.param).then(res => {
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
            getTreeAjaxList(){
                let _this = this;
                requestSearchProduct({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData = data;
                        }else{
                            _this.orgTreeData = [];
                        }
                    }
                });
            }
        },
        beforeMount() {
            let dept = sessionStorage.getItem('deptId');
            let pageNo = sessionStorage.getItem('UPageNo');
            let content = sessionStorage.getItem('UContent');
            sessionStorage.removeItem('userId');
            if(dept){
                this.param.deptId = dept;
                this.checkNodeKey = dept;
            }else{
                this.checkNodeKey = '';
            }
            if(pageNo){
                this.param.pageNo = parseInt(pageNo);
            }
            if(content){
                this.searchForm.name = content;
                this.param.name = content;
            }
            this.getAjaxList();
            this.getTreeAjaxList();
        }
    }
</script>
<style  lang="scss">
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
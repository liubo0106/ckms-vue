<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>原料管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-container>
                <el-aside>
                    <el-tree :highlight-current="true" node-key="id"
                             default-expand-all
                             :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                             :current-node-key="checkNodeKey"
                             :expand-on-click-node="false"></el-tree>
                </el-aside>
                <el-main>
                    <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline">
                        <el-row :gutter="20">
                            <el-col :span="19" style="padding-left: 0px !important;">
                                <el-form-item label="原料编号">
                                    <el-input v-model="searchForm.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="原料名称">
                                    <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="状态" prop="type" >
                                    <el-select v-model="searchForm.type" placeholder="请选择" >
                                        <el-option  label="全部" value="">全部</el-option>
                                        <el-option  label="停用" value="0">停用</el-option>
                                        <el-option label="启用" value="1">启用</el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                                    <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table :data="tableData" border>
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="180"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="costPrice" label="成本价" width="80">
                            <template slot-scope="scope">
                                <span>{{scope.row.costPrice | substr}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="基础单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="spec" label="规格" ></el-table-column>
                        <el-table-column align="center" header-align='center' label="规格库存">
                            <template slot-scope="scope">
                                <span>{{scope.row.specSufStock}}{{scope.row.specSufStandard}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="isDeleteName" label="是否启用" width="120">
                            <template slot-scope="scope">
                                <span :class="{'active': scope.row.isDelete=='0'}">{{scope.row.isDeleteName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="left" header-align='center' label="操作" width="410">
                            <template slot-scope="scope">
                                <el-button icon="el-icon-edit" style="background-color: #24cbc1;color: #fff;border: none;" size="small" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                                <el-button icon="el-icon-delete" size="small" style="background-color: #fe8d29;color: #fff;border: none;" @click="handleClick(scope.$index, scope.row, 'delete')" v-if="scope.row.isDelete==1">停用</el-button>
                                <el-button icon="el-icon-delete" size="small" style="background-color: #fe8d29;color: #fff;border: none;" @click="handleClick(scope.$index, scope.row, 'start')" v-else>启用</el-button>
                                <el-button icon="el-icon-warning" v-if='scope.row.isWarning == 0' type="warning" size="small" @click="handleClick(scope.$index, scope.row, 'isOpen')">开启预警</el-button>
                                <el-button icon="el-icon-warning" style="background-color: #847ffe;color: #fff;border: none;" v-if='scope.row.isWarning == 1' type="warning" size="small" @click="handleClick(scope.$index, scope.row, 'isClose')">取消预警</el-button>
                                <el-button icon="el-icon-warning" type="success" size="small" @click="handleClick(scope.$index, scope.row, 'data')">价格曲线</el-button>
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
    import { requestSearchProductList ,requestSearchProduct, requestSaveProduct,requestisEnabledProducts} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    name: '',
                    type:''
                },
                tableData: null,
                param: {
                    name:"",
                    pageNo:1,
                    pageSize:15,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    isDelete:''
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
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
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
            handleCurrentChange(){

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
                        requestisEnabledProducts(deleteParam).then(res => {
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
                    requestisEnabledProducts(deleteParam).then(res => {
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
                else if(doType=='data'){
                    sessionStorage.setItem('serialNo',row.id);
                    this.$router.push('/priceCurveDetail');
                }
                else if(doType == 'add'){
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
                this.param.isDelete=this.searchForm.type;
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
        filters:{
            substr:function (value) {
                if(value!=null){
                    return value.toFixed(2);
                }

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
    .active{
        color: red !important;
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

<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>库存管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <template>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="原料库存" name="first">
                        <!--原料管理-->
                        <el-container>
                            <el-aside>
                                <el-tree :highlight-current="true" node-key="id"
                                         default-expand-all
                                         :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                                         :current-node-key="checkNodeKey"
                                         :expand-on-click-node="false"></el-tree>
                            </el-aside>
                            <el-main>
                                <el-form :inline="true" :model="searchForm" label-width="75px" class="demo-form-inline" label-position="left">
                                    <el-form-item label="原料编号">
                                        <el-input v-model="searchForm.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="原料名称">
                                        <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label-width="0">
                                        <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                                    </el-form-item>
                                </el-form>
                                <el-table :data="tableData" border   :row-class-name="tableRowClassName">
                                    <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="180"></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="120"></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="120">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.price | substr}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" header-align='center' prop="costPrice" label="成本价" width="120">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.costPrice | substr}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" header-align='center' prop="totolPrice" label="总价" width="120">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.totolPrice | substr}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" header-align='center' prop="standard" label="单位" width="120"></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="120"></el-table-column>
                                    <el-table-column align="center" header-align='center' label="操作" width="150">
                                        <template slot-scope="scope">
                                            <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 0' type="warning" size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isOpen')">开启预警</el-button>
                                            <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 1' size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isClose')">取消预警</el-button>
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
                    </el-tab-pane>
                    <!--打包管理-->
                    <el-tab-pane label="打包库存" name="second">
                        <el-container>
                            <el-aside>
                                <el-tree :highlight-current="true" node-key="id"
                                         default-expand-all
                                         :data="orgTreeData2" :props="defaultProps2" @node-click="handleNodeClick2"
                                         :current-node-key="checkNodeKey2"
                                         :expand-on-click-node="false"></el-tree>
                            </el-aside>
                            <el-main>
                                <el-form :inline="true" :model="searchForm2" label-width="75px" class="demo-form-inline" label-position="left">
                                    <el-form-item label="打包编号">
                                        <el-input v-model="searchForm2.serialNo" :maxlength="200" autocomplete="off" placeholder="打包编号" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="打包名称">
                                        <el-input v-model="searchForm2.name" :maxlength="200" autocomplete="off" placeholder="打包名称" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label-width="0">
                                        <el-button icon="el-icon-search" circle @click.native.prevent="onSearch2" native-type="submit"></el-button>
                                    </el-form-item>
                                </el-form>
                                <el-table :data="tableData2" border  :row-class-name="tableRowClassName">
                                    <el-table-column align="center" header-align='center' type="index" :index="indexMethod2" label="行号" width="80"></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="serialNo" label="打包编号" width="180"></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="name" label="打包名称" ></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="stock" label="库存量" ></el-table-column>
                                    <el-table-column align="center" header-align='center' prop="costPrice" label="成本价" >
                                        <template slot-scope="scope">
                                            <span>{{scope.row.costPrice | substr}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" header-align='center' prop="totolPrice" label="总价" >
                                        <template slot-scope="scope">
                                            <span>{{scope.row.totolPrice | substr}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="120"></el-table-column>
                                    <el-table-column align="center" header-align='center' label="操作" width="150">
                                        <template slot-scope="scope">
                                            <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 0' type="warning" size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isOpen')">开启预警</el-button>
                                            <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 1' size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isClose')">取消预警</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                        @size-change="handleSizeChange2"
                                        @current-change="handleCurrentChange2"
                                        :current-page="param.pageNo"
                                        :page-sizes="[10, 30, 45, 60]"
                                        :page-size="param.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="totalNum2">
                                </el-pagination>
                            </el-main>
                        </el-container>
                    </el-tab-pane>
                    <el-tab-pane label="固定资产" name="third">
                        <el-form :inline="true" :model="searchForm3" label-width="75px" class="demo-form-inline" label-position="left">
                            <el-form-item label="资产编号">
                                <el-input v-model="searchForm3.serialNo" :maxlength="200" autocomplete="off" placeholder="资产编号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="资产名称">
                                <el-input v-model="searchForm3.name" :maxlength="200" autocomplete="off" placeholder="资产编号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label-width="0">
                                <el-button icon="el-icon-search" circle @click.native.prevent="onSearch3" native-type="submit"></el-button>
                            </el-form-item>
                        </el-form>
                        <el-table :data="tableData3" border   :row-class-name="tableRowClassName">
                            <el-table-column align="center" header-align='center' type="index" :index="indexMethod3" label="行号" width="80"></el-table-column>
                            <el-table-column align="center" header-align='center' prop="serialNo" label="资产编号" width="180"></el-table-column>
                            <el-table-column align="center" header-align='center' prop="name" label="资产名称" ></el-table-column>
                            <el-table-column align="center" header-align='center' prop="category" label="类别" ></el-table-column>
                            <el-table-column align="center" header-align='center' prop="stock" label="库存量" ></el-table-column>
                            <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="120"></el-table-column>
                            <el-table-column align="center" header-align='center' label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 0' type="warning" size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isOpen')">开启预警</el-button>
                                    <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 1' size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isClose')">取消预警</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @size-change="handleSizeChange3"
                                @current-change="handleCurrentChange3"
                                :current-page="param.pageNo"
                                :page-sizes="[15, 30, 45, 60]"
                                :page-size="param.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalNum3">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="低值易耗品" name="fourth">
                        <el-form :inline="true" :model="searchForm4" label-width="100px" class="demo-form-inline" label-position="left">
                            <el-form-item label="易耗品编号">
                                <el-input v-model="searchForm4.serialNo" :maxlength="200" autocomplete="off" placeholder="易耗品编号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="易耗品名称">
                                <el-input v-model="searchForm4.name" :maxlength="200" autocomplete="off" placeholder="易耗品名称" clearable></el-input>
                            </el-form-item>
                            <el-form-item label-width="0">
                                <el-button icon="el-icon-search" circle @click.native.prevent="onSearch4" native-type="submit"></el-button>
                            </el-form-item>
                        </el-form>
                        <el-table :data="tableData4" border  :row-class-name="tableRowClassName">
                            <el-table-column align="center" header-align='center' type="index" :index="indexMethod4" label="行号" width="80"></el-table-column>
                            <el-table-column align="center" header-align='center' prop="serialNo" label="易耗品编号" width="180"></el-table-column>
                            <el-table-column align="center" header-align='center' prop="name" label="易耗品名称" ></el-table-column>
                            <el-table-column align="center" header-align='center' prop="category" label="类别" ></el-table-column>
                            <el-table-column align="center" header-align='center' prop="stock" label="库存量" ></el-table-column>
                            <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="120"></el-table-column>
                            <el-table-column align="center" header-align='center' label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 0' type="warning" size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isOpen')">开启预警</el-button>
                                    <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-warning" v-if='scope.row.isWarning == 1' size="small" @click="handleYuJingClick(scope.$index, scope.row, 'isClose')">取消预警</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @size-change="handleSizeChange4"
                                @current-change="handleCurrentChange4"
                                :current-page="param.pageNo"
                                :page-sizes="[15, 30, 45, 60]"
                                :page-size="param.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalNum4">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </template>

        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSearchProductList,requestSearchProduct,requestSearchGroupList,requestSearchGroup,requestSearchAssets,requestSaveProduct,requestSaveGroup,requestSaveAssets} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                //原料管理
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
                    serialNo:'',
                    isDelete:1,
                },
                totalNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                checkNodeKey:'',
                pathIds:'',
                activeName: 'first',
                //打包管理
                searchForm2: {
                    name: ''
                },
                tableData2: null,
                param2: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    isDelete:1,
                },
                totalNum2:0,
                orgTreeData2: [],
                defaultProps2: {
                    children: 'children',
                    label: 'name'
                },
                checkNodeKey2:'',
                pathIds2:'',
                searchForm3: {
                    name: ''
                },
                tableData3: null,
                param3: {
                    name:"",
                    pageNo:1,
                    pageSize:15,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    type: 1,
                    isDelete:1,
                },
                totalNum3:0,
                searchForm4: {
                    name: '',
                    serialNo:''
                },
                tableData4: null,
                param4: {
                    name:"",
                    pageNo:1,
                    pageSize:15,
                    serialNo:'',
                    type: 2,
                    isDelete:1,
                },
                totalNum4:0
            }
        },
        methods: {
            handleYuJingClick(index, row, doType) {
                let _this = this;
                if(doType == 'isOpen'){
                    if(_this.activeName == 'first'){
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
                    }else if(_this.activeName == 'second'){
                        this.$confirm('是否开启预警?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isWarning:1
                            };
                            requestSaveGroup(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param2.pageNo =1;
                                        _this.getAjaxList2();
                                    }
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }else if(_this.activeName == 'third'){
                        this.$confirm('是否开启预警?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isWarning:1
                            };
                            requestSaveAssets(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param3.pageNo =1;
                                        _this.getAjaxList3();
                                    }
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }else if(_this.activeName == 'fourth'){
                        this.$confirm('是否开启预警?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isWarning:1
                            };
                            requestSaveAssets(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param4.pageNo =1;
                                        _this.getAjaxList4();
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
                }else if(doType == 'isClose'){
                    if(_this.activeName == 'first'){
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
                    }else if(_this.activeName == 'second'){
                        this.$confirm('是否取消预警?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isWarning:0
                            };
                            requestSaveGroup(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param2.pageNo =1;
                                        _this.getAjaxList2();
                                    }
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }else if(_this.activeName == 'third'){
                        this.$confirm('是否取消预警?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isWarning:0
                            };
                            requestSaveAssets(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param3.pageNo =1;
                                        _this.getAjaxList3();
                                    }
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }else if(_this.activeName == 'fourth'){
                        this.$confirm('是否取消预警?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isWarning:0
                            };
                            requestSaveAssets(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param4.pageNo =1;
                                        _this.getAjaxList4();
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
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (row.isWarning==1 &&(row.stock <= row.safeStock)) {
                    return 'warning-row';
                }
                return '';
            },
            //原料管理---------------------------------------------------
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
            handleClick(tab, event) {
                if(tab.name == 'third'){
                    this.getAjaxList3();
                }else if(tab.name == 'fourth'){
                    this.getAjaxList4();
                }
            },
            //查询
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
            //查询
            indexMethod3(index) {
                return (this.param3.pageNo - 1) * this.param3.pageSize + index + 1;
            },
            onSearch3() {
                this.param3.pageNo =1;
                this.param3.serialNo = this.searchForm3.serialNo;
                this.param3.name = this.searchForm3.name;
                this.getAjaxList3();
            },
            handleCurrentChange3(val) {
                this.param3.pageNo = val;
                this.getAjaxList3();
            },
            //查询
            indexMethod4(index) {
                return (this.param4.pageNo - 1) * this.param4.pageSize + index + 1;
            },
            onSearch4() {
                this.param4.pageNo =1;
                this.param4.serialNo = this.searchForm4.serialNo;
                this.param4.name = this.searchForm4.name;
                this.getAjaxList4();
            },
            handleCurrentChange4(val) {
                this.param4.pageNo = val;
                this.getAjaxList4();
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

            handleSizeChange2(val){
                let _this = this;
                _this.param2.pageSize=val;
                requestSearchGroupList(_this.param2).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData2 = data;


                            _this.totalNum2 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData2 = [];
                            _this.totalNum2 = 0;
                        }
                    }
                });
            },
            handleSizeChange3(val){
                let _this = this;
                _this.param3.pageSize=val;
                requestSearchAssets(_this.param3).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData3 = data;
                            _this.totalNum3 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData3 = [];
                            _this.totalNum3 = 0;
                        }
                    }
                });
            },
            handleSizeChange4(val){
                let _this = this;
                _this.param4.pageSize=val;
                requestSearchAssets(_this.param4).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData4 = data;
                            _this.totalNum4 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData4 = [];
                            _this.totalNum4 = 0;
                        }
                    }
                });
            },
            //查询列表
            getAjaxList(){
                let _this = this;
                requestSearchProductList(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData = data;
                            this.tableData.forEach((item)=>{
                                this.$set(item,'totolPrice',0);
                            })
                            for(let i=0;i<this.tableData.length;i++){
                                this.tableData[i].totolPrice=this.tableData[i].stock*this.tableData[i].costPrice;
                            }
                            _this.totalNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData = [];
                            _this.totalNum = 0;
                        }
                    }
                });
            },
            //查询左侧菜单树
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
            },
            //打包管理---------------------------------------------------------------------
            indexMethod2(index) {
                return (this.param2.pageNo - 1) * this.param2.pageSize + index + 1;
            },
            //点击树节点
            handleNodeClick2(data) {
                this.searchForm2.name = '';
                this.param2.name = '';
                this.param2.packCategoryId = '';

                if( data.id=="0"){

                }else{
                    this.param2.packCategoryId = data.id;
                }
                this.param2.pageNo = 1;
                if(data.pathIds){
                    this.pathIds = '0'+','+data.pathIds;
                }
                this.getAjaxList2();
                this.checkNodeKey2 = data.id;
                sessionStorage.setItem('UContent2', this.param2.name);
                sessionStorage.setItem('deptId2', this.param2.deptId);
            },
            onSearch2() {
                this.param2.pageNo =1;
                this.param2.name = this.searchForm2.name;
                this.param2.serialNo = this.searchForm2.serialNo;
                this.getAjaxList2();
            },
            handleCurrentChange2(val) {
                this.param2.pageNo = val;
                this.getAjaxList2();
            },
            getAjaxList2(){
                let _this = this;
                requestSearchGroupList(_this.param2).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData2 = data;
                            _this.totalNum2 = parseInt(res.data.totalNum);
                            this.tableData2.forEach((item)=>{
                                _this.$set(item,'totolPrice',0);
                            })
                            for(let i=0;i<this.tableData2.length;i++){
                                _this.tableData2[i].totolPrice=_this.tableData2[i].stock*_this.tableData2[i].costPrice;
                            }
                            console.log(_this.tableData2);
                        }else{
                            _this.tableData2 = [];
                            _this.totalNum2 = 0;
                        }
                    }
                });
            },
            getTreeAjaxList2(){
                let _this = this;
                requestSearchGroup({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData2 = data;
                        }else{
                            _this.orgTreeData2 = [];
                        }
                    }
                });
            },
            getAjaxList3(){
                let _this = this;
                requestSearchAssets(_this.param3).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData3 = data;
                            _this.totalNum3 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData3 = [];
                            _this.totalNum3 = 0;
                        }
                    }
                });
            },
            getAjaxList4(){
                let _this = this;
                requestSearchAssets(_this.param4).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData4 = data;
                            _this.totalNum4 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData4 = [];
                            _this.totalNum4 = 0;
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
            //原料管理
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
            //打包管理
            let dept2 = sessionStorage.getItem('deptId2');
            let pageNo2 = sessionStorage.getItem('UPageNo2');
            let content2 = sessionStorage.getItem('UContent2');
            sessionStorage.removeItem('userId2');
            if(dept2){
                this.param2.deptId = dept2;
                this.checkNodeKey2= dept2;
            }else{
                this.checkNodeKey2 = '';
            }
            if(pageNo2){
                this.param2.pageNo = parseInt(pageNo);
            }
            if(name){
                this.searchForm2.name = name;
                this.param2.name = name;
            }
            this.getAjaxList2();
            this.getTreeAjaxList2();
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

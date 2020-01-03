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
                             default-expand-all
                             :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                             :current-node-key="checkNodeKey"
                             :expand-on-click-node="false"></el-tree>
                </el-aside>
                <el-main>
                    <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline" label-position="left">
                        <el-form-item label="原料编号">
                            <el-input v-model="searchForm.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="原料名称">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-download" type="primary" @click="kitchenOut" size="small">导出</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border :row-class-name="tableRowClassName">
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
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="createUser" label="操作人" ></el-table-column>
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
    import { requestSearchKitchenRawList,requestSearchProduct,requestUrl} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                searchForm: {
                    name: '',
                    serialNo:''
                },
                tableData: null,
                param: {
                    name:"",
                    pageNo:1,
                    pageSize:15,
                    categoryId:'',
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
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchKitchenRawList(_this.param).then(res => {
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
            kitchenOut(){
                location.href = requestUrl+'export/kitchenRawStockExport'+
                    '?pageNo='+this.param.pageNo+
                    '&name='+this.searchForm.name+
                    '&serialNo='+this.searchForm.serialNo+
                    '&categoryId='+this.param.categoryId+
                    '&pageSize=0';
            },
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            //点击树节点
            handleNodeClick(data) {
                this.searchForm.name = '';
                this.searchForm.serialNo = '';
                this.param.name = '';
                this.param.serialNo = '';
                this.param.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.param.categoryId = data.id;
                }
                this.param.pageNo = 1;
                this.getAjaxList();
                this.checkNodeKey = data.id;
                sessionStorage.setItem('categoryId', this.param.categoryId);
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
                requestSearchKitchenRawList(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData = data;
                            _this.totalNum = parseInt(res.data.totalNum);
                            this.tableData.forEach((item)=>{
                                this.$set(item,'totolPrice',0);
                            })
                            for(let i=0;i<this.tableData.length;i++){
                                this.tableData[i].totolPrice=this.tableData[i].stock*this.tableData[i].costPrice;
                            }

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
            let categoryId = sessionStorage.getItem('categoryId');
            if(categoryId){
                this.param.categoryId = categoryId;
                this.checkNodeKey = categoryId;
            }else{
                this.checkNodeKey = '';
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

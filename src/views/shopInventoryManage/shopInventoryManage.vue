<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店库存管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="商品名称">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="是否上架">
                            <el-select v-model="searchForm.isSale" placeholder="请选择活动区域">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="上架中" value="1"></el-option>
                                <el-option label="已下架" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜品分类">
                            <el-select  v-model="searchForm.categoryId" placeholder="请选择" >
                                <el-option  v-for="item in categoryList" :label="item.name"  :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜品种类">
                                <el-select  v-model="searchForm.kind" placeholder="请选择">
                                    <el-option  v-for="item in kindList" :label="item.name"  :value="item.value"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button icon="el-icon-refresh-right" circle @click="reset"></el-button>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="4">-->
                        <!---->
                    <!--</el-col>-->
                </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="商品名称" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="stock" label="库存" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="price" label="价格" width="80"></el-table-column>
                <!--<el-table-column align="center" header-align='center' prop="typeName" label="商品类型" width="140"></el-table-column>-->
                <el-table-column align="center" header-align='center' prop="saleName" label="是否上架" width="140"></el-table-column>
               <!-- <el-table-column align="center" header-align='center' prop="num" label="排序号" width="140"></el-table-column>-->
                <!--<el-table-column align="center" header-align='center' label="操作" width="340">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button  type="primary" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>-->
                        <!--<el-button size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
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
    import { requestSearchGoods, requestDeleteGoods,requestStatusIn,requestMenuListByInPid} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            var customerId= sessionStorage.getItem('customerId')
            return {

                searchForm: {
                    name: '',
                    isSale:'',
                    kind:'',
                    categoryId:'',
                },
                param3: {
                    pid:"0",
                },
                categoryList:[],
                kindList:[{name:'炒锅涮锅',value:1},{name:'烧烤',value:2},{name:'凉菜',value:3},{name:'其他',value:0}],
                tableData: null,
                param: {
                    pageNo:1,
                    pageSize:15,
                    name:'',
                    isSale:'',
                    customerId:customerId,//门店ID
                    type:1,
                    isDelete:1,
                    kind:'',
                    categoryId:'',
                },
                totalNum:0
            }
        },
        created(){
            this.getAjaxCategory();
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            reset(){
                this.searchForm.name = '';
                this.searchForm.isSale = '';
                this.searchForm.kind='';
                this.searchForm.categoryId='';
                this.param.name = '';
                this.param.isSale = '';
                this.param.kind='';
                this.param.categoryId='';
                this.getAjaxList();
            },
            getAjaxCategory(){
                let _this = this;
                requestMenuListByInPid(_this.param3).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.categoryList = data;
                        }else{
                            _this.categoryList = [];
                        }
                    }
                });
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchGoods(_this.param).then(res => {
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
                        requestDeleteGoods(deleteParam).then(res => {
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
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editInShopInStock'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editInShopInStock'});
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.name = this.searchForm.name;
                this.param.isSale = this.searchForm.isSale;
                this.param.kind=this.searchForm.kind;
                this.param.categoryId=this.searchForm.categoryId;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchGoods(_this.param).then(res => {
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
            sessionStorage.removeItem('inId');
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

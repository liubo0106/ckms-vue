<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline" label-position="left">
                <el-row :gutter="13">
                    <el-col :span="15">
                            <el-form-item label="商品名称">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="是否上架">
                            <!--<el-input v-model="searchForm.isSale" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>-->
                            <el-select v-model="searchForm.isSale" placeholder="请选择活动区域">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="上架中" value="1"></el-option>
                                <el-option label="已下架" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否启用">
                            <!--<el-input v-model="searchForm.isSale" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>-->
                            <el-select v-model="searchForm.isDelete" placeholder="请选择活动区域">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="已启用" value="1"></el-option>
                                <el-option label="已停用" value="0"></el-option>
                            </el-select>
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
                <el-table-column align="center" header-align='center' prop="name" label="商品名称" ></el-table-column>
               <!-- <el-table-column align="center" header-align='center' prop="stock" label="库存" width="80"></el-table-column>-->
                <el-table-column align="center" header-align='center' prop="price" label="价格" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="typeName" label="商品类型" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="kind" label="菜品种类" width="140">
                    <template slot-scope="scope">
                        <span v-if="scope.row.kind == 0">其他</span>
                        <span v-if="scope.row.kind == 1">炒锅涮锅</span>
                        <span v-if="scope.row.kind == 2">烧烤</span>
                        <span v-if="scope.row.kind == 3">凉菜</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="saleName" label="是否上架" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="isDiscount" label="是否打折" width="140">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isDiscount == 0">是</span>
                        <span v-if="scope.row.isDiscount == 1">否</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="num" label="排序号" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="120"></el-table-column>
                <el-table-column align="center" header-align='center' prop="isDeleteName" label="是否启用" width="120">
                    <template slot-scope="scope">
                        <span :class="{'active': scope.row.isDelete=='0'}">{{scope.row.isDeleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="340">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-upload2" style="background-color: #4395fb;color: #fff;border: none;" v-if='scope.row.isSale == 1' type="isSale" size="small" @click="handleClick(scope.$index, scope.row, 'isClose')">下架</el-button>
                        <el-button icon="el-icon-download" style="background-color: #847ffe;color: #fff;border: none;" v-if='scope.row.isSale == 0' size="small" @click="handleClick(scope.$index, scope.row, 'isSale')">上架</el-button>
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" type="primary" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')" v-if="scope.row.isDelete==1">停用</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'start')" v-else>启用</el-button>
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
    import {requestDeleteGoods, requestGoodsStatus, requestSearchGoods,requestisEnabledGoods,requestGoodsCheck} from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            var customerId= sessionStorage.getItem('customerId')
            return {
                loading: false,
                searchForm: {
                    name: '',
                    isSale:'',
                    isDelete:'',
                },
                tableData: null,
                param: {
                    pageNo:1,
                    pageSize:15,
                    name:'',
                    isSale:'',
                    customerId:customerId,//门店ID
                    isDelete:'',
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
						requestGoodsCheck({id:row.id}).then(res =>{
							if(res.status==200 && res.data!=''){
								this.$message({
									type:'error',
									message:`在${res.data}中被使用不能删除`,
									duration:3000,
								})
								_this.loading=false;
							}else{
								requestisEnabledGoods(deleteParam).then(res => {
								    this.$message({
								        type: 'success',
								        message: '操作成功!',
								        duration:300,
								        onClose:function(){
								            _this.loading=false;
								            _this.param.pageNo =1;
								            _this.getAjaxList();
								        }
								    });
								});
							}
						})

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(doType=='start'){
                    let deleteParam ={
                        id: row.id,
                        isDelete:1,
                    };
                    requestisEnabledGoods(deleteParam).then(res => {
                        this.$message({
                            type: 'success',
                            message: '启用成功',
                            duration:1000,
                            onClose:function(){
                                _this.loading=false;
                                _this.param.pageNo =1;
                            }
                        });
                        _this.getAjaxList();
                    });

                }
                else if(doType == 'add'){
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editInShopInStock'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editInShopInStock'});
                }else if(doType == 'isSale'){
                    if(row.isDelete==0){
                        this.$message({
                            type:'error',
                            message:'商品未启用'
                        })
                        return false;
                    }
                    this.$confirm('是否上架?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'isSale'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id,
                            status:1
                        };
                        requestGoodsStatus(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
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
                            message: '已取消'
                        });
                    });
                }else if(doType == 'isClose'){
                    this.$confirm('是否下架?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'isSale'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id,
                            status:0
                        };
						requestGoodsCheck({id:row.id}).then((res)=>{
							if(res.status==200 && res.data!=''){
								this.$message({
									type:'error',
									message:`在${res.data}中使用,不能被下架`,
									duration:3000,
								})
								this.loading=false;
							}else{
								requestGoodsStatus(deleteParam).then(res => {
								    this.$message({
								        type: 'success',
								        message: '操作成功!',
								        duration:300,
								        onClose:function(){
								            _this.loading=false;
								            _this.param.pageNo =1;
								            _this.getAjaxList();
								        }
								    });
								});
							}
						})

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
                this.param.name = this.searchForm.name;
                this.param.isSale = this.searchForm.isSale;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                this.param.isDelete=this.searchForm.isDelete;
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
    .active{
        color: red !important;
    }
</style>

<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :model="searchForm" label-width="40px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="搜索">
                            <el-input v-model="searchForm.username" :maxlength="200" autocomplete="off" placeholder="门店/联系人/电话" clearable></el-input>
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
                <el-table-column align="center" header-align='center' prop="name" label="门店" width="340"></el-table-column>
                <el-table-column align="center" header-align='center' prop="contact" label="联系人" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="phone" label="电话" width="110"></el-table-column>
                <el-table-column align="center" header-align='center' prop="address" label="联系地址" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="statusName" label="状态" width="70"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" v-if='scope.row.status == 1'  size="mini" @click="handleClick(scope.$index, scope.row, 'inventory')">库存</el-button>
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" v-if='scope.row.status == 1 || scope.row.status == 0' size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.status == 0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button v-if='scope.row.status == 0' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>
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
        <!--添加编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible">
            <el-table :data="tableData2" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="商品名称" ></el-table-column>
                 <el-table-column align="center" header-align='center' prop="stock" label="库存" width="80"></el-table-column>
              <!--  <el-table-column align="center" header-align='center' prop="price" label="价格" width="80"></el-table-column>-->
                <el-table-column align="center" header-align='center' prop="typeName" label="商品类型" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="saleName" label="是否上架" width="140"></el-table-column>
               <!-- <el-table-column align="center" header-align='center' prop="num" label="排序号" width="140"></el-table-column>-->
                <!--<el-table-column align="center" header-align='center' label="操作" width="340">
                    <template slot-scope="scope">
                        <el-button  type="primary" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange2"
                    :current-page.sync="param2.pageNo"
                    :page-size="param2.pageSize"
                    layout="total,prev, pager, next"
                    :total="totalNum2">
            </el-pagination>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">返 回</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestCustomer, requestDeleteClient, requestSearchClient, requestSearchGoods} from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    username: ''
                },
                tableData: null,
                tableData2: null,
                param: {
                    content:"",
                    pageNo:1,
                    pageSize:15,
                },

                totalNum:0,
                dialogFormVisible:false,
                dialogTitle:'查看门店库存',
                param2: {
                    content:"",
                    pageNo:1,
                    pageSize:10,
                    name:'',
                    isSale:'',
                    customerId:'',//门店ID
                },

                totalNum2:0,
            }
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchClient(_this.param).then(res => {
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
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteClient(deleteParam).then(res => {
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
                    sessionStorage.setItem('id', '');
                    this.$router.push({ path: '/editClient'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editClient'});
                }if(doType == 'ok'){
                    this.$confirm('是否确认该门店信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestCustomer(sParam).then(res => {
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
                }else if(doType == 'inventory'){
                    //查看门店库存
                    _this.addOrg('inventory');
                    _this.param2.customerId=row.id;
                }


            },
            addOrg(type){
                this.dialogFormVisible = true;
                if(type == 'inventory'){

                    let _this = this;
                   /* let mendainParam ={
                        pageNo:1,
                        pageSize:15,
                        name:'',
                        isSale:'',
                        customerId:row.id,//门店ID
                    };*/
                    requestSearchGoods(this.param2).then(res => {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData2 = data;
                            _this.totalNum2 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData2 = [];
                            _this.totalNum2 = 0;
                        }
                    });

                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.content = this.searchForm.username;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            handleCurrentChange2(val) {
                this.param2.pageNo = val;
                this.addOrg('inventory');
            },
            getAjaxList(){
                let _this = this;
                requestSearchClient(_this.param).then(res => {
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
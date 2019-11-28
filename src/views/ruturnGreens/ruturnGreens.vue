<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>顾客退菜明细</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :inline="true" :model="searchForm" label-width="40px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="14.5">
                        <el-form-item label="类型">
                            <el-select v-model="searchForm.type" placeholder="请选择活动区域">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="菜品问题" value="1"></el-option>
                                <el-option label="时间问题" value="2"></el-option>
                                <el-option label="服务问题" value="3"></el-option>
                                <el-option label="其他" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                            <el-form-item label="退菜时间-开始" label-width="110px">
                                <el-date-picker
                                        clearable
                                        value-format = 'yyyy-MM-dd HH:mm:ss'
                                        v-model="searchForm.beginDate"
                                        type="datetime"
                                        placeholder="选择时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="退菜时间-结束" label-width="110px">
                                <el-date-picker
                                        clearable
                                        value-format = 'yyyy-MM-dd HH:mm:ss'
                                        v-model="searchForm.endDate"
                                        type="datetime"
                                        placeholder="选择时间">
                                </el-date-picker>
                            </el-form-item>

                    </el-col>
                    <el-col :span="3" >
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button type="primary" @click="exportClick()">导出</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="typeName" label="类型" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' prop="reason" label="原因" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="名称" width="120"></el-table-column>
                <el-table-column align="center" header-align='center' prop="number" label="数量" width="60" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="createTime" label="时间" width="160" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="100"></el-table-column>
                <!--<el-table-column align="center" header-align='center' label="操作" width="340">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">详情</el-button>-->
                        <!--<el-button v-if='scope.row.status == 1 || scope.row.status == 0' size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>-->
                        <!--<el-button v-if='scope.row.status == 0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>-->
                        <!--<el-button v-if='scope.row.status == 0' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>-->
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
    import {requestStoreOrderReturn,
            requestUrl

    } from '../../api/api'; //requestSearchSupplier
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    type: '',
                    beginDate:'',
                    endDate:'',
                },
                tableData: null,
                param: {
                    endDate:'',
                    beginDate:'',
                    type:'',
                    pageNo:1,
                    pageSize:15,
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
                requestStoreOrderReturn(_this.param).then(res => {
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
            //报表导出
            exportClick(){

                location.href = requestUrl+'export/storeOrderReturnReport?customerId='+this.searchForm.customerId+
                    '&type='+this.searchForm.type+
                    '&beginDate='+this.searchForm.beginDate+
                    '&endDate='+this.searchForm.endDate

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
                        requestDeleteSupplier(deleteParam).then(res => {
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
                    this.$router.push({ path: '/editSupplier'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/editSupplier'});
                }else if(doType == 'detail'){
                    sessionStorage.setItem('id', row.id);
                    this.$router.push({ path: '/detailSupplier'});
                }if(doType == 'ok'){
                    this.$confirm('是否确认该供应商信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestSupplier(sParam).then(res => {
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
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.beginDate = this.searchForm.beginDate;
                this.param.endDate = this.searchForm.endDate;
                this.param.type = this.searchForm.type;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestStoreOrderReturn(_this.param).then(res => {
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
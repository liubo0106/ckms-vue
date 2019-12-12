<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/instockreport' }">入库单报表统计</el-breadcrumb-item>
            <el-breadcrumb-item>入库单详情报表统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody" style="padding-bottom: 0px" v-if="isSearch==1">
            <el-form :model="searchForm" inline ref="ruleForm" label-width="100px" label-position="left">
                <el-form-item label="货品编码">
                    <el-input class="min-width-select" v-model="searchForm.serialNo" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="货品名称">
                    <el-input class="min-width-select" v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="日期范围选择" prop="time" label-width="100px">
                    <el-date-picker
                            @change = 'onPickHandle'
                            value-format="yyyy-MM-dd"
                            v-model="searchForm.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="padding-left: 20px">
                    <el-button @click.native.prevent="onSearch(1)" type="success" native-type="submit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="contentBody" style="padding-bottom: 0px" v-else>
            <el-form :model="searchForm" inline ref="ruleForm" label-width="100px" label-position="left">
                <el-form-item label="原料编码">
                    <el-input class="min-width-select" v-model="searchForm.serialNo" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="原料名称">
                    <el-input class="min-width-select" v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="日期范围选择" prop="time" label-width="100px">
                    <el-date-picker
                            @change = 'onPickHandle'
                            value-format="yyyy-MM-dd"
                            v-model="searchForm.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="padding-left: 20px">
                    <el-button @click.native.prevent="onSearch(2)" type="success" native-type="submit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="background-color:#fff;padding:20px;margin:20px">
             <el-tabs v-model="activeName2" type="card" @tab-click="handleClickTab">
                <el-tab-pane label="详情" name="first">
                    <div  v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <div style="padding-bottom: 20px;text-align: right;padding-top:0px;">
                <el-button @click="handleClick('', '', 'export')" type="primary">导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' prop="serialNo" label="货品编码"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="货品名称"></el-table-column>
                <el-table-column align="center" header-align='center' prop="categoryName" label="货品分类"></el-table-column>
                <el-table-column align="center" header-align='center' prop="supplierName" label="供应商"></el-table-column>
                <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="number" label="数量"></el-table-column>
<!--                <el-table-column align="center" header-align='center' prop="rawPrice" label="原始单价"></el-table-column>-->
<!--                <el-table-column align="center" header-align='center' prop="discount" label="折扣率"></el-table-column>-->

                <el-table-column align="center" header-align='center' prop="price" label="单价">
                    <template slot-scope="scope">
                        <span>{{scope.row.price | substrs}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="totalPrice" label="总价">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalPrice | substr}}</span>
                    </template>
                </el-table-column>
<!--                <el-table-column align="center" header-align='center' prop="amount" label="总价"></el-table-column>-->
<!--                <el-table-column align="center" header-align='center' prop="backNumber" label="退货数量"></el-table-column>-->
                <el-table-column align="center" header-align='center' prop="createTime" label="下单时间" width="180"></el-table-column>
                <el-table-column align="center" header-align='center' prop="remark" label="备注"></el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="param.pageNo"
                    :page-sizes="[20, 40, 60, 80]"
                    :page-size="param.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
            </div>
                </el-tab-pane>
                <el-tab-pane label="原材料" name="second" v-if="status==4">
                    <div  v-loading="loading1"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(241, 242, 247, 0.5)">
                    <div style="padding-bottom: 20px;text-align: right;padding-top:0px;">
                        <el-button @click="handleClick('', '', 'export1')" type="primary">导出</el-button>
                    </div>
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="productSerialNo" label="原料编码"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="productName" label="原料名称"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="productCategoryName" label="原料分类"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="productNumber" label="数量"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="productStandard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="productPrice" label="单价">
                            <template slot-scope="scope">
                                <span>{{scope.row.productPrice | substrs}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="totalPrice" label="总价">
                            <template slot-scope="scope">
                                <span>{{scope.row.totalPrice | substrs}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="createTime" label="创建时间"></el-table-column>
                        <!--<el-table-column align="center" header-align='center' prop="rawPrice" label="原始单价"></el-table-column>-->
                        <!--<el-table-column align="center" header-align='center' prop="discount" label="折扣率"></el-table-column>-->

        <!--                <el-table-column align="center" header-align='center' prop="amount" label="总价"></el-table-column>-->
        <!--                <el-table-column align="center" header-align='center' prop="backNumber" label="退货数量"></el-table-column>-->
                        <!-- <el-table-column align="center" header-align='center' prop="remark" label="备注"></el-table-column> -->
                    </el-table>
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="param1.pageNo"
                            :page-sizes="[20, 40, 60, 80]"
                            :page-size="param1.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNum">
                    </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestInStockOrderReportDetailPage, requestUrl,requestInStockOrderReportPageWithPro} from '../../api/api';

    export default {
        name: 'merchant',
        data() {
            return {
                pid:sessionStorage.getItem('inStockReportId'),
                loading: false,
                searchForm: {
                    time:'',
                    pid:sessionStorage.getItem('inStockReportId'),
                    name: '',
                    serialNo:''
                },
                tableData: null,
                activeName2:'first',
                param: {
                    beginDate:'',
                    endDate:'',
                    pid:sessionStorage.getItem('inStockReportId'),
                    name:"",
                    serialNo:'',
                    pageNo:1,
                    pageSize:20
                },
                param1: {
                    beginDate:'',
                    endDate:'',
                    pid:sessionStorage.getItem('inStockReportId'),
                    name:"",
                    serialNo:'',
                    pageNo:1,
                    pageSize:20
                },
                totalNum:0,
                tableData1:[],
                isSearch:1,
                loading1:true,
                status:1,
            }
        },
        methods: {
            onPickHandle(value){
                this.onSearch();
            },
            handleSizeChange1(val){
                this.param1.pageSize=val;
                 requestInStockOrderReportPageWithPro(this.param1).then((res)=>{
                        if(res.status==200){
                            this.tableData1=res.data.items;
                            this.totalNum = parseInt(res.data.totalNum);
                        }
                    })
            },
            handleCurrentChange1(){

            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestInStockOrderReportDetailPage(_this.param).then(res => {
                    _this.loading = false;
                    let data = res.data.items;
                    if (data && data.length > 0) {
                        _this.tableData = data;

                        _this.totalNum = parseInt(res.data.totalNum);
                    } else {
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.onSearch();
            },
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleClickTab(tab){
                console.log(tab.name);
                if(tab.name=="second"){
                    this.isSearch=2;
                    requestInStockOrderReportPageWithPro(this.param1).then((res)=>{
                        if(res.status==200){
                            this.loading1=false;
                            this.tableData1=res.data.items;
                            this.totalNum = parseInt(res.data.totalNum);
                        }
                    })
                }
                if(tab.name=="first"){
                    this.isSearch=1;
                }
            },
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'export') {
                    //导出
                    let beginDate = '';
                    let endDate = '';
                    if(this.searchForm.time && this.searchForm.time.length>0){
                        beginDate = this.searchForm.time.length>0 ? this.searchForm.time[0] :'';
                        endDate = this.searchForm.time.length>0 ? this.searchForm.time[1] :'';
                    }
                    location.href = requestUrl+'export/inStockDetailReport'+
                        '?beginDate='+beginDate+
                        '&endDate='+endDate+
                        '&serialNo='+this.searchForm.serialNo+
                        '&name='+this.searchForm.name+
                        '&pid='+this.searchForm.pid;
                }
                if(doType=='export1'){
                    let beginDate = '';
                    let endDate = '';
                    if(this.searchForm.time && this.searchForm.time.length>0){
                        beginDate = this.searchForm.time.length>0 ? this.searchForm.time[0] :'';
                        endDate = this.searchForm.time.length>0 ? this.searchForm.time[1] :'';
                    }
                    location.href = requestUrl+'export/inStockProductDetailReport'+
                        '?beginDate='+beginDate+
                        '&endDate='+endDate+
                        '&serialNo='+this.searchForm.serialNo+
                        '&name='+this.searchForm.name+
                        '&pid='+this.searchForm.pid;
                }
            },
            onSearch(type) {
                if(type==2){
                    this.param1.pageNo = 1;
                    this.param1.name = this.searchForm.name;
                    this.param1.serialNo = this.searchForm.serialNo;
                    if(this.searchForm.time && this.searchForm.time.length>0){
                        this.param1.beginDate = this.searchForm.time.length>0 ? this.searchForm.time[0] :'';
                        this.param1.endDate = this.searchForm.time.length>0 ? this.searchForm.time[1] :'';
                    }else{
                        this.param1.beginDate = '';
                        this.param1.endDate = '';
                    }
                     requestInStockOrderReportPageWithPro(this.param1).then((res)=>{
                        if(res.status==200){
                            this.tableData1=res.data.items;
                            this.totalNum = parseInt(res.data.totalNum);
                        }
                    })
                    return false;
                }
                this.param.pageNo = 1;
                this.param.name = this.searchForm.name;
                this.param.serialNo = this.searchForm.serialNo;
                if(this.searchForm.time && this.searchForm.time.length>0){
                    this.param.beginDate = this.searchForm.time.length>0 ? this.searchForm.time[0] :'';
                    this.param.endDate = this.searchForm.time.length>0 ? this.searchForm.time[1] :'';
                }else{
                    this.param.beginDate = '';
                    this.param.endDate = '';
                }
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            handleSizeChange(val) {
                this.param.pageNo = 1;
                this.param.pageSize = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                _this.loading = true;
                this.status=sessionStorage.getItem('status');
                requestInStockOrderReportDetailPage(_this.param).then(res => {
                    _this.loading = false;
                    let data = res.data.items;
                    if (data && data.length > 0) {
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                    } else {
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                });
            }
        },
        filters:{
            substr:function (value) {
                if(value!=null){
                    return value.toFixed(2);
                }
            },
            substrs:function(value){
                if(value!=null){
                    return value.toFixed(4);
                }
            }
        },
        beforeMount() {
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
    }
    .min-width-select{
        width: 350px;
    }
</style>

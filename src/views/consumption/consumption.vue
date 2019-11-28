<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日消费报表统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody" style="padding-bottom: 0px">
            <el-form :model="searchForm" inline ref="ruleForm" label-width="100px" label-position="left">
                <el-form-item label="选择日期">
                        <div class="block">
                            <el-date-picker
                                    v-model="searchForm.createTime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="选择门店">
                    <el-select v-model="searchForm.customerName" placeholder="请选择门店">
                        <el-option
                                v-for="item in shopData"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="padding-left: 20px">
                    <el-button @click.native.prevent="onSearch" type="success" native-type="submit">查询</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="contentBody" v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <div style="padding-bottom: 20px;text-align: right">
                <el-button @click="handleClick('', '', 'export')" type="primary">导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' prop="ymdTime" label="时间"></el-table-column>
                <el-table-column align="center" header-align='center' prop="customerName" label="门店"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                <el-table-column align="center" header-align='center' prop="category" label="类型"></el-table-column>
                <el-table-column align="center" header-align='center' prop="number" label="数量"></el-table-column>
                <el-table-column align="center" header-align='center' prop="unit" label="单位"></el-table-column>
                <el-table-column align="center" header-align='center' prop="price" label="应收单价">
                    <template slot-scope="scope">
                        <span>{{scope.row.price | substr}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="costPrice" label="成本价">
                    <template slot-scope="scope">
                        <span>{{scope.row.costPrice | substr}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="sumPrice" label="应收金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.sumPrice | substr}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="realitySumPrice" label="实收金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.realitySumPrice | substr}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="discountAmount" label="优惠金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.discountAmount | substr}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" header-align='center' prop="dateTime" label="入库日期" width="100"></el-table-column>
                <el-table-column align="center" header-align='center' prop="remark" label="备注"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">详情</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <!--<el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="param.pageNo"
                    :page-sizes="[20, 40, 60, 80]"
                    :page-size="param.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>-->
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestInStockOrderReportPage,requestConsumptionPage,requestSearchClient, requestUrl} from '../../api/api';

    export default {
        name: 'merchant',
        data() {
            return {
                loading: false,
                searchForm: {
                    time:'',
                    customerName: '',
                    createTime:''
                },
                tableData: [],
                param: {
                    beginDate:'',
                    endDate:'',
                    name:"",
                    orderNo:'',
                    pageNo:1,
                    pageSize:20
                },
                totalNum:0,
                shopData:[],
            }
        },
        methods: {
            onPickHandle(value){
                this.onSearch();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.onSearch();
            },
            getShop(){
                requestSearchClient(this.param).then((res)=>{
                    const data=res.data.items;
                    if(data.length>0){
                        this.shopData=data;
                    }
                })
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestInStockOrderReportPage(_this.param).then(res => {
                    _this.loading = false;
                    let data = res.data.items;
                    if (data && data.length > 0) {
                        _this.tableData = data;
                        _this.totalNum = _this.tableData.length;
                    } else {
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                });
            },
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
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
                    location.href = requestUrl+'/export/consumeDetailReport'+
                        '?createTime='+this.searchForm.createTime+'&customerName='+this.param.customerName;
                }else if(doType == 'detail'){
                    sessionStorage.setItem('inStockReportId', row.id);
                    this.$router.push({ path: '/instockreportdetail'});
                }
            },
            onSearch() {
                this.param.pageNo = 1;
                this.param.customerName = this.searchForm.customerName;
                this.param.createTime=this.searchForm.createTime;
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
                requestConsumptionPage(_this.param).then(res => {
                    _this.loading = false;
                    let data = res.data;

                    if (data && data.length > 0) {
                        _this.tableData = data;
                        _this.totalNum = _this.tableData.length;
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
                
            }
        },
        beforeMount() {
            this.getShop();
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

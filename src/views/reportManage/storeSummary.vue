<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店库存汇总表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form inline>
                <el-form-item label="商品名称">
                    <el-input v-model="searchForm.productInfoName" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-input v-model="searchForm.categoryName" placeholder="商品分类"></el-input>
                </el-form-item>
                <el-form-item label="门店名称">
                    <el-select v-model="searchForm.customerId" :disabled="isShow">
                        <el-option label="全部" v-if="isShow!=true" value=""></el-option>
                        <el-option v-for="(item,index) in cusTomerData" :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker
                            v-model="dataTime"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                    <el-button icon="el-icon-refresh-right" circle @click="handleClick('reset')"></el-button>
                </el-form-item>
            </el-form>
            <div style="padding-bottom: 20px;text-align: right">
                <el-button @click="handleClick( 'export')" type="primary">导出</el-button>
            </div>
            <el-table border :data="goodsData">
                <el-table-column label="序号" type="index" header-align="center" align="center" :index="indexMethod"></el-table-column>
                <el-table-column label="分类" prop="categoryName" header-align="center" align="center"></el-table-column>
                <el-table-column label="商品名称" prop="productInfoName" header-align="center" align="center"></el-table-column>
                <el-table-column label="期初结存数量" prop="beginNumber" header-align="center" align="center"></el-table-column>
                <el-table-column label="期初结存金额"header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.beginTotalPrice | subStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="本期入库数量" prop="inNumber" header-align="center" align="center"></el-table-column>
                <el-table-column label="本期入库金额" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.inTotalPrice | subStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="本期出库数量" prop="outNumber" header-align="center" align="center"></el-table-column>
                <el-table-column label="本期出库金额" prop="outTotalPrice" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.outTotalPrice | subStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="期末结存数量" prop="endNumber" header-align="center" align="center"></el-table-column>
                <el-table-column label="期末结存金额" prop="endTotalPrice" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.endTotalPrice | subStr}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.pageNo"
                    :page-sizes="[15, 30, 45, 60]"
                    :page-size="searchForm.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import {requestSearchClient, requestShopPage, requestUrl} from "../../api/api";

    export default {
        name: "storeSummary",
        data(){
            return{
                totalNum:0,
                searchForm:{
                    pageNo:1,
                    pageSize:15,
                    productInfoName:'',
                    categoryName:'',
                    beginDate:'',
                    endDate:'',
                    customerId:'',
                },
                dataTime:'',
                goodsData:[],
                isShow:false,
                cusTomerData:[],
            }
        },
        created() {
            this.getAjaxPage();
            this.getdatatime();
            this.getCusData();
        },
        methods:{
            indexMethod(index) {
                return (this.searchForm.pageNo - 1) * this.searchForm.pageSize + index + 1;
            },
            getCusData(){
                requestSearchClient(this.searchForm).then((res)=>{
                    if(res.status==200){
                        this.cusTomerData=res.data.items;
                    }
                });

                if(sessionStorage.getItem('customerId')!='null'){
                    this.searchForm.customerId=sessionStorage.getItem('customerId');
                    this.isShow=true;
                }else{
                    this.isShow=false;
                }
            },
            getdatatime(){
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let newMonth = month>9?month:"0"+month;  //月
                let day = nowDate.getDate();
                let newDay =day>9?day:"0"+day; //日
                this.searchForm.beginDate= year + '-' + newMonth + '-' + newDay;
                this.searchForm.endDate=year + '-' + newMonth + '-' + newDay;
                this.dataTime=[this.searchForm.beginDate,this.searchForm.endDate]
            },
            getAjaxPage(){
                requestShopPage(this.searchForm).then((res)=>{
                    if(res.status==200){
                        this.goodsData=res.data.items;
                        this.totalNum=parseInt(res.data.totalNum);
                    }
                })
            },
            onSearch(){
                this.searchForm.beginDate=this.dataTime[0];
                this.searchForm.endDate=this.dataTime[1];
                this.getAjaxPage();
            },
            handleClick(type){
                if(type=='reset'){
                    this.searchForm.productInfoName='';
                    this.searchForm.categoryName='';
                    this.getAjaxPage();
                }
                if(type=='export'){
                    this.searchForm.endDate=this.dataTime[1];
                    this.searchForm.beginDate=this.dataTime[0];
                    location.href = requestUrl+'export/storegoodsReportExport'+'?beginDate='+this.searchForm.beginDate+
                        '&endDate='+this.searchForm.endDate+
                        '&categoryName'+this.searchForm.categoryName+
                        '&productInfoName='+this.searchForm.productInfoName+
                        '&customerId='+this.searchForm.customerId;
                }
            },
            handleSizeChange(val){
                this.searchForm.pageSize=val;
                this.getAjaxPage();
            },
            handleCurrentChange(val){
                this.searchForm.pageNo=val;
                this.getAjaxPage();
            },
        },
        filters:{
            subStr:function (value) {
                if(value==null){
                    return value;
                }else{
                    return value.toFixed(2);
                }
            }
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

<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店营业额报表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form inline>
                <el-form-item label="门店">
                    <el-select v-model="searchForm.customerId" :disabled="isShow">
                        <el-option label="全部" v-if="isShow!=true" value=""></el-option>
                        <el-option v-for="(item,index) in cusTomerData" :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker
                            v-model="searchForm.createTime"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                </el-form-item>
            </el-form>
            <div style="padding-bottom: 20px;text-align: right">
                <el-button @click="handleClick('export')" type="primary">导出</el-button>
            </div>
            <el-table border :data="tableData">
                <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
                <el-table-column label="支付方式" prop="paymentMethodName" header-align="center" align="center"></el-table-column>
                <el-table-column label="应收金额" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.sumPrice | subStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="实收金额" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.realitySumPrice | subStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="折扣金额" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.discountAmount | subStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="抹零金额" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.fraction | subStr}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
    import {requestSearchClient, requestStorePage, requestUrl} from "../../api/api";

    export default {
        name: "storeSummary",
        data(){
            return{
                searchForm:{
                    pageNo:1,
                    pageSize:15,
                    createTime:'',
                    orderNo:'',
                    customerId:'',
                },
                cusTomerData:[],
                tableData:[],
                isShow:false,

            }
        },
        created() {
            this.getCusData();
        },
        methods:{
            getAjaxPage(){
                requestStorePage(this.searchForm).then((res)=>{
                    if(res.status==200){
                        this.tableData=res.data;
                    }
                })
            },
            getCusData(){
                requestSearchClient(this.searchForm).then((res)=>{
                    if(res.status==200){
                        this.cusTomerData=res.data.items;
                    }
                });

                if(sessionStorage.getItem('customerId')!='null' && sessionStorage.getItem('customerId')!=''){
                    this.searchForm.customerId=sessionStorage.getItem('customerId');
                    this.isShow=true;
                }else{
                    this.isShow=false;
                }
            },
            onSearch(){
                this.getAjaxPage();
            },
            handleClick(type){
              if(type=="export"){
                  location.href=requestUrl+'export/storeTurnoverReport'+'?createTime='+this.searchForm.createTime+'&customerId='+this.searchForm.customerId;
                }
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

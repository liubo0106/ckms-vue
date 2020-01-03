<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店库存汇总表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form inline>
                <el-form-item label="商品名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-input></el-input>
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
                    <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'reset')"></el-button>
                </el-form-item>
            </el-form>
            <div style="padding-bottom: 20px;text-align: right">
                <el-button @click="handleClick('', '', 'export')" type="primary">导出</el-button>
            </div>
            <el-table border>
                <el-table-column label="序号" header-align="center" align="center"></el-table-column>
                <el-table-column label="分类" header-align="center" align="center"></el-table-column>
                <el-table-column label="商品名称" header-align="center" align="center"></el-table-column>
                <el-table-column label="期初结存数量" header-align="center" align="center"></el-table-column>
                <el-table-column label="期初结存金额" header-align="center" align="center"></el-table-column>
                <el-table-column label="本期入库数量" header-align="center" align="center"></el-table-column>
                <el-table-column label="本期入库金额" header-align="center" align="center"></el-table-column>
                <el-table-column label="本期出库数量" header-align="center" align="center"></el-table-column>
                <el-table-column label="本期出库金额" header-align="center" align="center"></el-table-column>
                <el-table-column label="期末结存数量" header-align="center" align="center"></el-table-column>
                <el-table-column label="期末结存金额" header-align="center" align="center"></el-table-column>
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
    export default {
        name: "storeSummary",
        data(){
            return{
                totalNum:0,
                searchForm:{
                    pageNo:1,
                    pageSize:15,
                },
                dataTime:'',
            }
        },
        methods:{
            onSearch(){

            },
            handleClick(){

            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
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

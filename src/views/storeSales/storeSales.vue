<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店进销管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form inline>
                <el-form-item label="产品名称">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker
                            v-model="formData.recodDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch"
                               native-type="submit"></el-button>
                </el-form-item>
            </el-form>
            <el-table border :data="goodsListData">
                <el-table-column label="序号" type="index" align="center" header-align="center"></el-table-column>
                <el-table-column label="日期" prop="recodDate" align="center" header-align="center"></el-table-column>
                <el-table-column label="名称" prop="name" align="center" header-align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center" header-align="center"></el-table-column>
                <el-table-column label="当日入库" prop="inStockNum" align="center" header-align="center"></el-table-column>
                <el-table-column label="当日销售" prop="outStockNum" align="center" header-align="center"></el-table-column>
                <el-table-column label="当日结余" prop="surplusStock" align="center"
                                 header-align="center"></el-table-column>
                <el-table-column label="单位" prop="standard" align="center" header-align="center"></el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formData.pageNo"
                    :page-sizes="[15, 30, 45, 60]"
                    :page-size="formData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import {requestStoreSales, requestStoreSalesPage} from '../../api/api'

    export default {
        name: "storeSales",
        data() {
            return {
                formData: {
                    recodDate: '',
                    time: '',
                    pageNo: 1,
                    pageSize: 15,
                },
                totalNum: 0,
                goodsListData: []

            }
        },
        created() {
            this.getAjaxPage();
        },
        methods: {
            onSearch() {
                this.getPage();
            },
            handleSizeChange(val) {
                this.formData.pageSize = val;
                this.getPage();
            },
            handleCurrentChange(val) {
                this.formData.pageNo = val;
                this.getPage();
            },
            getPage() {
                requestStoreSalesPage(this.formData).then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        this.goodsListData = res.data.items;
                        this.totalNum = parseInt(res.data.totalNum);
                    }
                })
            },
            getAjaxPage() {
                const time = new Date();
                let dataTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() > 10 ? time.getDate() : '0' + time.getDate()}`;
                let customerId = sessionStorage.getItem('customerId');
                requestStoreSales({recodDate: dataTime, customerId: customerId}).then((res) => {
                })
                setTimeout(() => {
                    this.getPage();
                }, 500);
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 4;
        padding-left: 20px;
        background-color: #ffffff;
    }

    .contentBody {
        margin: 20px;
        background-color: #ffffff;
        padding: 20px;

        .el-pagination {
            padding-top: 10px;
        }

        .el-aside {
            width: auto;
            height: 700px;
        }
    }
</style>

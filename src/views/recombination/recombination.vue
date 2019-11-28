<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店商品重组</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline" label-position="left">
                <el-row :gutter="13">
                    <el-col :span="5">
                            <el-form-item label="商品名称">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
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
                <el-table-column align="center" header-align='center' prop="isDeleteName" label="是否启用" width="120"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="205">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" type="primary" size="mini" @click="handleClickEdit(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-edit" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'product')">生成库存</el-button>
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
            <el-dialog
                title="信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-form :inline="true" :model="searchForm"  class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="商品名称">
                            <el-input v-model="searchFormData.name"   placeholder="请输入" style="width:330px;" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="最大份数" style="display: block">
                            <span v-text="searchFormData.Maxnumber" style="display: block;"></span>
                        </el-form-item>
                        <el-form-item label="合成份数">
                            <el-input-number v-model="searchFormData.number" @change="handClickNumber" :min="1" :step="1"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                </el-form>
                <span style="display:block;margin-bottom:20px;">消耗配料</span>
                <el-table :data="tableData1" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="商品名称" ></el-table-column>
                <!-- <el-table-column align="center" header-align='center' prop="stock" label="库存" width="80"></el-table-column>-->
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="80"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmData" :loading="loading">确 定</el-button>
                </span>
                </el-dialog>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestDeleteGoods,requestRecombinationgenerateStock,requestRecombinationgeneratemaxNumber, requestGoodsStatus,requestRecimbinationCheck, requestSearchGoods,requestisEnabledGoods,requestRecombinationPage} from '../../api/api';

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
                tableData1:[],
                dialogVisible:false,
                param: {
                    pageNo:1,
                    pageSize:15,
                    name:'',
                    isSale:1,
                    customerId:customerId,//门店ID
                    isDelete:1,
                    nature:0,

                },
                searchFormData:{
                    name:'',
                    number:0,
                    Maxnumber:'',
                },
                totalNum:0,
                dialogForm:{
                },
                parentId:'',
            }
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleClose(){
                this.dialogVisible=false;
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
            confirmData(){
                this.loading=true;
                var y = String(this.searchFormData.number).indexOf(".") + 1;//获取小数点的位置
                var count = String(this.searchFormData.number).length - y;//获取小数点后的个数
                if(y > 0) {
                    this.$message({
                        type:'error',
                        message:'合成份数请不要输入小数',
                        duration:1000,
                    });
                    this.saveLoading=false;
                    this.loading=false;
                    return false;
                }
                if(this.searchFormData.number>this.searchFormData.Maxnumber && this.searchFormData.Maxnumber !=''){
                    this.$message({
                        type:'error',
                        message:'合成份数输入有误',
                        duration:1000,
                    });
                    this.saveLoading=false;
                    this.loading=false;
                    return  false;
                }
                this.$confirm('确认生成库存')
                    .then(_ => {
                        let addPrams={
                            parentId:this.parentId,
                            number:this.searchFormData.number,
                        };
                        requestRecimbinationCheck(addPrams).then((res)=>{
                            if(res.status==500){
                                this.$message({
                                    type:'error',
                                    message:res.data,
                                    duration:2000,
                                })
                                this.loading=false;
                            }else{
                                requestRecombinationgenerateStock(addPrams).then((res)=>{
                                    if(res.status==200){
                                        this.dialogVisible=false;
                                        this.$message({
                                            type:'success',
                                            message:'操作成功',
                                        })
                                        this.loading=false;
                                    }
                                })
                            }
                        })
                })
                .catch(_ => {
                    this.$message({
                        type:'error',
                        message:'已取消生成库存',
                    })
                    this.saveLoading=false;
                    this.loading=false;
                });


            },
            handleClick(index, row, doType) {
                let _this = this;
                this.dialogVisible=true;
                this.searchFormData.name=row.name;
                this.parentId=row.id;
                requestRecombinationPage({parentId:row.id}).then(res => {
                    _this.tableData1 = [];
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData1 = data;
                        this.tableData1.forEach((item)=>{
                            this.$set(item,'num',0);
                        })
                        for(let i=0;i<this.tableData1.length;i++){
                            this.tableData1[i].num=this.tableData1[i].number;
                        }
                    }else{
                        _this.tableData1 = [];
                    }
                });
                requestRecombinationgeneratemaxNumber({parentId:row.id}).then((res)=>{
                        if(res.status==200){
                            this.searchFormData.Maxnumber=res.data;
                        }
                });
            },
            handleClickEdit(index, row, doType){
                sessionStorage.setItem('id', row.id);
                this.$router.push({ path: '/editrecombination'});
            },
            handClickNumber(val){
                
                for(let i=0;i<this.tableData1.length;i++){
                    this.tableData1[i].number=val*this.tableData1[i].num;
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
                //this.param.isDelete=this.searchForm.isDelete;
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

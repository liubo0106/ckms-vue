<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/inStockOrder' }">入库单管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="text-align: right">
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
                <el-form-item label="入库单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15" disabled></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="入库类型" prop="type">
                            <el-select v-model="editForm.type" disabled>
                                <el-option  label="采购" :value="1">采购</el-option>
                                <el-option label="直接入库" :value="2">直接入库</el-option>
                                <el-option label="门店退货" :value="3">门店退货</el-option>
                                <el-option label="领料单" :value="4">领料单</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入库日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime" disabled value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item  label="采购单" prop="purchaseOrderIds" v-if="editForm.type==1">
                    <el-select v-model="editForm.purchaseOrderIds" placeholder="请选择"  multiple class="self-select-width" disabled>
                        <el-option v-for="item in purchaseList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="退货单" prop="storeReturnIds"  v-if="editForm.type==3" >
                    <el-select v-model="editForm.storeReturnIds" placeholder="请选择" disabled multiple class="self-select-width">
                        <el-option v-for="item in storeReturnList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="领料单" prop="pickOrderIds"  v-if="editForm.type==4" >
                    <el-select v-model="editForm.pickOrderIds" placeholder="请选择" disabled class="self-select-width">
                        <el-option v-for="item in pickOrderList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <!-- <el-form-item label="总价" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalPrice" :maxlength="200" disabled></el-input>
                        </el-form-item>-->
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="editForm.remark" :maxlength="200" disabled></el-input>
                </el-form-item>
            </el-form>
            <!--采购单明细-->
            <div class="contentBody" v-if="id">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestStoreReturnPage,requestSearchPurchase,requestInStockOrderDetailInfo,
        requestListByInPid,requestSearchProductList ,requestMaterialPage} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            return {
                tableData: null,//采购单明细列表
                //采购单弹出层
                formLabelWidth: '80px',
                dialogFormVisible:false,
                dialogTitle:'新增采购明细',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    productInfoId:''
                },
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    purchaseOrderIds:[],
                    storeReturnIds:[],
                    type:1,
                    pickOrderIds:''
                },
                rules: {

                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                purchaseList:[],
                pickOrderList:[],
                param: {
                    pageSize:-1
                },
                param2: {
                    pid:''
                },
                param3: {
                    pageSize:-1,
                    // status:1
                },
                productList:[]
            }
        },
        methods: {
            //领料单列表
            getAjaxPickOrderList(){
                let _this = this;
                requestMaterialPage(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.pickOrderList = data;
                    }else{
                        _this.pickOrderList = [];
                    }
                });
            },
            //查询明细列表
            getAjaxList(){
                let _this = this;
                requestListByInPid(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //如库单详情
            requestClientInfo(){
                let _this = this;
                requestInStockOrderDetailInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.type = data.type;
                            _this.editForm.purchaseOrderIds = data.purchaseOrderIds.split(',');
                            _this.editForm.storeReturnIds = data.storeReturnIds.split(',');
                            _this.editForm.pickOrderIds = data.pickOrderIds;
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            goBack() {
                this.$router.push({ path: '/inStockOrder' });
            },
            //请求商品信息
            getAjaxProduct(){
                let _this = this;
                requestSearchProductList(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.productList = data;
                        }else{
                            _this.productList = [];
                        }
                    }
                });
            },
            //采购单列表
            getAjaxPList(){
                let _this = this;
                requestSearchPurchase(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.purchaseList = data;
                    }else{
                        _this.purchaseList = [];
                    }
                });
            },
            //退货单列表
            getAjaxOList(){
                let _this = this;
                requestStoreReturnPage(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.storeReturnList = data;
                    }else{
                        _this.storeReturnList = [];
                    }
                });
            }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('inId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.requestClientInfo();
                this.getAjaxList();
            }
            //采购单列表
            this.getAjaxPList();
            this.getAjaxProduct();
            this.getAjaxOList();
            this.getAjaxPickOrderList();
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
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .self-select-width{
        width: 100%;
    }
    .self-cascader-width{
        width: 50%;
    }
</style>
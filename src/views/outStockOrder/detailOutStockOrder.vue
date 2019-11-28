<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/outStockOrder' }">出库单管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="text-align: right">
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
                <el-form-item label="出库单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15" disabled></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="出库类型" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择" disabled>
                                <el-option  label="门店订单" :value="1">门店订单</el-option>
                                <el-option label="自主配货" :value="2">自主配货</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出库日期" style="width: 316px" prop="dateTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd" disabled></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item v-if="editForm.type==1" label="店铺订单" style="width:100%" prop="salesOrderIds">
                    <el-select v-model="editForm.salesOrderIds" placeholder="请选择" style="width:100%" disabled>
                        <el-option v-for="item in purchaseList" :label="item.name+' ['+item.customerName+']'" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--  <el-form-item label="总价" style="width: 316px">
                              <el-input placeholder='请输入' v-model="editForm.totalPrice" :maxlength="200" disabled></el-input>
                          </el-form-item>-->

                        <el-form-item  label="物流单号" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.logisticsNo" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label=" 物流车牌号" style="width: 316px" >
                            <el-select v-model="editForm.logisticsId" @change="changeLogistics" placeholder="请选择" disabled>
                                <el-option v-for="item in LogisticsList" :label="item.plateNumber" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物流电话" style="width: 316px" v-if="editForm.phone">
                            <el-input placeholder='请输入' v-model="editForm.phone" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="物流公司名称" style="width: 316px" v-if="editForm.company">
                            <el-input placeholder='请输入' v-model="editForm.company" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物流联系人" style="width: 316px" v-if="editForm.contact">
                            <el-input placeholder='请输入' v-model="editForm.contact" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="8">
                        <el-form-item  v-if="editForm.type==2"  label="门店" prop="customerId">
                            <el-select v-model="editForm.customerId" placeholder="请选择" disabled>
                                <el-option v-for="item in customerList" :label="item.name"  :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="供应商" prop="supplierId">
                            <el-select v-model="editForm.supplierId" @change="changeSupplier" placeholder="请选择" style="width: 100%" disabled>
                                <el-option v-for="item in supplierList" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="供应内容" v-if="editForm.supplierId">
                    <el-input v-model="content" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200" disabled></el-input>
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
                </el-table>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSalesOrderPage,requestOutStockOrderDetailInfo,requestSaveOutStockOrder,requestListByOutPid,
        requestSearchProductList ,requestSearchLogistics,requestSearchClient,requestSaveSalesDetailList,requestSearchSupplier,requestSupplierDataDic,requestSearchAssets} from '../../api/api';
    export default {
        name: 'edit-out-stock-order',
        data() {
            return {
                tableData: null,//采购单明细列表
                typeBool:false,
                logisticsInfo:false,//物流信息
                //采购单弹出层
                formLabelWidth: '80px',
                dialogFormVisible:false,
                dialogTitle:'新增出库单明细',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    name:'',
                    serialNo:'',
                    productInfoId:'',
                    type:1,
                    category:'',
                    model:""
                },
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    salesOrderIds:[],
                    logisticsNo:'',
                    logisticsId:'',
                    customerId:'',
                    supplierId:'',
                    company:'',
                    type:1
                },
                //表单校验
                rules: {
                    name: [
                        { required: true, message: '请输入出库单名称', trigger: 'blur' },
                    ],
                    salesOrderIds: [
                        { required: true, message: '请选择店铺订单', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请选择出库日期', trigger: 'blur' },
                    ],
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                purchaseList:[],
                LogisticsList:[],
                customerList:[],
                groupList:[],
                supplierList:[],
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
                param4: {
                    content:"",
                    pageSize:-1,
                },
                param5: {
                    pageSize:-1,
                    status:1,
                    type:1
                },
                param6: {
                    content:"",
                    pageSize:-1,
                    status:1,
                    type:2
                },
                standardParam: {
                    type:"单位"
                },
                productList:[],
                content:'',
                standardDataDicList:[],
                consumetList:[],
                fixedList:[]
            }
        },
        methods: {
            changeFixed(val){
                let tn = {};
                tn = this.fixedList.find((item)=>{
                    return item.id === val;
                });
                this.dialogForm.name = tn.name;
                this.dialogForm.serialNo = tn.serialNo;
                this.dialogForm.model = tn.model;
                this.dialogForm.category = tn.category;
            },
            changeConsume(val){
                let tn = {};
                tn = this.consumetList.find((item)=>{
                    return item.id === val;
                });
                this.dialogForm.name = tn.name;
                this.dialogForm.serialNo = tn.serialNo;
                this.dialogForm.model = tn.model;
                this.dialogForm.category = tn.category;
            },
            //请求单位
            getAjaxStandardDataDic(){
                let _this = this;
                requestSupplierDataDic(_this.standardParam).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.standardDataDicList = data;
                        }else{
                            _this.standardDataDicList = [];
                        }
                    }
                });
            },
            changeProduct(val){
                let tn = {};
                tn = this.productList.find((item)=>{
                    return item.id === val;
                });
                this.dialogForm.standard = tn.standard;
                this.dialogForm.name = tn.name;
                this.dialogForm.serialNo = tn.serialNo;
            },
            //打包名称
            changeGroup(val){
                let tn = {};
                tn = this.groupList.find((item)=>{
                    return item.id === val;
                });
                //this.maxNumber = tn.stock;
                this.dialogForm.standard = tn.standard;
                this.dialogForm.name = tn.name;
                this.dialogForm.serialNo = tn.serialNo;
            },
            //供应商
            changeSupplier(val){
                let _this = this;
                var st = setInterval(function () {
                    if(_this.supplierList && _this.supplierList.length>0){
                        let tn = {};
                        tn = _this.supplierList.find((item)=>{
                            return item.id === val;
                        });
                        if(tn.content){
                            _this.content = tn.content;
                        }
                        clearInterval(st);
                    }
                },100)
            },
            //物流信息
            changeLogistics(val){
                let tn = {};
                tn = this.LogisticsList.find((item)=>{
                    return item.id === val;
                });
                this.editForm.phone = tn.phone;
                this.editForm.company = tn.company;
                this.editForm.contact = tn.contact;
            },
            //查询明细列表
            getAjaxList(bool){
                let _this = this;
                requestListByOutPid(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                        let num = 0;
                        let num2 = 0;
                        for(let i=0;i<_this.tableData.length;i++){
                            num += (_this.tableData[i].price*_this.tableData[i].number);
                            num2 += _this.tableData[i].number;
                        }
                        _this.editForm.totalPrice =num;
                        _this.editForm.totalNumber =num2;
                        //如果是新增明细后的刷新，再次提交表单
                        if(bool == 1){
                            _this.requestClientInfo();
                        }
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //入库单详情
            requestClientInfo(){
                let _this = this;
                requestOutStockOrderDetailInfo({id:this.id}).then(res => {
                    this.logisticsInfo=true;//物流信息
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.salesOrderIds = data.salesOrderIds;
                            _this.editForm.logisticsId = data.logisticsId;
                            if(data.logistics){
                                _this.editForm.plateNumber = data.logistics.plateNumber;
                                _this.editForm.contact = data.logistics.contact;
                                _this.editForm.phone = data.logistics.phone;
                                _this.editForm.company = data.logistics.company;
                            }

                            _this.editForm.logisticsNo = data.logisticsNo;
                            _this.editForm.supplierId = data.supplierId;
                            if(data.supplierId){
                                _this.changeSupplier(data.supplierId);
                            }
                            _this.editForm.type=data.type;
                            _this.editForm.customerId = data.customerId;
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
                this.$router.push({ path: '/outStockOrder' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let tn = {};
                        tn = this.supplierList.find((item)=>{
                            return item.id === _this.editForm.supplierId;
                        });
                        let editFormParam ={
                            id: _this.id,
                            name: _this.editForm.name,
                            dateTime: _this.editForm.dateTime,
                            totalNumber: _this.editForm.totalNumber,
                            totalPrice : _this.editForm.totalPrice,
                            remark : _this.editForm.remark,
                            logisticsNo : _this.editForm.logisticsNo,
                            customerId : _this.editForm.customerId,
                            supplierId: _this.editForm.supplierId,
                            type : _this.editForm.type,
                            salesOrderIds: _this.editForm.salesOrderIds.toString(),
                            logisticsId: _this.editForm.logisticsId.toString()
                        };
                        requestSaveOutStockOrder(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('outId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.requestClientInfo();
                                    _this.getAjaxList(2);
                                    _this.saveLoading = false;
                                    _this.typeBool = true;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            //销售单列表
            getAjaxPList(){
                let _this = this;
                requestSalesOrderPage(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.purchaseList = data;
                    }else{
                        _this.purchaseList = [];
                    }
                });
            },
            //物流信息列表
            getAjaxLogisticsList(){
                let _this = this;
                requestSearchLogistics(_this.param4).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.LogisticsList = data;
                    }else{
                        _this.LogisticsList = [];
                    }
                });
            },
            //请求门店信息
            getAjaxClient(){
                let _this = this;
                requestSearchClient(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.customerList = data;
                    }else{
                        _this.customerList = [];
                    }
                });
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
            //请求打包信息
            getAjaxGroup(){
                let _this = this;
                requestSaveSalesDetailList().then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.groupList = data;
                        }else{
                            _this.groupList = [];
                        }
                    }
                });
            },
            //请求供应商
            getAjaxSupplier(){
                let _this = this;
                requestSearchSupplier(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.supplierList = data;
                    }else{
                        _this.supplierList = [];
                    }
                });
            },
            //请求固定资产信息
            getAjaxFixed(){
                let _this = this;
                requestSearchAssets(_this.param5).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.fixedList = data;
                        }else{
                            _this.fixedList = [];
                        }
                    }
                });
            },
            //请求易耗品信息
            getAjaxConsume(){
                let _this = this;
                requestSearchAssets(_this.param6).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.consumetList = data;
                        }else{
                            _this.consumetList = [];
                        }
                    }
                });
            }
        },
        beforeMount() {
            this.getAjaxSupplier();
            //采购单编辑
            let id = sessionStorage.getItem('outId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.typeBool = true;
                this.requestClientInfo();
                this.getAjaxList(2);
            }
            //采购单列表
            this.getAjaxPList();
            this.getAjaxProduct();
            this.getAjaxLogisticsList();
            this.getAjaxClient();
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
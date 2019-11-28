<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/storereturn' }">门店退货管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="text-align: right">
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
                <el-form-item label="出库单名称" prop="name">
                    <el-input disabled placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="总价" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.totalPrice" :maxlength="200" disabled></el-input>
                        </el-form-item>-->
                        <el-form-item label="物流电话" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.phone" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label=" 物流车牌号" style="width: 316px" >
                            <el-select v-model="editForm.logisticsId" placeholder="请选择" disabled>
                                <el-option v-for="item in LogisticsList" :label="item.plateNumber" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="物流单号" style="width: 316px">
                            <el-input disabled placeholder='请输入' v-model="editForm.logisticsNo" :maxlength="200"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="logisticsInfo">
                    <el-col :span="8">
                        <el-col :span="8">
                            <el-form-item label="物流公司名称" style="width: 316px">
                                <el-input placeholder='请输入' v-model="editForm.company" :maxlength="200" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物流联系人" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.contact" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="出库日期" style="width: 316px" prop="dateTime">
                            <el-date-picker disabled type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="logisticsInfo">
                    <el-col :span="8">

                    </el-col>
                    <el-col :span="8">
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input disabled type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
                <!--<el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>-->
            </el-form>
            <!--采购单明细-->
            <div class="contentBody" v-if="id">
                <el-form label-width="60px" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label-width="0">
                                <!-- <el-button icon="el-icon-plus" circle @click="handleClickDetail('', '', 'add')"></el-button>-->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="原料名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <!--<el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>-->
                    <!--<el-table-column align="center" header-align='center' label="操作" width="260">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleClickDetail(scope.$index, scope.row, 'edit')">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>-->
                </el-table>
                <!--采购单明细添加编辑弹出层-->
                <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible">
                    <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                        <el-form-item  label="原料名称" :label-width="formLabelWidth" prop="productInfoId">
                            <el-select v-model="dialogForm.productInfoId" placeholder="请选择" @change="changeProduct">
                                <el-option v-for="item in productList" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位" :label-width="formLabelWidth" prop="standard">
                            <el-input v-model="dialogForm.standard" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="数量" :label-width="formLabelWidth" prop="number">
                            <el-input v-model="dialogForm.number" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
                            <el-input v-model="dialogForm.price" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <!--取消和确定按钮-->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormAdd('dialogForm')" :loading="saveLoading">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSalesOrderPage,requestStoreReturnDetailInfo,requestSaveOutStockOrder,requestListByStoreReturnPid,requestDeleteOutDetail,requestSearchProductList ,requestSaveOutStockDetail,requestSearchLogistics} from '../../api/api';
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
                    salesOrderIds:[],
                    logisticsNo:'',
                    logisticsId:'',

                },
                //表单校验
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    salesOrderIds: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                purchaseList:[],
                LogisticsList:[],
                param: {
                    pageSize:-1
                },
                param2: {
                    pid:''
                },
                param3: {
                    pageSize:-1,
                    status:1
                },
                param4: {
                    content:"",
                    pageSize:-1,
                },
                productList:[],

            }
        },
        methods: {
            changeProduct(val){
                let tn = {};
                tn = this.productList.find((item)=>{
                    return item.id === val;
                });
                this.dialogForm.standard = tn.standard;
            },
            /*点击按钮事件*/
            handleClickDetail(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    _this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteOutDetail(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.getAjaxList(1);
                                    }
                                });
                            }else{
                                _this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'add'){
                    //添加
                    _this.addOrg('add',row);
                }else if(doType == 'edit'){
                    //编辑
                    _this.addOrg('edit',row);
                }
            },
            //显示添加编辑页面弹出层
            addOrg(type,row){
                this.dialogFormVisible = true;
                if(type == 'add'){
                    //清除以前数据
                    this.dialogForm.standard ='';
                    this.dialogForm.number = '';
                    this.dialogForm.id = '';
                    this.dialogForm.price = 0;
                    this.dialogForm.productInfoId = '';
                }else{
                    //编辑
                    this.dialogForm.standard = row.standard;
                    this.dialogForm.id = row.id;
                    this.dialogForm.number = row.number;
                    this.dialogForm.price = row.price;
                    this.dialogForm.productInfoId = row.productInfoId;
                }
            },
            //添加编辑点击确认数据回显
            dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                addParam ={
                    id: this.dialogForm.id,
                    standard:this.dialogForm.standard,
                    number:this.dialogForm.number,
                    price:this.dialogForm.price,
                    productInfoId:this.dialogForm.productInfoId,
                    outStockOrderId:_this.id
                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestSaveOutStockDetail(addParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.saveLoading = false;//关闭提交按钮loding
                                        _this.dialogFormVisible = false;//关闭弹出层
                                        _this.getAjaxList(1);
                                    }
                                });
                            }else{
                                _this.saveLoading = false;
                                _this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            //查询明细列表
            getAjaxList(bool){
                let _this = this;
                requestListByStoreReturnPid(_this.param2).then(res => {
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
                            _this.submitForm('editForm');
                        }
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //入库单详情
            requestClientInfo(){
                let _this = this;
                requestStoreReturnDetailInfo({id:this.id}).then(res => {
                    this.logisticsInfo=true;//物流信息
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.logisticsId = data.logisticsId;
                            _this.editForm.plateNumber = data.logistics.plateNumber;
                            _this.editForm.contact = data.logistics.contact;
                            _this.editForm.phone = data.logistics.phone;
                            _this.editForm.company = data.logistics.company;
                            _this.editForm.logisticsNo = data.logisticsNo;
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
                this.$router.push({ path: '/storereturn' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            id: _this.id,
                            name: _this.editForm.name,
                            dateTime: _this.editForm.dateTime,
                            totalNumber: _this.editForm.totalNumber,
                            totalPrice : _this.editForm.totalPrice,
                            remark : _this.editForm.remark,
                            logisticsNo : _this.editForm.logisticsNo,
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
            }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('storeReturnId');
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
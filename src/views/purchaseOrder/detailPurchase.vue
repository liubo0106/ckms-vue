<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/purchaseOrder' }">采购单管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="text-align: right">
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
                <el-form-item label="采购单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15" disabled></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <!--<el-form-item  label="供应商" prop="supplierId">-->
                            <!--<el-select v-model="editForm.supplierId" placeholder="请选择" disabled>-->
                                <!--<el-option v-for="item in supplierList" :label="item.name" :value="item.id"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="采购日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  :maxlength="200" disabled></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200"  disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="总价" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalPrice" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input type="textarea"  v-model="editForm.remark" :maxlength="200" disabled></el-input>
                </el-form-item>
            </el-form>
            <!--采购单明细-->
            <div class="contentBody" v-if="id">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="原料名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestPurchaseInfo, requestSavePurchase,requestSearchSupplier,requestListByPid, requestDeletePurchaseDetail,requestSavePurchaseDetail,requestSearchProductList} from '../../api/api';
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
                    orderNo: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    supplierId:''
                },
                rules: {

                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                supplierList:[],
                productList:[],
                param: {
                    pageNo:1,
                    pageSize:0
                },
                param2: {
                    pid:''
                }
            }
        },
        methods: {
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
                        requestDeletePurchaseDetail(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.getAjaxList();
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
                    purchaseOrderId:_this.id
                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestSavePurchaseDetail(addParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.saveLoading = false;//关闭提交按钮loding
                                        _this.dialogFormVisible = false;//关闭弹出层
                                        _this.getAjaxList();
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
            getAjaxList(){
                let _this = this;
                requestListByPid(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //采购单编辑
            requestClientInfo(){
                let _this = this;
                requestPurchaseInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.orderNo = data.orderNo;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.supplier = data.supplierName;
                            _this.editForm.supplierId = data.supplierId;
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
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
            goBack() {
                this.$router.push({ path: '/purchaseOrder' });
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
                            name: _this.editForm.name,
                            dateTime: _this.editForm.dateTime,
                            totalNumber: _this.editForm.totalNumber,
                            totalPrice : _this.editForm.totalPrice,
                            remark : _this.editForm.remark,
                            supplierId: _this.editForm.supplierId,
                            supplierName: tn.name
                        };
                        requestSavePurchase(editFormParam).then(res => {

                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('oId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.requestClientInfo();
                                    _this.getAjaxList();
                                    _this.saveLoading = false;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('oId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.requestClientInfo();
                //采购单明细
                this.getAjaxList();
            }
            this.getAjaxSupplier();
            this.getAjaxProduct();
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

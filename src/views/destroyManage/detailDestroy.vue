<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/destroy' }">报损单管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="text-align: right">
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
                <div style="display: flex">
                    <el-form-item label="报损单名称" prop="name">
                        <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="报损单日期" style="width: 316px" prop="dateTime">
                        <el-date-picker disabled type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="总量"  label-width="80px" style="width: 316px">
                        <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="备注">
                    <el-input disabled type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
            </el-form>
            <div class="contentBody" v-if="isShow">
                <span style="display: block;margin-bottom: 15px;">驳回原因</span>
                <el-table :data="contentData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="comment" label="原因"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="createUser" label="驳回人"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="createTime" label="时间"></el-table-column>
                </el-table>
            </div>
            <!--采购单明细-->
            <div class="contentBody" v-if="id">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <!--<el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>-->
                </el-table>
                <!--采购单明细添加编辑弹出层-->
                <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" style="width: 60%;left:35%;">
                    <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                        <el-form-item label="商品类型" :label-width="formLabelWidth" prop="type">
                            <el-select v-model="dialogForm.type" placeholder="请选择" >
                                <el-option  label="打包" value="1">打包</el-option>
                                <el-option label="原材料" value="2">原材料</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  v-if="dialogForm.type==2" label="原料名称" :label-width="formLabelWidth" prop="productInfoId">
                            <el-select v-model="dialogForm.productInfoId" placeholder="请选择" @change="changeProduct">
                                <el-option v-for="item in productList" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="dialogForm.type==1"  label="打包名称" :label-width="formLabelWidth" prop="productInfoId">
                            <el-select  v-model="dialogForm.productInfoId" placeholder="请选择" @change="changeGroup">
                                <el-option  v-for="item in groupList" :label="item.name"  :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位" :label-width="formLabelWidth" prop="standard" style="width: 300px">
                            <el-input v-model="dialogForm.standard" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="数量" :label-width="formLabelWidth" prop="number">
                            <el-input-number size="medium" v-model="dialogForm.number" :min="0" :max="999999999" :step="1" ></el-input-number>
                        </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                            <el-input v-model="dialogForm.remark" autocomplete="off"></el-input>
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
    import { requestDestroyInfo,requestSaveDestroy,requestListByDestroyPid,requestDeleteDestroyDetail,requestSearchProductList ,requestSaveDestroyDetail,requestSearchClient,requestSaveSalesDetailList,requestListByRejectRecordPid} from '../../api/api';
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
                dialogTitle:'新增报损单明细',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    name:'',
                    serialNo:'',
                    productInfoId:'',
                    type:'1',
                    remark:''
                },
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    logisticsNo:'',
                    logisticsId:'',
                    customerId:'',
                    company:'',
                    type:'1',
                },
                //表单校验
                rules: {
                    name: [
                        { required: true, message: '请输入报损单名称', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请选择报损单日期', trigger: 'blur' },
                    ],
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                LogisticsList:[],
                customerList:[],
                groupList:[],
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
                isShow:false,
                contentData:[],

            }
        },
        methods: {

            //默认显示今天
            getdatatime(){
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let newMonth = month>9?month:"0"+month;  //月
                let day = nowDate.getDate();
                let newDay =day>9?day:"0"+day; //日
                this.editForm.dateTime= year + '-' + newMonth + '-' + newDay;
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
                        requestDeleteDestroyDetail(deleteParam).then(res => {
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
                    this.dialogForm.remark = '';
                }else{
                    //编辑
                    this.dialogForm.standard = row.standard;
                    this.dialogForm.id = row.id;
                    this.dialogForm.number = row.number;
                    this.dialogForm.price = row.price;
                    this.dialogForm.productInfoId = row.productInfoId;
                    this.dialogForm.remark = row.remark;
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
                    name:this.dialogForm.name,
                    serialNo:this.dialogForm.serialNo,
                    type:this.dialogForm.type,
                    productInfoId:this.dialogForm.productInfoId,
                    remark:this.dialogForm.remark,
                    wasteOrderId:_this.id
                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestSaveDestroyDetail(addParam).then(res => {
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
                requestListByDestroyPid(_this.param2).then(res => {
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
                requestListByRejectRecordPid(_this.param2).then((res)=>{
                    console.log(res);
                    if(res.data.length!=0){
                        this.isShow=true;
                        this.contentData=res.data;
                    }
                })
            },
            //入库单详情
            requestClientInfo(){
                let _this = this;
                requestDestroyInfo({id:this.id}).then(res => {
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
                            _this.editForm.logisticsNo = data.logisticsNo;
                            _this.editForm.type=data.type+"";
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
                this.$router.push({ path: '/destroy' });
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
                            customerId : _this.editForm.customerId,
                            type : _this.editForm.type,
                            logisticsId: _this.editForm.logisticsId.toString()
                        };
                        requestSaveDestroy(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('destroyId',res.data.id);
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
            //请求门店信息
            getAjaxSupplier(){
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
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('destroyId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.typeBool = true;
                this.requestClientInfo();
                this.getAjaxList(2);
            }
            this.getAjaxProduct();
            this.getdatatime()
            this.getAjaxSupplier()
            this.getAjaxGroup()
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

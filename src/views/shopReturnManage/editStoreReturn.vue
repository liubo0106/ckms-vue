<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/storereturn' }">门店退货管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="退货单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物流电话" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.phone" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label=" 物流车牌号" style="width: 316px" >
                            <el-select v-model="editForm.logisticsId" placeholder="请选择" clearable>
                                <el-option v-for="item in LogisticsList" :label="item.plateNumber" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="物流单号" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.logisticsNo" :maxlength="200"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="logisticsInfo">
                    <el-col :span="8">
                        <el-form-item label="物流公司名称" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.company" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="物流联系人" style="width: 316px">
                            <el-input placeholder='请输入' v-model="editForm.contact" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="退货日期" style="width: 316px" prop="dateTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
            <!--采购单明细-->
            <div class="contentBody" v-if="id">
                <el-form label-width="60px" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label-width="0">
                                <el-button icon="el-icon-plus" circle @click="handleClickDetail('', '', 'add')"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="tableListData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="100">
                        <template slot-scope="scope" >
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
        <!--退货明细添加编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="门店商品" name="1">
                    <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="searchForm.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableData[scope.$index].number" :min="0" :max="tableData[scope.$index].stock"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickAdd(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="param.pageNo"
                            :page-size="param.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalNum">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="固定资产" name="2">
                    <el-form :inline="true" :model="searchForm2" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                            <el-input v-model="searchForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                            <el-input v-model="searchForm2.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch2" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData2" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableData2[scope.$index].number" :min="0" :max="tableData2[scope.$index].stock"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickAdd2(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChange2"
                            :current-page.sync="param2.pageNo"
                            :page-size="param2.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalNum2">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestSearchGoods,requestStoreReturnDetailInfo,requestSaveStoreReturn,requestListByStoreReturnPid,requestDeleteStoreReturnDetail ,requestSaveStoreReturnDetail,requestSearchLogistics,} from '../../api/api';
    export default {
        name: 'edit-out-stock-order',
        data() {
            var customerId = sessionStorage.getItem('customerId');
            return {
                activeName:'1',
                tableListData: null,//采购单明细列表
                typeBool:false,
                classify:1,
                tableData: null,//采购单明细列表
                logisticsInfo:false,//物流信息
                //采购单弹出层
                formLabelWidth: '80px',
                dialogFormVisible:false,
                dialogTitle:'新增退货单明细',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    name:'',
                    serialNo:'',
                    productInfoId:'',
                    goodsId:'',
                    type:'',
                    customerId:customerId
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
                    customerId:customerId,
                    company:'',
                    type:'',
                    plateNumber:[],
                },
                //表单校验
                rules: {
                    name: [
                        { required: true, message: '请输入退货单名称', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请选退货日期', trigger: 'blur' },
                    ],
                    productInfoId: [
                        { required: true, message: '请选择名称', trigger: 'blur' },
                    ],
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                purchaseList:[],
                LogisticsList:[],
                customerList:[],
                param: {
                    pageSize:-1
                },

                param4: {
                    content:"",
                    pageSize:-1,
                    isDelete:1,
                },
                param5: {
                    pageSize:-1,
                    customerId:customerId,//门店ID
                    type:'2'

                },

                searchForm: {
                    name: '',
                    serialNo:''
                },
                tableData: null,
                param: {
                    name:"",
                    pageNo:1,
                    type:1,
                    pageSize:10,
                    serialNo:'',
                    isDelete:1,
                },
                totalNum:0,
                searchForm2: {
                    name: '',
                    serialNo:''
                },
                tableData2: null,
                param2: {
                    name:"",
                    pageNo:1,
                    type:2,
                    pageSize:10,
                    serialNo:'',
                    isDelete:1,
                },
                totalNum2:0,
                param3: {
                    pid:""
                }

            }
        },
        methods: {
            handleClick(tab, event) {
                if(tab.name == '1'){
                    this.dialogForm.type = 1;
                    this.getAjaxList();
                }else if(tab.name == '2'){
                    this.dialogForm.type = 2;
                    this.getAjaxList2();
                }
            },
            changeType(){
                this.dialogForm.productInfoId = '';
            },

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
                        requestDeleteStoreReturnDetail(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.getAjaxList(1);
                                        _this.getDetailAjaxList();
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
                    //_this.addOrg('add',row);
                    _this.dialogFormVisible = true;
                    _this.getAjaxList();
                }else if(doType == 'edit'){
                    //编辑
                    //_this.addOrg('edit',row);
                }
            },
            handleClickAdd(index,row){
                if(this.tableData[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={

                        id: this.dialogForm.id,
                        standard:row.standard,
                        number:this.tableData[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        productInfoId:row.productInfoId,
                        goodsId:row.id,
                        type:row.type,
                        storeReturnId:_this.id,
                        customerId:this.dialogForm.customerId
                    };
                    //表单提交方法更
                    requestSaveStoreReturnDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.getDetailAjaxList(1);
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            handleClickAdd2(index,row){
                if(this.tableData2[index].number>0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: this.dialogForm.id,
                        standard:row.standard,
                        number:row.number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        productInfoId:row.productInfoId,
                        goodsId:row.id,
                        type:row.type,
                        storeReturnId:_this.id,
                        customerId:this.dialogForm.customerId
                    };
                    //表单提交方法更
                    requestSaveStoreReturnDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.getDetailAjaxList(1);
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },

            //查询明细列表
            getDetailAjaxList(bool){
                let _this = this;
                requestListByStoreReturnPid(_this.param2).then(res => {
                    _this.tableListData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableListData = data;
                        //如果是新增明细后的刷新，再次提交表单
                        if(bool == 1){
                            _this.requestClientInfo();
                        }
                    }else{
                        _this.tableListData = [];
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
                             _this.editForm.logisticsNo = data.logisticsNo;
                           
                        }
                        if(data.logistics!=null){
                            _this.editForm.plateNumber = data.logistics.plateNumber;
                           _this.editForm.contact = data.logistics.contact;
                            _this.editForm.phone = data.logistics.phone;
                            _this.editForm.company = data.logistics.company;
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
                            customerId : _this.editForm.customerId,
                            logisticsId: _this.editForm.logisticsId.toString()
                        };
                        requestSaveStoreReturn(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('storeReturnId',res.data.id);
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
            //请求原料信息
            onSearch() {
                this.param.pageNo =1;
                this.param.name = this.searchForm.name;
                this.param.serialNo = this.searchForm.serialNo;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchGoods(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData = data;
                            _this.totalNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData = [];
                            _this.totalNum = 0;
                        }
                    }
                });
            },
            //请求资产
            onSearch2() {
                this.param2.pageNo =1;
                this.param2.name = this.searchForm2.name;
                this.param2.serialNo = this.searchForm2.serialNo;
                this.getAjaxList2();
            },
            handleCurrentChange2(val) {
                this.param2.pageNo = val;
                this.getAjaxList2();
            },
            getAjaxList2(){
                let _this = this;
                requestSearchGoods(_this.param2).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData2 = data;
                            _this.totalNum2 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableData2 = [];
                            _this.totalNum2 =0;
                        }
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
            this.getAjaxLogisticsList();
            this.getdatatime();
            this.getDetailAjaxList();
            //this.getAjaxAssets();
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

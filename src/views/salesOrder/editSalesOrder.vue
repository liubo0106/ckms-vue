<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/salesOrder' }">门店下单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="订单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="门店" prop="customerId">
                            <el-select v-model="editForm.customerId" placeholder="请选择" disabled >
                                <el-option v-for="item in customerList" :label="item.name"   :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="订单日期" prop="dateTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="总价" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalPrice" :maxlength="200" disabled></el-input>
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
            <!--门店下单明细-->
            <!--明细-->
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
                    <el-table-column align="center" header-align='center' prop="type" label="类型">
                        <template slot-scope="scope">
                            <template v-if="scope.row.type==1">打包</template>
                            <template v-if="scope.row.type==2">原材料</template>
                            <template v-if="scope.row.type==3">固定资产</template>
                            <template v-if="scope.row.type==4">易耗品</template>
                            <template v-if="scope.row.type==0">复合调料包</template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>

                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="160">
                        <template slot-scope="scope" >
                            <el-button size="mini" type="primary" @click="handleClickDetail(scope.$index, scope.row, 'edit')">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--明细添加编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="门店商品" name="1">
                    <el-container>
                        <el-aside>
                           <el-tree default-expand-all :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{ node.label }}</span>
                                </span>
                            </el-tree>
                        </el-aside>
                        <el-main>
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
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableData[scope.$index].number" :min="0" :step="tableData[scope.$index].multiple"  :max="999999999"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="multiple" label="倍数" width="80"></el-table-column>
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
                        </el-main>
                    </el-container>
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
                                <el-input-number style="width:130px" v-model="tableData2[scope.$index].number" :min="0" :max="999999999"></el-input-number>
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
        <!--编辑数量弹出层-->
        <el-dialog title='编辑数量' :visible.sync="dialogNumberFormVisible" width="30%">
            <el-form :model="editNumberForm" :rules="rules" ref="editNumberForm">
                <el-form-item label="编号" prop="serialNo" label-width="80px">
                    <el-input v-model="editNumberForm.serialNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name" label-width="80px">
                    <el-input v-model="editNumberForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="standard" label-width="80px">
                    <el-input v-model="editNumberForm.standard" disabled></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number" label-width="80px">
                    <el-input-number v-model="editNumberForm.number" :step="editNumberForm.multiple" :min="1"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogNumberFormVisible = false">取 消</el-button>
                <el-button type="primary" style="background-color: #35B178;border-color:#35B178;" @click="dialogNumberFormAdd('editNumberForm')" :loading="saveLoading">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        requestDeleteSalesDetail,
        requestListBySalesPid,
        requestSalesOrderInfo,
        requestSaveSalesDetail,
        requestSaveSalesOrder,
        requestSearchClient,
        requestSearchGoods,
        requestSupplierDataDic,
        requestSearchMenuType
    } from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId')
            if(customerId=="null"){
                customerId='-'
            }
            return {
                disabled: false,
                tableData: null,//采购单明细列表
                typeBool:false,
                classify:0,
                //采购单弹出层
                formLabelWidth: '80px',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    productInfoId:'',
                },
                orgTreeData: [],
                //打包商品明细
                detailFormVisible:false,
                detailTitle:'打包商品明细',
                detailForm:{
                    serialNo:'',
                    name:'',
                    standard:'',
                    number:''
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
                    customerId:customerId,
                    type:'1'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入订单名称', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请输入日期', trigger: 'blur' },
                    ],
                    number: [
                        { required: true, message: '请输入数量', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入单价', trigger: 'blur' },
                    ],
                    productInfoId: [
                        { required: true, message: '请选择名称', trigger: 'blur' },
                    ],

                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                customerList:[],//门店
                //productList:[],
                //assetsList:[],
                standardDataDicList:[],
//                param3: {
//                    pageNo:1,
//                    pageSize:0,
//                    customerId:customerId,
//                    type:'2'
//                },
//                param2: {
//                    pid:''
//                },
                standardParam: {
                    type:"单位"
                },
                //门店下单弹出层
                dialogFormVisible:false,
                dialogTitle:'新增订单明细',
                activeName:'1',
                tableListData: null,//采购单明细列表
                searchForm: {
                    name: '',
                    serialNo:''
                },
                param: {
                    name:"",
                    pageNo:1,
                    type:1,
                    pageSize:10,
                    serialNo:'',
                    isDelete:1,
                    categoryId:'',
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
                },
                param4: {
                    pageNo:1,
                    pageSize:0,
                    customerId:customerId,
                },
                dialogNumberFormVisible:false,
                editNumberForm:{
                    number:0,
                    stock:0,
                    id:'',
                    standard:'',
                    name:'',
                    serialNo:'',
                    multiple:'',
                    
                },
                number:0,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
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
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleNodeClick(tab){
                console.log(tab.id);
                this.param.categoryId=tab.id;
                this.getAjaxList();
            },
            handleClickAdd(index,row){
                if(this.tableData[index].multiple==null){
                    this.$message({
                        type:'error',
                        message:`数据错，请联系管理员`,
                        duration:1000,
                    })
                    return false;
                }
                if(this.tableData[index].number%this.tableData[index].multiple!=0){
                    this.$message({
                        type:'error',
                        message:`添加数量请输入${this.tableData[index].multiple}的倍数`,
                        duration:1000,
                    })
                    return false;
                }
                if(this.tableData[index].number>0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableData[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        productInfoId:row.productInfoId,
                        salesOrderId:_this.id,
                        type:row.type
                    };
                    
                    //表单提交方法更
                    requestSaveSalesDetail(addParam).then(res => {
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
                        id: '',
                        standard:row.standard,
                        number:this.tableData2[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        productInfoId:row.productInfoId,
                        salesOrderId:_this.id,
                        type:row.type
                    };
                    //表单提交方法更
                    requestSaveSalesDetail(addParam).then(res => {
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
             getTreeAjaxList(){
                let _this = this;
                requestSearchMenuType({}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            if(data && data.length>0){
                                _this.orgTreeData = data;
                            }else{
                                _this.orgTreeData = [];
                            }
                        }
                    }else{
                        _this.$message({
                            type: 'error',
                            message: '系统异常!'
                        });
                    }
                });
            },
            dialogNumberFormAdd(){
                let _this = this;
                if(this.editNumberForm.number%this.editNumberForm.multiple!=0){
                    this.$message({
                        type:'error',
                        message:`添加数量请输入${this.editNumberForm.multiple}的倍数`,
                        duration:1000,
                    })
                    return false;
                }
                if(this.editNumberForm.number>0){
                    _this.saveLoading = true;
                    let addParam = {};
                    addParam ={
                        id: this.editNumberForm.id,
                        number:this.editNumberForm.number
                    };
                    //表单提交方法更
                    requestSaveSalesDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.dialogNumberFormVisible = false;
                                    _this.getDetailAjaxList(1);
                                }
                            });
                        }else{
                            _this.saveLoading = false;
                            _this.dialogNumberFormVisible = false;
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
            //查询明细列表
            getDetailAjaxList(bool){
                let _this = this;
                requestListBySalesPid(_this.param3).then(res => {
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
            //默认显示今天
            getdatatime(){
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let day = nowDate.getDate();
                let newDay =day>9?day:"0"+day; //日
                this.editForm.dateTime= year + '-' + month + '-' + newDay;
            },
            /*changeProduct(val){
                let tn = {};
                tn = this.productList.find((item)=>{
                    return item.productInfoId === val;
                });
                this.maxNumber = tn.stock;
                this.dialogForm.standard = tn.standard;
                this.dialogForm.price = tn.price;
                this.dialogForm.name = tn.name;
                this.dialogForm.serialNo = tn.serialNo;
                this.dialogForm.type = tn.type;
            },*/
          /*  changeAssets(val){
                let tn = {};
                tn = this.assetsList.find((item)=>{
                    return item.productInfoId === val;
                });
                this.dialogForm.name = tn.name;
                this.dialogForm.serialNo = tn.serialNo;
                this.dialogForm.type = tn.type;
                this.dialogForm.standard = tn.standard;
            },*/
           /* changeGroup(val){
                let tn = {};
                tn = this.groupList.find((item)=>{
                    return item.id === val;
                });
                this.maxNumber = tn.stock;
                this.dialogForm.price = tn.price;
                this.dialogForm.standard = tn.standard;
            },*/
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
                        requestDeleteSalesDetail(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                       // _this.getAjaxList(1);
                                        _this.getDetailAjaxList(1);
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
                    _this.dialogFormVisible = true;
                    _this.getAjaxList();
                    _this.getTreeAjaxList();
                }else if(doType == 'edit'){
                    //编辑
                    _this.dialogNumberFormVisible = true;
                    _this.editNumberForm.number = row.number;
                    _this.editNumberForm.stock = row.stock;
                    _this.editNumberForm.id = row.id;
                    _this.editNumberForm.serialNo = row.serialNo;
                    _this.editNumberForm.name = row.name;
                    _this.editNumberForm.standard = row.standard;
                    _this.editNumberForm.multiple=row.multiple;
                    if(row.multiple==null){
                        _this.editNumberForm.multiple=1;
                    }

                }/*else if(doType == 'detail'){
                    //详情
                    _this.detailFormBtn('detail',row);
                }*/
            },
            //显示添加编辑页面弹出层
           /* addOrg(type,row){
                this.dialogFormVisible = true;
                if(type == 'add'){
                    this.disabled = false
                    this.dialogTitle='新增订单明细',
                    //清除以前数据
                    this.dialogForm.standard ='';
                    this.dialogForm.number = '';
                    this.dialogForm.id = '';
                    this.dialogForm.price = 0;
                    this.dialogForm.productInfoId = '';
                }else{
                    this.disabled = !this.disabled
                    this.dialogTitle='编辑订单明细',
                    //编辑
                    this.dialogForm.standard = row.standard;
                    this.dialogForm.id = row.id;
                    this.dialogForm.number = row.number;
                    this.dialogForm.price = row.price;
                    this.dialogForm.productInfoId = row.productInfoId;
                }
            },*/

            //添加编辑点击确认数据回显
            /*dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                addParam ={
                    id: this.dialogForm.id,
                    standard:this.dialogForm.standard,
                    number:this.dialogForm.number,
                    price:this.dialogForm.price,
                    productInfoId:this.dialogForm.productInfoId,
                    name:this.dialogForm.name,
                    serialNo:this.dialogForm.serialNo,
                    salesOrderId:_this.id,
                    type:this.dialogForm.type
                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestSaveSalesDetail(addParam).then(res => {
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
            },*/
           //查询明细列表
            /*getAjaxList(bool){
                let _this = this;
                requestListBySalesPid(_this.param2).then(res => {
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
            },*/
            //销售单编辑
            requestClientInfo(){
                let _this = this;
                requestSalesOrderInfo({id:this.id}).then(res => {
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
                            _this.editForm.customerId = data.customerId;
                            _this.editForm.type = data.type+'';
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //请求门店
            getAjaxSupplier(){
                let _this = this;
                requestSearchClient(_this.param4).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.customerList = data;
                    }else{
                        _this.customerList = [];
                    }
                });
            },
            //请求商品信息
           /* getAjaxProduct(){
                let _this = this;
                requestSearchGoods(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.productList = data;
                        }else{
                            _this.productList = [];
                        }
                    }
                });
            },*/
            //请求固定资产信息
           /* getAjaxAssets(){
                let _this = this;
                requestSearchGoods(_this.param3).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.assetsList = data;
                        }else{
                            _this.assetsList = [];
                        }
                    }
                });
            },*/
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
            //请求打包列表信息
            /*getAjaxGroup(){
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
            },*/
            goBack() {
                this.$router.push({ path: '/salesOrder' });
            },
            /*销售单主表*/
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let tn = {};
                        tn = this.customerList.find((item)=>{
                            return item.id === _this.editForm.customerId;
                        });
                        let editFormParam ={
                            name: _this.editForm.name,
                            dateTime: _this.editForm.dateTime,
                            totalNumber: _this.editForm.totalNumber,
                            totalPrice : _this.editForm.totalPrice,
                            remark : _this.editForm.remark,
                            customerId: _this.editForm.customerId,
                            type: _this.editForm.type,
                            customerName: tn.name,
                            id:_this.id
                        };
                        requestSaveSalesOrder(editFormParam).then(res => {

                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('id',res.data.id);
                                    _this.id=res.data.id;
                                    //_this.param2.pid=res.data.id;
                                    _this.requestClientInfo();
                                    _this.getAjaxList(2);
                                    _this.saveLoading = false;
                                    _this.typeBool=true;
                                    _this.param3.pid=res.data.id;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('sId');
            if(id){
                this.id=id;
                //this.param2.pid=id;
                this.param3.pid=id;
                this.typeBool=true;
                this.requestClientInfo();
                //采购单明细
                this.getAjaxList(2);
                this.getDetailAjaxList(2);
            }
            this.getAjaxSupplier();//门店
            //this.getAjaxProduct();
            //this.getAjaxAssets();
            this.getAjaxStandardDataDic();
            this.getdatatime()
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

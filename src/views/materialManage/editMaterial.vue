<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/material' }">领料单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="领料单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" ></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="领料日期" prop="dateTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
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
                <el-form-item label="选择采购单" v-if="id">

                        <el-date-picker
                                v-model="value6"
                                type="daterange"
                                align="left"
                                unlink-panels
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @blur="getorderList()"
                                >
                        </el-date-picker>
                    <el-select v-model="value2" placeholder="请选择" @change="getShopList()">
                        <el-option
                                v-for="item in shopData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>

            </el-form>
            <!--领料单明细-->
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
                <el-table :data="tableData" border>
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="原料名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="140">
                        <template slot-scope="scope">
                            ￥{{scope.row.price |substr}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="260">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--领料单明细添加编辑弹出层-->
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-container>
                <el-aside>
                    <el-tree :highlight-current="true" node-key="id"
                             default-expand-all
                             :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                             :expand-on-click-node="false"></el-tree>
                </el-aside>
                <el-main>
                    <el-form :inline="true" :model="searchTreeForm" label-width="80px" class="demo-form-inline">
                        <el-form-item label="原料编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                            <el-input v-model="searchTreeForm.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="原料名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                            <el-input v-model="searchTreeForm.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price |substr}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData[scope.$index].number" :min="0" :max="tableTreeData[scope.$index].stock"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree"
                            :current-page.sync="paramTree.pageNo"
                            :page-size="paramTree.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum">
                    </el-pagination>
                </el-main>
            </el-container>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="unitFromDialogFormVisible" width="30%">
            <el-form>
                <el-form-item label="原单位" label-width="100px">
                    <el-select v-model="unitFrom" placeholder="请选择" clearable>
                        <el-option v-for="item in unitFromList" :label="item.unitFrom" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="unitFromDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="unitFromAdd">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        requestDeleteMaterialDetail,
        requestListByMaterialPid,
        requestMaterialInfo,
        requestSaveMaterial,
        requestSaveMaterialDetail,
        requestSearchProduct,
        requestSearchProductList,
        requestUnitConversionPage,
        requestSearchPurchase,
        requestListByPid,
        requestPickDataSave,

    } from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            return {
                tableData: null,//领料单明细列表
                //领料单弹出层
                formLabelWidth: '80px',
                dialogTreeFormVisible:false,
                dialogTreeTitle:'新增领料明细',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    name:'',
                    serialNo:'',
                    productInfoId:'',
                    spec:'',
                    rawPrice:'',
                    discount:'',
                    amount:''
                },
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    orderNo: '',
                    dateTime: '',
                    totalNumber: 0,
                    totalPrice: 0,
                    remark: '',
                    supplierId:'',
                    id:'',
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                supplierList:[],
                productList:[],
                param: {//请求供应商
                    pageNo:1,
                    pageSize:0,
                    status:1
                },
                param2: {//查询明细列表
                    pid:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入领料单名称', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请输入领料日期', trigger: 'blur' },
                    ],
                },
                content:'',
                searchTreeForm: {
                    name: '',
                    serialNo:''
                },
                tableTreeData: null,
                paramTree: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    categoryId:'',
                    isDelete:1
                },
                totalTreeNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                unitFromList:[],
                unitFromDialogFormVisible:false,
                unitFrom:'',
                value2:'',
                value6: '',
                value7: '',
                shopData:[],
                shopDataList:[],
            }
        },
        methods: {
            //点击树节点
            getorderList(){
               this.param.pageSize =-1;
               this.param.beginDate = this.value6[0];
               this.param.endDate = this.value6[1];
               this.param.status = 2;
                requestSearchPurchase(this.param).then((res)=>{
                    if(res.status==200){
                        this.shopData=res.data.items;
                    }

                })
            },
            //获取采购单数据
            getShopList(){
                this.id=1;
                const param={
                    pid:this.value2
                }
                this.$confirm('是否确定选择?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    requestListByPid(param).then((res)=>{
                        if(res.status==200){
                            this.shopDataList=[];
                            this.shopDataList=res.data;
                            const _this=this
                            this.shopDataList.forEach((item)=>{
                                if (typeof item.pickOrderId == "undefined") {
                                    this.$set(item, "pickOrderId",this.editForm.id);
                                }
                                item.id=null;
                            })
                            requestPickDataSave(this.shopDataList).then((res)=>{
                                if(res.status == 200){
                                    this.$message({
                                        type:'success',
                                        message:'数据添加成功！'
                                    })
                                    _this.getAjaxList();
                                }else{
                                    this.$message({
                                        type:'success',
                                        message:'数据添加成功'
                                    })
                                    _this.getAjaxList();
                                }
                            })
                        }
                    })
                }).catch(() => {

                });



            },

            handleNodeClick(data) {
                this.searchTreeForm.name = '';
                this.paramTree.name = '';
                this.paramTree.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.paramTree.categoryId = data.id;
                }
                this.paramTree.pageNo = 1;
                this.getTreeAjaxPage();
            },
            onSearchTree() {
                this.paramTree.pageNo =1;
                this.paramTree.serialNo = this.searchTreeForm.serialNo;
                this.paramTree.name = this.searchTreeForm.name;
                this.getTreeAjaxPage();
            },
            handleCurrentChangeTree(val) {
                this.paramTree.pageNo = val;
                this.getTreeAjaxPage();
            },
            getTreeAjaxPage(){
                let _this = this;
                requestSearchProductList(_this.paramTree).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData = data;
                            _this.totalTreeNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData = [];
                            _this.totalTreeNum = 0;
                        }
                    }
                });
            },
            getTreeAjaxList(){
                let _this = this;
                requestSearchProduct({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData = data;
                        }else{
                            _this.orgTreeData = [];
                        }
                    }
                });
            },
            handleClickTreeAdd(index,row){
                this.dialogForm.standard =row.standard;
                this.dialogForm.number = this.tableTreeData[index].number;
                this.dialogForm.id = '';
                this.dialogForm.price = row.price;
                this.dialogForm.productInfoId = row.id;
                this.dialogForm.name = row.name;
                this.dialogForm.spec = row.spec;
                this.dialogForm.rawPrice = row.rawPrice;
                this.dialogForm.discount = row.discount;
                this.dialogForm.amount = row.amount;
                this.dialogForm.serialNo = row.serialNo;
                if(this.tableTreeData[index].number <= 0){
                    this.$message({
                        type: 'error',
                        message: '数量必须大于0'
                    });
                }else{
                    this.unitFromDialogFormVisible = true;
                }
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
                        requestDeleteMaterialDetail(deleteParam).then(res => {
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
                    this.getTreeAjaxPage();
                    this.getTreeAjaxList();
                    //添加
                    this.dialogTreeFormVisible = true;
                }
            },
            unitFromAdd(){
                let _this = this;
                let number = 0;
                if(this.unitFrom){
                    let tn = {};
                    tn = this.unitFromList.find((item)=>{
                        return item.id === this.unitFrom;
                    });
                    number = tn.ratio*this.dialogForm.number;
                }else{
                    number = this.dialogForm.number;
                }
                let addParam = {};
                addParam ={
                    id: this.dialogForm.id,
                    standard:this.dialogForm.standard,
                    number:number,
                    price:this.dialogForm.price,
                    name:this.dialogForm.name,
                    serialNo:this.dialogForm.serialNo,
                    spec:this.dialogForm.spec,
                    rawPrice:this.dialogForm.rawPrice,
                    productInfoId:this.dialogForm.productInfoId,
                    discount:this.dialogForm.discount,
                    amount:this.dialogForm.amount,
                    pickOrderId:_this.id
                };
                requestSaveMaterialDetail(addParam).then(res => {
                    if(res.status == 200){
                        _this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration:300,
                            onClose:function(){
                                _this.saveLoading = false;//关闭提交按钮loding
                                _this.unitFromDialogFormVisible = false;
                                _this.getAjaxList(1);
                            }
                        });
                    }else{
                        _this.unitFromDialogFormVisible = false;
                        _this.saveLoading = false;
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                });
            },
            //查询明细列表
            getAjaxList(bool){
                let _this = this;
                requestListByMaterialPid(_this.param2).then(res => {
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
                        //如果是新增明细后的刷新，再次刷新表单
                        if(bool == 1){
                            _this.requestClientInfo();
                        }
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //领料单编辑
            requestClientInfo(){
                let _this = this;
                requestMaterialInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.orderNo = data.orderNo;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.id=data.id;
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
                this.$router.push({ path: '/material' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            name: _this.editForm.name,
                            dateTime: _this.editForm.dateTime,
                            totalNumber: _this.editForm.totalNumber,
                            totalPrice : _this.editForm.totalPrice,
                            remark : _this.editForm.remark,
                            id:_this.id
                        };
                        requestSaveMaterial(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('materialId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.requestClientInfo();
                                    _this.getAjaxList(2);
                                    _this.saveLoading = false;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            //请求原单位
            getAjaxUnitConversionPage(){
                let _this = this;
                requestUnitConversionPage({pageSize:0}).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.unitFromList = data;
                        }else{
                            _this.unitFromList = [];
                        }
                    }
                });
            }
        },
        filters:{
           substr:function (value) {
               return value.toFixed(2);
           }
        },
        beforeMount() {
            let id = sessionStorage.getItem('materialId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.requestClientInfo();
                //领料单明细
                this.getAjaxList(2);
            }
            this.getdatatime();
            this.getAjaxUnitConversionPage();
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
            height: 400px;
        }
    }
</style>

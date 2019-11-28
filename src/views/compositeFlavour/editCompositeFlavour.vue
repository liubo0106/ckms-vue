<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/compositeFlavour' }">复合调料包</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="编号" prop="serialNo">
                    <el-input placeholder='请输入' v-model="editForm.serialNo" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="出售单价" prop="price">
                    <el-input-number size="medium" :precision="2" v-model="editForm.price" :min="0" ></el-input-number>
                </el-form-item>
                <!--<el-form-item label="安全库存" prop="safeStock">-->
                    <!--<el-input-number size="medium" :precision="2" v-model="editForm.safeStock" :min="0" :max="999999999" :step="1" ></el-input-number>-->
                <!--</el-form-item>-->
                <el-form-item  label="单位" prop="standard">
                    <el-select v-model="editForm.standard" placeholder="请选择" >
                        <el-option v-for="item in standardDataDicList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="background-color: #35B178;border-color:#35B178;" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
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
                <!--明细列表-->
                <el-table :data="tableData" border style="width: 100%">

                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' type="type" label="类型" width="80">
                        <template slot-scope="scope">
                            <template v-if="scope.row.type==1">打包</template>
                            <template v-if="scope.row.type==2">原材料</template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="需要数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="stock" label="仓库库存"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleClickDetail(scope.$index, scope.row, 'edit')">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--复合调料包明细弹出层-->
        <el-dialog :title='directDialogTreeTitle' :visible.sync="directDialogTreeFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="directActiveName" @tab-click="directHandleClick">
                <el-tab-pane label="打包" name="1">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="directOrgTreeData" :props="defaultProps" @node-click="directHandleNodeClick"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="directSearchTreeForm" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="directSearchTreeForm.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="directSearchTreeForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="directOnSearchTree" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="directTableTreeData" border>
                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                                <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="directTableTreeData[scope.$index].number" :max="999999999" :min="0"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="directHandleClickTreeAdd(scope.$index, scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    background
                                    @current-change="directHandleCurrentChangeTree"
                                    :current-page.sync="directParamTree.pageNo"
                                    :page-size="directParamTree.pageSize"
                                    layout="total,prev, pager, next"
                                    :total="directTotalTreeNum">
                            </el-pagination>
                        </el-main>
                    </el-container>
                </el-tab-pane>
                <el-tab-pane label="原材料" name="2">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="directOrgTreeData2" :props="defaultProps" @node-click="directHandleNodeClick2"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="directSearchTreeForm2" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="directSearchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="directSearchTreeForm2.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="directOnSearchTree2" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="directTableTreeData2" border>
                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                                <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="directTableTreeData2[scope.$index].number" :max="999999999" :min="0"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="directHandleClickTreeAdd2(scope.$index, scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    background
                                    @current-change="directHandleCurrentChangeTree2"
                                    :current-page.sync="directParamTree2.pageNo"
                                    :page-size="directParamTree2.pageSize"
                                    layout="total,prev, pager, next"
                                    :total="directTotalTreeNum2">
                            </el-pagination>
                        </el-main>
                    </el-container>
                </el-tab-pane>
            </el-tabs>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="directDialogTreeFormVisible = false">关闭</el-button>
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
        <!--明细编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="25%">
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm">

                <el-form-item label="原料编号" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.serialNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="原料名称" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.standard" disabled></el-input>
                </el-form-item>
                <el-form-item label="出售单价" :label-width="formLabelWidth" >
                    <el-input-number v-model="dialogForm.price" :min="0" disabled></el-input-number>
                </el-form-item>
                <el-form-item label="净数量" :label-width="formLabelWidth" >
                    <el-input-number v-model="dialogForm.number" :min="0" :max="999999999"></el-input-number>
                </el-form-item>
            </el-form>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormAdd('dialogForm')" :loading="saveLoading">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestSupplierDataDic,
        requestCompoundInfo,
        requestSaveCompound,//添加复合料包主表
        requestSearchProductList,
        requestSearchGroup,
        requestSearchProduct,
        requestListByPidPackDetail,
        requestSavePackDetail,
        requestDeletePackDetail,
        requestSearchGroupList,
        requestSaveCompoundDetail,
        requestListByPidCompoundDetail,
        requestUnitConversionPage,
        requestDeleteCompoundDetail
    } from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {

            return {
                tableData: null,//采购单明细列表
                dialogTitle:'',
                dialogFormVisible:false,

                formLabelWidth: '80px',
                dialogForm:{
                    serialNo:'',
                    name:'',
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    productInfoId:''
                },
                //主表id
                id: '',
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                param: {
                    pageSize:-1
                },
                param2: {
                    pid:''
                },
                standardParam: {
                    type:"单位"
                },
                //主表
                pathIds: sessionStorage.getItem('pathIds'),
                props: {
                    checkStrictly:true,
                    value: 'id',
                    label: 'name',
                    children:'children'
                },
                deptList: [],
                deptId: sessionStorage.getItem('deptId'),
                saveLoading: false,
                editForm: {
                    name: '',
                    standard: '',
                    serialNo:'',
                    flag: 'staff',
                    post: '',
                    price: '',
                    safeStock:0
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字', trigger: 'blur' }
                    ],
                    serialNo: [
                        { required: true, message: '请输入编号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字', trigger: 'blur' }
                    ],

                    number: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],
                },
                standardDataDicList:[],
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                //复合调料包明细
                directDialogTreeFormVisible:false,
                directDialogTreeTitle:'新增复合调料包明细',
                directActiveName:'1',
                directSearchTreeForm: {
                    name: '',
                    serialNo:''
                },
                directTableTreeData: null,
                directParamTree: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    packCategoryId:''
                },
                directTotalTreeNum:0,
                directOrgTreeData: [],
                directSearchTreeForm2: {
                    name: '',
                    serialNo:''
                },
                directTableTreeData2: null,
                directParamTree2: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    categoryId:''
                },
                directTotalTreeNum2:0,
                directOrgTreeData2: [],
                //复合调料包原单位
                unitFromList:[],
                unitFromDialogFormVisible:false,
                unitFrom:'',
                tableIndex:'',
                tableRow:{},
                tableType:1

            }
        },
        methods: {
            onSearchTree() {
                this.paramTree.pageNo =1;
                this.paramTree.serialNo = this.searchTreeForm.serialNo;
                this.paramTree.name = this.searchTreeForm.name;
                //this.getTreeAjaxPage();
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
            },
            unitFromAdd(){
                this.ajaxSaveInStockDetail(this.tableIndex,this.tableRow,this.tableType);
            },
            //复合调料包原料明细添加
            ajaxSaveInStockDetail(index,row,tableType){
                let number = 0;
                if(this.unitFrom){
                    let tn = {};
                    tn = this.unitFromList.find((item)=>{
                        return item.id === this.unitFrom;
                    });
                    number = tn.ratio*this.directTableTreeData[index].number;
                }else{
                    number = this.directTableTreeData[index].number;
                }
                let _this = this;
                let addParam = {};
                addParam ={
                    id: '',
                    number:this.directTableTreeData2[index].number,
                    price:row.price,
                    productInfoId:row.id,
                    compoundId:_this.id,
                    type:'2'//1打包 原料 2
                };
                requestSaveCompoundDetail(addParam).then(res => {
                    if(res.status == 200){
                        _this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration:300,
                            onClose:function(){
                                _this.saveLoading = false;//关闭提交按钮loding
                                _this.unitFromDialogFormVisible = false;
                                _this.getAjaxList();
                            }
                        });
                    }else{
                        _this.saveLoading = false;
                        _this.unitFromDialogFormVisible = false;
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                });

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
                        requestDeleteCompoundDetail(deleteParam).then(res => {
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
                    this.directGetTreeAjaxPage();
                    this.directGetTreeAjaxList();
                    this.directDialogTreeFormVisible = true;
                }else if(doType == 'edit'){
                    //编辑
                    _this.addOrg('edit',row);
                }
            },
            //显示明细添加编辑页面弹出层
            addOrg(type,row){
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
                    this.dialogTitle='编辑明细',
                        //编辑
                     this.dialogForm.standard = row.standard;
                     this.dialogForm.serialNo = row.serialNo;
                     this.dialogForm.name = row.name;
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
                        requestSaveCompoundDetail(addParam).then(res => {
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
                requestListByPidCompoundDetail(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            goBack() {
                this.$router.push({ path: '/compositeFlavour' });
            },
            //主表
            //获取商品分类
            getTreeGroupAjaxList(){
                let _this = this;
                requestSearchGroup({}).then(res => {
                    let data = res.data;
                    if (data) {
                        if(data && data.length>0){
                            _this.deptList = data;
                        }else{
                            _this.deptList = [];
                        }
                    }
                });
            },
            //主表明细查询
            getAjaxGroupInfo(){
                let _this = this;
                requestCompoundInfo({id:this.id}).then(res => {
                    let data = res.data;
                    if (data) {
                        _this.editForm.name = data.name;
                        _this.editForm.spec = data.spec;
                        _this.editForm.serialNo = data.serialNo;
                        _this.editForm.price = data.price;
                        _this.editForm.standard = data.standard;
                        _this.editForm.safeStock = data.safeStock;
                        let ss = data.strArray;
                        if(ss){
                            _this.editForm.deptArray = ss.length>0 ? ss.split(','):[];
                        }
                        if(data.flag){
                            _this.editForm.flag = data.flag;
                        }
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //复合调料包明细弹出层
            directHandleClick(tab, event) {
                if(tab.name == '1'){
                    this.directGetTreeAjaxPage();
                    this.directGetTreeAjaxList();
                }else if(tab.name == '2'){
                    this.directGetTreeAjaxPage2();
                    this.directGetTreeAjaxList2();
                }
            },
            directHandleNodeClick(data) {
                this.directSearchTreeForm.name = '';
                this.directSearchTreeForm.serialNo = '';
                this.directParamTree.serialNo = '';
                this.directParamTree.name = '';
                this.directParamTree.packCategoryId = '';
                if(data.id=="0"){

                }else{
                    this.directParamTree.packCategoryId = data.id;
                }
                this.directParamTree.pageNo = 1;
                this.directGetTreeAjaxPage();
            },
            directOnSearchTree() {
                this.directParamTree.pageNo =1;
                this.directParamTree.serialNo = this.directSearchTreeForm.serialNo;
                this.directParamTree.name = this.directSearchTreeForm.name;
                this.directGetTreeAjaxPage();
            },
            directHandleCurrentChangeTree(val) {
                this.directParamTree.pageNo = val;
                this.directGetTreeAjaxPage();
            },
            directGetTreeAjaxPage(){
                let _this = this;
                requestSearchGroupList(_this.directParamTree).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.directTableTreeData = data;
                            _this.directTotalTreeNum = parseInt(res.data.totalNum);
                        }else{
                            _this.directTableTreeData = [];
                            _this.directTotalTreeNum = 0;
                        }
                    }
                });
            },
            directGetTreeAjaxList(){
                let _this = this;
                requestSearchGroup({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.directOrgTreeData = data;
                        }else{
                            _this.directOrgTreeData = [];
                        }
                    }
                });
            },
            //复合调料包明细的明细添加
            directHandleClickTreeAdd(index,row){
                let _this = this;
                let addParam = {};
                addParam ={
                    id: '',
                    number:this.directTableTreeData[index].number,
                    price:row.price,
                    productInfoId:row.id,
                    compoundId:_this.id,
                    type:'1'//1打包 原料 2
                };


                requestSaveCompoundDetail(addParam).then(res => {
                    if(res.status == 200){
                        _this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration:300,
                            onClose:function(){
                                _this.saveLoading = false;//关闭提交按钮loding

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
            },
            directHandleNodeClick2(data) {
                this.directSearchTreeForm2.name = '';
                this.directSearchTreeForm2.serialNo = '';
                this.directParamTree2.name = '';
                this.directParamTree2.serialNo = '';
                this.directParamTree2.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.directParamTree2.categoryId = data.id;
                }
                this.directParamTree2.pageNo = 1;
                this.directGetTreeAjaxPage2();
            },
            directOnSearchTree2() {
                this.directParamTree2.pageNo =1;
                this.directParamTree2.serialNo = this.directSearchTreeForm2.serialNo;
                this.directParamTree2.name = this.directSearchTreeForm2.name;
                this.directGetTreeAjaxPage2();
            },
            directHandleCurrentChangeTree2(val) {
                this.directParamTree2.pageNo = val;
                this.directGetTreeAjaxPage2();
            },
            directGetTreeAjaxPage2(){
                let _this = this;
                requestSearchProductList(_this.directParamTree2).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.directTableTreeData2 = data;
                            _this.directTotalTreeNum2 = parseInt(res.data.totalNum);
                        }else{
                            _this.directTableTreeData2 = [];
                            _this.directTotalTreeNum2 = 0;
                        }
                    }
                });
            },
            directGetTreeAjaxList2(){
                let _this = this;
                requestSearchProduct({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.directOrgTreeData2 = data;
                        }else{
                            _this.directOrgTreeData2 = [];
                        }
                    }
                });
            },
            directHandleClickTreeAdd2(index,row){
                this.tableIndex = '';
                this.tableRow = {};
                this.unitFrom = '';
                this.unitFromDialogFormVisible = true;
                this.tableIndex = index;
                this.tableRow = row;
                this.tableType = 3;

               /* if(this.directTableTreeData2[index].number > 0){

                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }*/
            },
            //主表添加
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;

                        let editFormParam ={

                            name: _this.editForm.name,
                            spec: _this.editForm.spec,
                            serialNo: _this.editForm.serialNo,
                            price: _this.editForm.price,
                            id : _this.id,
                            standard: _this.editForm.standard,
                            safeStock: _this.editForm.safeStock,
                        };
                        requestSaveCompound(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('groupId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.getAjaxGroupInfo();
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
            let id = sessionStorage.getItem('groupId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.getAjaxGroupInfo();
                //采购单明细
                this.getAjaxList();
                if(this.pathIds && this.pathIds.length>0){
                    this.editForm.deptArray = this.pathIds.length>0 ? this.pathIds.split(','):[];
                }
            }
            this.getTreeGroupAjaxList();
            this.getAjaxStandardDataDic();
            this.getAjaxUnitConversionPage();//请求原单位
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
<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/purchaseOrder' }">采购单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="采购单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" ></el-input>
                </el-form-item>
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
                <el-row>
                    <el-col :span="8">

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="采购日期" prop="dateTime">
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
                <el-table :data="tableData" border>
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="type" label="类型">
                        <template slot-scope="scope">
                            <template v-if="scope.row.type==2">原材料</template>
                            <template v-if="scope.row.type==3">固定资产</template>
                            <template v-if="scope.row.type==4">易耗品</template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="supplierName" label="供应商" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="260">
                        <template slot-scope="scope">
<!--                            <el-button size="mini" @click="handleClickDetail(scope.$index, scope.row, 'edit')">编辑</el-button>-->
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--采购单明细添加编辑弹出层-->
                <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="40%">
                    <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                        <el-form-item  :label="commodityName" :label-width="formLabelWidth" prop="productInfoId">
                            <el-input v-model="dialogForm.name" autocomplete="off" disabled style="width: 216px;"></el-input>
                            <el-button icon="el-icon-plus" circle @click="handleRowClick"></el-button>
                        </el-form-item>
                        <el-form-item   label="供应商" :label-width="formLabelWidth" prop="supplierId" >
                            <el-select v-model="dialogForm.supplierId"  @change="changeSupplier" placeholder="请选择">
                                <el-option v-for="item in supplierList" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="单位" :label-width="formLabelWidth" v-if="dialogForm.type==2" prop="standard" style="width:336px;">
                            <el-input v-model="dialogForm.standard" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item  label="单位"  :label-width="formLabelWidth" v-if="dialogForm.type==3 || dialogForm.type==4"  prop="standard">
                            <el-select v-model="dialogForm.standard" placeholder="请选择" >
                                <el-option v-for="item in standardDataDicList" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数量" :label-width="formLabelWidth" prop="number">
                            <el-input-number size="medium" v-model="dialogForm.number" :min="0" :max="999999999" :step="1" ></el-input-number>
                        </el-form-item>
                        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
                            <el-input-number size="medium" v-model="dialogForm.price" :min="0" :max="999999999" :step="1" ></el-input-number>
                        </el-form-item>
                        <el-form-item  label="原单位"  :label-width="formLabelWidth" prop="unitFrom">
                            <el-select v-model="dialogForm.unitFrom" placeholder="请选择" clearable>
                                <el-option v-for="item in unitFromList" :label="item.unitFrom" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供应内容" :label-width="formLabelWidth" v-if="dialogForm.supplierId">
                            <el-input type="textarea" v-model="content" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="备注"  :label-width="formLabelWidth">
                            <el-input type="textarea" placeholder='请输入' v-model="dialogForm.remark" :maxlength="200"></el-input>
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
        <!--选择原材料-固定资产弹出层-->
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">

                <el-tab-pane label="原材料" name="2">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="orgTreeData2" :props="defaultProps" @node-click="handleNodeClick2"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm2" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="searchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="searchTreeForm2.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree2" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="tableTreeData2" border>
                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                                <!--<el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}
                                    </template>
                                </el-table-column>-->
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                              <!--  <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="tableTreeData2[scope.$index].number"  :min="0"></el-input-number>
                                    </template>
                                </el-table-column>-->
                                <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="handleClickTreeAdd2(scope.$index, scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    background
                                    @current-change="handleCurrentChangeTree2"
                                    :current-page.sync="paramTree2.pageNo"
                                    :page-size="paramTree2.pageSize"
                                    layout="total,prev, pager, next"
                                    :total="totalTreeNum2">
                            </el-pagination>
                        </el-main>
                    </el-container>
                </el-tab-pane>
                <el-tab-pane label="固定资产" name="3">
                    <el-form :inline="true" :model="searchTreeForm3" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="searchTreeForm3.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchTreeForm3.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree3" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData3" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <!--<el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>-->
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                       <!-- <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData3[scope.$index].number"  :min="0"></el-input-number>
                            </template>
                        </el-table-column>-->
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd3(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree3"
                            :current-page.sync="paramTree3.pageNo"
                            :page-size="paramTree3.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum3">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="易耗品" name="4">
                    <el-form :inline="true" :model="searchTreeForm4" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="searchTreeForm4.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchTreeForm4.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree4" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData4" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                      <!--  <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData4[scope.$index].number"  :min="0"></el-input-number>
                            </template>
                        </el-table-column>-->
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd4(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree4"
                            :current-page.sync="paramTree4.pageNo"
                            :page-size="paramTree4.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum4">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </section>


</template>
<script type="text/ecmascript-6">
    import {
        requestDeletePurchaseDetail,
        requestListByPid,
        requestPurchaseInfo,
        requestSavePurchase,
        requestSavePurchaseDetail,
        requestSearchAssets,
        requestSearchProduct,
        requestSearchProductList,
        requestSearchSupplier,
        requestSupplierDataDic,
        requestUnitConversionPage
    } from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            var validateNumber = (rule, value, callback) => {
                if (value === 0) {
                    callback(new Error('数量必须大于0'));
                } else {
                    callback();
                }
            };
            var validatePrice = (rule, value, callback) => {
                if (value === 0) {
                    callback(new Error('单价必须大于0'));
                } else {
                    callback();
                }
            };
            return {
                tableData: null,//采购单明细列表
                //采购单弹出层
                formLabelWidth: '120px',
                dialogFormVisible:false,
                dialogTitle:'新增采购明细',
                commodityName:'名称',//商品名称
                dialogForm:{
                    standard:'',
                    number:0,
                    price:0,
                    id:'',
                    name:'',
                    serialNo:'',
                    model:'',
                    category:'',
                    productInfoId:'',
                    supplierId:'',
                    remark:'',
                    type:2,
                    unitFrom:''
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
                    supplierId:''
                },

                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                supplierList:[],
                standardDataDicList:[],
                param: {
                    pageNo:1,
                    pageSize:0,
                    status:1
                },
                param2: {
                    pid:''
                },
                standardParam: {
                    type:"单位"
                },

                rules: {
                    name: [
                        { required: true, message: '请输入采购单名称', trigger: 'blur' },
                    ],
                    standard: [
                        { required: true, message: '请输入单位', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入数量', trigger: 'blur' },
                        { validator:validateNumber,trigger:'change' }
                    ],
                    price: [
                        { required: true, message: '请输入单价', trigger: 'blur' },
                        { validator:validatePrice,trigger:'change' }
                    ],
                    dateTime: [
                        { required: true, message: '请选择采购日期', trigger: 'change' },
                    ],
                    productInfoId: [
                        { required: true, message: '请选择原料名称', trigger: 'change' },
                    ],
                    supplierId: [
                        { required: true, message: '请选择供应商', trigger: 'change' },
                    ]

                },
                content:'',
                //选择原料弹出层
                dialogTreeFormVisible:false,
                dialogTreeTitle:'新增采购单商品',
                //出库单明细
                activeName:'2',
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
                    packCategoryId:''
                },
                totalTreeNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                searchTreeForm2: {
                    name: '',
                    serialNo:''
                },
                tableTreeData2: null,
                paramTree2: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    categoryId:'',
                    isDelete:1,
                },
                totalTreeNum2:0,
                orgTreeData2: [],
                searchTreeForm3: {
                    name: '',
                    serialNo:''
                },
                tableTreeData3: [],
                paramTree3: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',
                    type: '1',
                    isDelete:1,
                },
                totalTreeNum3:0,
                searchTreeForm4: {
                    name: '',
                    serialNo:''
                },
                tableTreeData4: null,
                paramTree4: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',
                    type: '2',
                    isDelete:1,
                },
                totalTreeNum4:0,
                unitFromList:[]
            }
        },
        methods: {
            changeType(){
                this.dialogForm.productInfoId = '';
            },
            changeSupplier(val){
                let tn = {};
                tn = this.supplierList.find((item)=>{
                    return item.id === val;
                });
                this.content = tn.content;
            },

            handleClick(tab, event) {
               if(tab.name == '2'){
                    this.getTreeAjaxPage2();
                    this.getTreeAjaxList2();
                    this.commodityName="原材料"
                }else if(tab.name == '3'){
                    this.getTreeAjaxPage3();
                   this.commodityName="固定资产"
                }else if(tab.name == '4'){
                    this.getTreeAjaxPage4();
                   this.commodityName="易耗品"
                }
            },

            handleNodeClick2(data) {
                this.searchTreeForm2.name = '';
                this.searchTreeForm2.serialNo = '';
                this.paramTree2.name = '';
                this.paramTree2.serialNo = '';
                this.paramTree2.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.paramTree2.categoryId = data.id;
                }
                this.paramTree2.pageNo = 1;
                this.getTreeAjaxPage2();
            },
            onSearchTree2() {
                this.paramTree2.pageNo =1;
                this.paramTree2.serialNo = this.searchTreeForm2.serialNo;
                this.paramTree2.name = this.searchTreeForm2.name;
                this.getTreeAjaxPage2();
            },
            handleCurrentChangeTree2(val) {
                this.paramTree2.pageNo = val;
                this.getTreeAjaxPage2();
            },
            getTreeAjaxPage2(){
                let _this = this;
                requestSearchProductList(_this.paramTree2).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData2 = data;
                            _this.totalTreeNum2 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData2 = [];
                            _this.totalTreeNum2 = 0;
                        }
                    }
                });
            },
            getTreeAjaxList2(){
                let _this = this;
                requestSearchProduct({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData2 = data;
                        }else{
                            _this.orgTreeData2 = [];
                        }
                    }
                });
            },
            handleClickTreeAdd2(index,row){
                let _this = this;

                this.dialogForm.standard = row.standard;
                this.dialogForm.number = this.tableTreeData2[index].number;
                this.dialogForm.name = row.name;
                this.dialogForm.productInfoId = row.id;
                this.dialogForm.type=_this.activeName;
                this.dialogForm.serialNo=row.serialNo;
                //this.dialogForm.price=row.price;
                this.dialogTreeFormVisible = false;

            },
            onSearchTree3() {
                this.paramTree3.pageNo =1;
                this.paramTree3.serialNo = this.searchTreeForm3.serialNo;
                this.paramTree3.name = this.searchTreeForm3.name;
                this.paramTree3.type = this.searchTreeForm3.type;
                this.getTreeAjaxPage3();
            },
            handleCurrentChangeTree3(val) {
                this.paramTree3.pageNo = val;
                this.getTreeAjaxPage3();
            },
            getTreeAjaxPage3(){
                let _this = this;
                requestSearchAssets(_this.paramTree3).then(res => {
                    if (res.status == 200) {

                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData3 = data;
                            _this.totalTreeNum3 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData3 = [];
                            _this.totalTreeNum3 = 0;
                        }
                    }
                });
            },
            handleClickTreeAdd3(index,row){
                let _this = this;

                //this.dialogForm.standard = row.standard;
                this.dialogForm.number = this.tableTreeData3[index].number;
                this.dialogForm.name = row.name;
                this.dialogForm.productInfoId = row.id;
                this.dialogForm.type=_this.activeName;
                this.dialogForm.serialNo=row.serialNo;
                this.dialogForm.category=row.category;
                this.dialogForm.model=row.model;
                this.dialogForm.price=row.price;

                this.dialogTreeFormVisible = false;

            },
            onSearchTree4() {
                this.paramTree4.pageNo =1;
                this.paramTree4.serialNo = this.searchTreeForm4.serialNo;
                this.paramTree4.name = this.searchTreeForm4.name;
                this.paramTree4.type = this.searchTreeForm4.type;
                this.getTreeAjaxPage4();
            },
            handleCurrentChangeTree4(val) {
                this.paramTree4.pageNo = val;
                this.getTreeAjaxPage4();
            },
            getTreeAjaxPage4(){
                let _this = this;
                requestSearchAssets(_this.paramTree4).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData4 = data;
                            _this.totalTreeNum4 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData4 = [];
                            _this.totalTreeNum4 = 0;
                        }
                    }
                });
            },
            handleClickTreeAdd4(index,row){
                let _this = this;
                //this.dialogForm.standard = row.standard;
                this.dialogForm.number = this.tableTreeData4[index].number;
                this.dialogForm.name = row.name;
                this.dialogForm.productInfoId = row.id;
                this.dialogForm.type=_this.activeName;
                this.dialogForm.serialNo=row.serialNo;
                this.dialogForm.category=row.category;
                this.dialogForm.model=row.model;
                this.dialogForm.price=row.price;
                this.dialogTreeFormVisible = false;

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
                        requestDeletePurchaseDetail(deleteParam).then(res => {
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
                   //清空弹出层数据
                    let _this = this;
                    _this.dialogForm.number = '';
                    _this.dialogForm.name = '';
                    _this.dialogForm.productInfoId = '';
                    _this.dialogForm.type='';
                    _this.dialogForm.serialNo='';
                    _this.dialogForm.category='';
                    _this.dialogForm.model='';
                    _this.dialogForm.price='';
                    _this.dialogForm.remark='';
                    _this.dialogForm.unitFrom='';
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
                    this.dialogForm.supplierId = '';
                    this.dialogForm.supplierId = '';
                    this.dialogForm.unitFrom = '';
                }else{
                    //编辑
                    this.dialogForm.standard = row.standard;
                    this.dialogForm.id = row.id;
                    this.dialogForm.number = row.number;
                    this.dialogForm.price = row.price;
                    this.dialogForm.productInfoId = row.productInfoId;
                    this.dialogForm.unitFrom = "";
                }
            },
            //添加编辑点击确认数据回显
            dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                let tn = {};
                tn = this.supplierList.find((item)=>{
                    return item.id === _this.dialogForm.supplierId;
                });
                let number = 0;
                let price=0;

                if(this.dialogForm.unitFrom){
                    let tn = {};
                    tn = this.unitFromList.find((item)=>{
                        return item.id === this.dialogForm.unitFrom;
                    });

                    number = tn.ratio*this.dialogForm.number;
                    price = this.dialogForm.price/tn.ratio;
                }else{
                    number = this.dialogForm.number;
                    price = this.dialogForm.price;  
                }
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        addParam ={
                            id: this.dialogForm.id,
                            standard:this.dialogForm.standard,
                            number:number,
                            price:price,
                            name:this.dialogForm.name,
                            serialNo:this.dialogForm.serialNo,
                            model:this.dialogForm.model,
                            category:this.dialogForm.category,
                            supplierId:this.dialogForm.supplierId,
                            productInfoId:this.dialogForm.productInfoId,
                            remark:this.dialogForm.remark,
                            type : _this.dialogForm.type,
                            supplierName: tn.name,
                            purchaseOrderId:_this.id
                        };
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
                requestListByPid(_this.param2).then(res => {
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
            //选择原料弹出层
            handleRowClick(){
                this.dialogTreeFormVisible = true;
                this.getTreeAjaxPage2();
                this.getTreeAjaxList2();
            },
            goBack() {
                this.$router.push({ path: '/purchaseOrder' });
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
                            supplierId: _this.editForm.supplierId,

                            id:_this.id
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
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('oId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.requestClientInfo();
                //采购单明细
                this.getAjaxList(2);
            }
            this.getAjaxSupplier();

           // this.getAjaxProduct();
            //this.getAjaxProduct();
            //this.getAjaxFixed();
            //this.getAjaxConsume();
            this.getAjaxStandardDataDic();
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

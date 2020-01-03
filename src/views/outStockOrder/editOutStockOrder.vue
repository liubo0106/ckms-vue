<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/outStockOrder' }">出库单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="出库单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="出库类型" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择">
                                <el-option  label="门店订单" :value="1">门店订单</el-option>
                                <el-option label="自主配货" :value="2">自主配货</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出库日期" style="width: 316px" prop="dateTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item v-if="editForm.type==1" label="店铺订单" style="width:100%" prop="salesOrderIds">
                    <el-select v-model="editForm.salesOrderIds" placeholder="请选择" style="width:100%" @change="changeOrder">
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
                            <el-input placeholder='请输入' v-model="editForm.logisticsNo" :maxlength="200"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label=" 物流车牌号" style="width: 316px" >
                            <el-select v-model="editForm.logisticsId" @change="changeLogistics" placeholder="请选择" clearable>
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
                            <el-select v-model="editForm.customerId" placeholder="请选择" >
                                <el-option v-for="item in customerList" :label="item.name"  :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="供应商" prop="supplierId" >
                            <el-select v-model="editForm.supplierId" @change="changeSupplier" placeholder="请选择" style="width: 100%">
                                <el-option v-for="item in supplierList" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="供应内容" v-if="editForm.supplierId">
                    <el-input v-model="content" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
            <!--出库明细-->
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
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <!--<el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>-->
                    <el-table-column align="center" header-align='center' label="操作" width="260">
                        <template slot-scope="scope" >
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="打包" name="1">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="searchTreeForm.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="searchTreeForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="tableTreeData" border>
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
                                        <el-input-number style="width:130px" v-model="tableTreeData[scope.$index].number" :max="tableTreeData[scope.$index].stock" :min="0"></el-input-number>
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
                </el-tab-pane>
<!--                <el-tab-pane label="原材料" name="2">-->
<!--                    <el-container>-->
<!--                        <el-aside>-->
<!--                            <el-tree :highlight-current="true" node-key="id"-->
<!--                                     default-expand-all-->
<!--                                     :data="orgTreeData2" :props="defaultProps" @node-click="handleNodeClick2"-->
<!--                                     :expand-on-click-node="false"></el-tree>-->
<!--                        </el-aside>-->
<!--                        <el-main>-->
<!--                            <el-form :inline="true" :model="searchTreeForm2" label-width="80px" class="demo-form-inline">-->
<!--                                <el-form-item label="编号">-->
<!--                                    <el-input v-model="searchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="名称">-->
<!--                                    <el-input v-model="searchTreeForm2.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label-width="0">-->
<!--                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree2" native-type="submit"></el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->
<!--                            <el-table :data="tableTreeData2" border>-->
<!--                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        ￥{{scope.row.price}}-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <el-input-number style="width:130px" v-model="tableTreeData2[scope.$index].number" :max="tableTreeData2[scope.$index].stock" :min="0"></el-input-number>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>-->
<!--                                <el-table-column align="center" header-align='center' label="操作" width="80">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <el-button type="primary" size="small" @click="handleClickTreeAdd2(scope.$index, scope.row)">添加</el-button>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                            </el-table>-->
<!--                            <el-pagination-->
<!--                                    background-->
<!--                                    @current-change="handleCurrentChangeTree2"-->
<!--                                    :current-page.sync="paramTree2.pageNo"-->
<!--                                    :page-size="paramTree2.pageSize"-->
<!--                                    layout="total,prev, pager, next"-->
<!--                                    :total="totalTreeNum2">-->
<!--                            </el-pagination>-->
<!--                        </el-main>-->
<!--                    </el-container>-->
<!--                </el-tab-pane>-->
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
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData3[scope.$index].number" :max="tableTreeData3[scope.$index].stock" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
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
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData4[scope.$index].number" :max="tableTreeData4[scope.$index].stock" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
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
                <el-tab-pane label="复合调料包" name="5">
                    <el-form :inline="true" :model="searchTreeForm5" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="searchTreeForm5.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchTreeForm5.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree4" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData5" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>
                      <!--  <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>-->
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData5[scope.$index].number"  :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd5(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree4"
                            :current-page.sync="paramTree5.pageNo"
                            :page-size="paramTree5.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum5">
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
    import { requestSalesOrderPage,
        requestOutStockOrderDetailInfo,
        requestSaveOutStockOrder,
        requestDeleteOutDetail,
        requestSearchProductList ,
        requestSearchLogistics,
        requestSearchClient,
        requestSearchSupplier,
        requestSupplierDataDic,
        requestSearchAssets,
        requestSearchGroupList,
        requestSearchGroup,
        requestSearchProduct,
        requestSaveOutStockDetail,
        requestSearchCompound,
        requestListByOutPid} from '../../api/api';
    export default {
        name: 'edit-out-stock-order',
        data() {
            return {
                tableData: null,//采购单明细列表
                typeBool:false,
                logisticsInfo:false,//物流信息
                //采购单弹出层
                formLabelWidth: '120px',
                /*dialogFormVisible:false,*/
                dialogTreeFormVisible:false,
                dialogTreeTitle:'新增出库单明细',
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
                    customerId: [
                        { required: true, message: '请选择门店', trigger: 'change' },
                    ]
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                purchaseList:[],
                LogisticsList:[],
                customerList:[],
                //groupList:[],
                supplierList:[],
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
                    isDelete:1,
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
               // productList:[],
                content:'',
                standardDataDicList:[],
               // consumetList:[],
                //fixedList:[]
                //出库单明细
                activeName:'1',
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
                    packCategoryId:'',
                    isDelete:1,
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
                    isDelete:1
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

                searchTreeForm5: {
                    name: '',
                    serialNo:''
                },
                tableTreeData5: null,
                paramTree5: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',

                },
                totalTreeNum5:0,
            }
        },
        methods: {
            //店铺订单
            changeOrder(val){
                let tn = {};
                tn = this.purchaseList.find((item)=>{
                    return item.id === val;
                });
                this.editForm.customerId = tn.customerId;
            },
            //入库单明细
            handleClick(tab, event) {
                if(tab.name == '1'){
                    this.getTreeAjaxPage();
                    this.getTreeAjaxList();
                }else if(tab.name == '2'){
                    this.getTreeAjaxPage2();
                    this.getTreeAjaxList2();
                }else if(tab.name == '3'){
                    this.getTreeAjaxPage3();
                }else if(tab.name == '4'){
                    this.getTreeAjaxPage4();
                }else if(tab.name == '5'){
                    this.getTreeAjaxPage5();
                }
            },
            //点击树节点
            handleNodeClick(data) {
                this.searchTreeForm.name = '';
                this.searchTreeForm.serialNo = '';
                this.paramTree.serialNo = '';
                this.paramTree.name = '';
                this.paramTree.packCategoryId = '';
                if(data.id=="0"){

                }else{
                    this.paramTree.packCategoryId = data.id;
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
                requestSearchGroupList(_this.paramTree).then(res => {
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
                requestSearchGroup({}).then(res => {
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
                if(this.tableTreeData[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        outStockOrderId:_this.id,
                        customerId:_this.editForm.customerId,
                        productInfoId:row.id
                    };
                    requestSaveOutStockDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
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
                if(this.tableTreeData2[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData2[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        outStockOrderId:_this.id,
                        customerId:_this.editForm.customerId,
                        productInfoId:row.id
                    };
                    requestSaveOutStockDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
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
                if(this.tableTreeData3[index].number >0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData3[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        outStockOrderId:_this.id,
                        customerId:_this.editForm.customerId,
                        productInfoId:row.id
                    };
                    requestSaveOutStockDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
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
                if(this.tableTreeData4[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData4[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        outStockOrderId:_this.id,
                        customerId:_this.editForm.customerId,
                        productInfoId:row.id
                    };
                    requestSaveOutStockDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            onSearchTree5() {
                this.paramTree5.pageNo =1;
                this.paramTree5.serialNo = this.searchTreeForm5.serialNo;
                this.paramTree5.name = this.searchTreeForm5.name;
                this.paramTree5.type = this.searchTreeForm5.type;
                this.getTreeAjaxPage5();
            },
            handleCurrentChangeTree5(val) {
                this.paramTree4.pageNo = val;
                this.getTreeAjaxPage4();
            },
            getTreeAjaxPage5(){
                let _this = this;
                requestSearchCompound(_this.paramTree5).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData5 = data;
                            _this.totalTreeNum5 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData5 = [];
                            _this.totalTreeNum5 = 0;
                        }
                    }
                });
            },
            handleClickTreeAdd5(index,row){
                let _this = this;
                let addParam = {};
                addParam ={
                    id: '',
                    standard:row.standard,
                    number:this.tableTreeData5[index].number,
                    price:row.price,
                    name:row.name,
                    serialNo:row.serialNo,
                    type:0,
                    outStockOrderId:_this.id,
                    customerId:_this.editForm.customerId,
                    productInfoId:row.id
                };
                requestSaveOutStockDetail(addParam).then(res => {
                    if(res.status == 200){
                        _this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration:300,
                            onClose:function(){
                                _this.saveLoading = false;//关闭提交按钮loding
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
                    this.getTreeAjaxPage();
                    this.getTreeAjaxList();
                    this.dialogTreeFormVisible = true;
                }
            },

            //查询明细列表
            getAjaxList(bool){
                let _this = this;
                requestListByOutPid(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
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
            this.getAjaxLogisticsList();
            this.getdatatime();
            this.getAjaxClient();
            this.getAjaxStandardDataDic();
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

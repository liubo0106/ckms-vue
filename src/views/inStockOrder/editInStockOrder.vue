<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/inStockOrder' }">入库单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="入库单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="入库类型" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择" :disabled="typeBool" >
                                <el-option  label="采购入库" :value="1">采购入库</el-option>
                               <!-- <el-option label="直接入库" :value="2">直接入库</el-option>-->
                                <el-option label="门店退货" :value="3">门店退货</el-option>
                                <el-option label="领料入库" :value="4">领料入库</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="入库日期" prop="dateTime">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总量" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="总价" style="width:316px">
                            <el-input placeholder='请输入' v-model="editForm.totalPrice" :maxlength="200" disabled></el-input>
                        </el-form-item>-->
                    </el-col>
                </el-row>
                <el-form-item  label="采购单" prop="purchaseOrderIds"  v-if="editForm.type==1" >
                    <el-select v-model="editForm.purchaseOrderIds" placeholder="请选择" :disabled="typeBool" multiple class="self-select-width">
                        <el-option v-for="item in purchaseList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="退货单" prop="storeReturnIds"  v-if="editForm.type==3" >
                    <el-select v-model="editForm.storeReturnIds" placeholder="请选择" :disabled="typeBool" multiple class="self-select-width">
                        <el-option v-for="item in storeReturnList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item  label="领料单"  v-if="editForm.type==4" >
                    <el-select v-model="editForm.pickOrderIds" placeholder="请选择" :disabled="typeBool" class="self-select-width">
                        <el-option v-for="item in pickOrderList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
            <!--入库明细-->
            <div class="contentBody" v-if="id">
                <el-form label-width="60px" class="demo-form-inline" v-if="editForm.type==2 || editForm.type==4">
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
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="260" v-if="editForm.type==2 || editForm.type==4">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--领料单明细添加编辑弹出层-->
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="打包" name="0">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="orgTreeData2" :props="defaultProps" @node-click="handleNodeClick2"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm2" label-width="80px" class="demo-form-inline">
                                <el-form-item label="原料编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                                    <el-input v-model="searchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="原料名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
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
                                <el-table-column align="center" header-align='center' prop="costPrice" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.costPrice | substr}}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="tableTreeData2[scope.$index].number" :min="0"></el-input-number>
                                    </template>
                                </el-table-column>
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
                <!--新增内容start-->
                <!--
                <el-tab-pane label="原材料" name="1">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="orgTreeData2" :props="defaultProps" @node-click="handleNodeClick3"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm2" label-width="80px" class="demo-form-inline">
                                <el-form-item label="原料编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                                    <el-input v-model="searchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="原料名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
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
                                <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="tableTreeData2[scope.$index].number" :min="0"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click.stop="handleClickTreeAdd2(scope.$index, scope.row)">添加</el-button>
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
                </el-tab-pane>-->
            </el-tabs>
            <!--新增end-->
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--直接入库单明细添加编辑弹出层-->
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
                <el-tab-pane label="固定资产" name="3">
                    <el-form :inline="true" :model="directSearchTreeForm3" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="directSearchTreeForm3.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="directSearchTreeForm3.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="directOnSearchTree3" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="directTableTreeData3" border>
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
                                <el-input-number style="width:130px" v-model="directTableTreeData3[scope.$index].number" :max="999999999" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="directHandleClickTreeAdd3(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="directHandleCurrentChangeTree3"
                            :current-page.sync="directParamTree3.pageNo"
                            :page-size="directParamTree3.pageSize"
                            layout="total,prev, pager, next"
                            :total="directTotalTreeNum3">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="易耗品" name="4">
                    <el-form :inline="true" :model="directSearchTreeForm4" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="directSearchTreeForm4.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="directSearchTreeForm4.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="directOnSearchTree4" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="directTableTreeData4" border>
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
                                <el-input-number style="width:130px" v-model="directTableTreeData4[scope.$index].number" :max="999999999" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="directHandleClickTreeAdd4(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="directHandleCurrentChangeTree4"
                            :current-page.sync="directParamTree4.pageNo"
                            :page-size="directParamTree4.pageSize"
                            layout="total,prev, pager, next"
                            :total="directTotalTreeNum4">
                    </el-pagination>
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
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        requestDeleteInDetail,
        requestInStockOrderDetailInfo,
        requestListByInPid,
        requestMaterialPage,
        requestSaveInStockDetail,
        requestSaveInStockOrder,
        requestSearchAssets,
        requestSearchGroup,
        requestSearchGroupList,
        requestSearchProduct,
        requestSearchProductList,
        requestSearchPurchase,
        requestStoreReturnPage,
        requestUnitConversionPage,
        requestSearchOrg,
        requestSearchDeptPage,
    } from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            return {
                activeName:'0',
                tableData: null,//采购单明细列表
                typeBool:false,
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    name:'',
                    serialNo:'',
                    productInfoId:'',
                    type:2
                },
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    purchaseOrderIds:[],
                    storeReturnIds:[],
                    type:1,
                    pickOrderIds:''

                },
                disabled:true,
                rules: {
                    name: [
                        { required: true, message: '请输入入库单名称', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],

                    type: [
                        { required: true, message: '请输入入库类型', trigger: 'blur' },

                    ],
                    dateTime: [
                        { required: true, message: '请选择', trigger: 'blur' },

                    ],
                    productInfoId: [
                        { required: true, message: '请选择原料名称', trigger: 'blur' },
                    ],
                    purchaseOrderIds: [
                        { required: true, message: '请选择采购单', trigger: 'blur' },
                    ],
                    pickOrderIds: [
                        { required: true, message: '请选择领料单', trigger: 'blur' },
                    ],
                    storeReturnIds: [
                        { required: true, message: '请选择退货单', trigger: 'blur' },
                    ],
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                purchaseList:[],
                pickOrderList:[],
                storeReturnList:[],
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
                productList:[],
                dialogTreeFormVisible:false,
                dialogTreeTitle:'新增入库明细',
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
                    packCategoryId:'',
                    categoryId:'',
                    parentId:'',

                },
                totalTreeNum2:0,
                orgTreeData2: [],
                //直接入库参数
                directDialogTreeFormVisible:false,
                directDialogTreeTitle:'新增入库单明细',
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
                    packCategoryId:'',
                    isDelete:1,
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
                    categoryId:'',
                    isDelete:1
                },
                directTotalTreeNum2:0,
                directOrgTreeData2: [],
                directSearchTreeForm3: {
                    name: '',
                    serialNo:''
                },
                directTableTreeData3: [],
                directParamTree3: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',
                    type: '1',
                    isDelete:1,
                },
                directTotalTreeNum3:0,
                directSearchTreeForm4: {
                    name: '',
                    serialNo:''
                },
                directTableTreeData4: null,
                directParamTree4: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',
                    type: '2',
                    isDelete:1,
                },
                directTotalTreeNum4:0,
                unitFromList:[],
                unitFromDialogFormVisible:false,
                unitFrom:'',
                tableIndex:'',
                tableRow:{},
                tableType:1,
                tabName:0,
            }
        },
        methods: {
            handleClick(tab, event) {
                if(tab.name == '0'){
                    this.getTreeAjaxPage2();
                    this.getTreeAjaxList2();
                    this.tabName=tab.name;
                    this.searchTreeForm2.name = '';
                    this.paramTree2.name = '';
                    this.paramTree2.packCategoryId = '';
                    this.paramTree2.serialNo='';
                    this.searchTreeForm2.serialNo='';
                    this.searchTreeForm2.name='';
                }
                if(tab.name==1){
                    this.getMaterial();
                    this.getMaterialList();
                    this.tabName=tab.name;
                    this.searchTreeForm2.name = '';
                    this.paramTree2.name = '';
                    this.paramTree2.packCategoryId = '';
                    this.paramTree2.serialNo='';
                    this.searchTreeForm2.serialNo='';
                    this.searchTreeForm2.name='';
                }
            },
            //获取原料分类
            getMaterial(){
                let _this=this;
                requestSearchOrg({}).then(res=>{
                    if(res.status == 200){
                        let data = res.data;
                        if(data){
                            if(data && data.length>0){
                                _this.orgTreeData2=data;
                            }else{
                                _this.orgTreeData2=[];
                            }
                        }else{
                            _this.$message({
                                type:'error',
                                message:'系统异常！'
                            })
                        }
                    }
                })
            },
            //获取原料每一项数据
            getMaterialList(){
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
            handleNodeClick3(data){
                this.searchTreeForm2.name = '';
                this.paramTree2.name = '';
                this.paramTree2.packCategoryId = '';
                this.paramTree2.serialNo='';
                this.searchTreeForm2.serialNo='';
                this.searchTreeForm2.name='';
                if(!data.id==0){
                    this.paramTree2.categoryId=data.id;
                }
                this.paramTree2.pageNo = 1;
                this.getMaterialList();
            },
            handleNodeClick2(data) {
                this.searchTreeForm2.name = '';
                this.paramTree2.name = '';
                this.paramTree2.packCategoryId = '';
                this.paramTree2.serialNo='';
                this.searchTreeForm2.serialNo='';
                this.searchTreeForm2.name='';
                if(data.id=="0"){

                }else{
                    this.paramTree2.packCategoryId = data.id;
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
                requestSearchGroupList(_this.paramTree2).then(res => {
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
                requestSearchGroup({}).then(res => {
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
            //领料打包添加
            handleClickTreeAdd2(index,row){

                this.tableIndex = '';
                this.tableRow = {};
                this.unitFrom = '';
                if(this.tableTreeData2[index].number > 0){
                   /* this.unitFromDialogFormVisible = true;
                    this.tableIndex = index;
                    this.tableRow = row;
                    this.tableType = 1;*/
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:row.number,
                        price:row.costPrice,
                        name:row.name,
                        serialNo:row.serialNo,
                        spec:row.spec,
                        rawPrice:row.rawPrice,
                        discount:row.discount,
                        amount:row.amount,
                        state:_this.activeName,
                        type:_this.activeName == 0? 1:2,
                        inStockOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveInStockDetail(addParam).then(res => {
                        if(res.status == 200){
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.unitFromDialogFormVisible = false;
                                    _this.getAjaxList(1);
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            unitFromAdd(){
                this.ajaxSaveInStockDetail(this.tableIndex,this.tableRow,this.tableType);
            },
            ajaxSaveInStockDetail(index,row,tableType){

                let number = 0;
                if(tableType == 1){
                    if(this.unitFrom){
                        let tn = {};
                        tn = this.unitFromList.find((item)=>{
                            return item.id === this.unitFrom;
                        });
                        number = tn.ratio*this.tableTreeData2[index].number;
                    }else{
                        number = this.tableTreeData2[index].number;
                    }
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        spec:row.spec,
                        rawPrice:row.rawPrice,
                        discount:row.discount,
                        amount:row.amount,
                        state:_this.activeName,
                        type:_this.activeName == 0? 1:2,
                        inStockOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveInStockDetail(addParam).then(res => {
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
                            _this.saveLoading = false;
                            _this.unitFromDialogFormVisible = false;
                            _this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }else{
                    let _this = this;
                    let addParam = {};
                    let tn = {};
                    tn = this.unitFromList.find((item)=>{
                        return item.id === this.unitFrom;
                    });
                    if(tableType == 2){
                        if(this.unitFrom){
                            number = tn.ratio*this.directTableTreeData[index].number;
                        }else{
                            number = this.directTableTreeData[index].number;
                        }
                    }else if(tableType == 3){
                        if(this.unitFrom){
                            number = tn.ratio*this.directTableTreeData2[index].number;
                        }else{
                            number = this.directTableTreeData2[index].number;
                        }
                    }if(tableType == 4){
                        if(this.unitFrom){
                            number = tn.ratio*this.directTableTreeData3[index].number;
                        }else{
                            number = this.directTableTreeData3[index].number;
                        }
                    }if(tableType == 5){
                        if(this.unitFrom){
                            number = tn.ratio*this.directTableTreeData4[index].number;
                        }else{
                            number = this.directTableTreeData4[index].number;
                        }
                    }
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.directActiveName,
                        inStockOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveInStockDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.unitFromDialogFormVisible = false;
                                    _this.saveLoading = false;//关闭提交按钮loding
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
                }
            },
            //默认显示今天
            getdatatime(){
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let day = nowDate.getDate();
                let newDay =day>9?day:"0"+day; //日
                let newMonth= month>9?month:"0"+month;
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
                        _this.saveLoading = true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteInDetail(deleteParam).then(res => {
                            _this.saveLoading = false;
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

                if(this.editForm.type == 4){
                    if(this.tabName==0){
                        this.getTreeAjaxPage2();
                        this.getTreeAjaxList2();
                        this.dialogTreeFormVisible = true;
                    }
                    if(this.tabName==1){
                        this.getMaterial();
                        this.getMaterialList();
                        this.dialogTreeFormVisible = true;
                    }
                }else if(this.editForm.type == 2){

                    this.directGetTreeAjaxPage();
                    this.directGetTreeAjaxList();
                    this.directDialogTreeFormVisible = true;
                }
            },
            //查询明细列表
            getAjaxList(bool){
                let _this = this;
                requestListByInPid(_this.param2).then(res => {
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
            //如库单详情
            requestClientInfo(){
                let _this = this;
                requestInStockOrderDetailInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.type=data.type;
                            _this.editForm.purchaseOrderIds = data.purchaseOrderIds.split(',');
                            _this.editForm.storeReturnIds = data.storeReturnIds.split(',');
                            _this.editForm.pickOrderIds = data.pickOrderIds;
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
                this.$router.push({ path: '/inStockOrder' });
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
                            type : _this.editForm.type,
                            purchaseOrderIds: _this.editForm.type == 2 ? '':_this.editForm.purchaseOrderIds.toString(),
                            storeReturnIds: _this.editForm.type == 3 ? _this.editForm.storeReturnIds.toString():'',
                            pickOrderIds: _this.editForm.pickOrderIds
                        };
                        requestSaveInStockOrder(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('inId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.requestClientInfo();
                                    _this.getAjaxList(2);
                                    _this.saveLoading = false;
                                    //_this.editForm.type.disabled=true;
                                    _this.typeBool=true;
                                }
                            });
                        });
                    } else {
                        return false;
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
            //采购单列表
            getAjaxPList(){
                let _this = this;
                requestSearchPurchase(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.purchaseList = data;
                    }else{
                        _this.purchaseList = [];
                    }
                });
            },
            //退货单列表
            getAjaxOList(){
                let _this = this;
                requestStoreReturnPage(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.storeReturnList = data;
                    }else{
                        _this.storeReturnList = [];
                    }
                });
            },
            //领料单列表
            getAjaxPickOrderList(){
                let _this = this;
                requestMaterialPage(_this.param3).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.pickOrderList = data;
                    }else{
                        _this.pickOrderList = [];
                    }
                });
            },
            //直接入库弹出层方法
            directHandleClick(tab, event) {
                if(tab.name == '1'){
                    this.directGetTreeAjaxPage();
                    this.directGetTreeAjaxList();
                }else if(tab.name == '2'){
                    this.directGetTreeAjaxPage2();
                    this.directGetTreeAjaxList2();
                }else if(tab.name == '3'){
                    this.directGetTreeAjaxPage3();
                }else if(tab.name == '4'){
                    this.directGetTreeAjaxPage4();
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
            directHandleClickTreeAdd(index,row){
                this.tableIndex = '';
                this.tableRow = {};
                this.unitFrom = '';
                if(this.directTableTreeData[index].number > 0){
                    this.unitFromDialogFormVisible = true;
                    this.tableIndex = index;
                    this.tableRow = row;
                    this.tableType = 2;
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
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
                if(this.directTableTreeData2[index].number > 0){
                    this.unitFromDialogFormVisible = true;
                    this.tableIndex = index;
                    this.tableRow = row;
                    this.tableType = 3;
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            directOnSearchTree3() {
                this.directParamTree3.pageNo =1;
                this.directParamTree3.serialNo = this.directSearchTreeForm3.serialNo;
                this.directParamTree3.name = this.directSearchTreeForm3.name;
                this.directParamTree3.type = this.directSearchTreeForm3.type;
                this.directGetTreeAjaxPage3();
            },
            directHandleCurrentChangeTree3(val) {
                this.directParamTree3.pageNo = val;
                this.directGetTreeAjaxPage3();
            },
            directGetTreeAjaxPage3(){
                let _this = this;
                requestSearchAssets(_this.directParamTree3).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.directTableTreeData3 = data;
                            _this.directTotalTreeNum3 = parseInt(res.data.totalNum);
                        }else{
                            _this.directTableTreeData3 = [];
                            _this.directTotalTreeNum3 = 0;
                        }
                    }
                });
            },
            directHandleClickTreeAdd3(index,row){
                this.tableIndex = '';
                this.tableRow = {};
                this.unitFrom = '';
                if(this.directTableTreeData3[index].number >0){
                    this.unitFromDialogFormVisible = true;
                    this.tableIndex = index;
                    this.tableRow = row;
                    this.tableType = 4;
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            directOnSearchTree4() {
                this.directParamTree4.pageNo =1;
                this.directParamTree4.serialNo = this.directSearchTreeForm4.serialNo;
                this.directParamTree4.name = this.directSearchTreeForm4.name;
                this.directParamTree4.type = this.directSearchTreeForm4.type;
                this.directGetTreeAjaxPage4();
            },
            directHandleCurrentChangeTree4(val) {
                this.directParamTree4.pageNo = val;
                this.directGetTreeAjaxPage4();
            },
            directGetTreeAjaxPage4(){
                let _this = this;
                requestSearchAssets(_this.directParamTree4).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.directTableTreeData4 = data;
                            _this.directTotalTreeNum4 = parseInt(res.data.totalNum);
                        }else{
                            _this.directTableTreeData4 = [];
                            _this.directTotalTreeNum4 = 0;
                        }
                    }
                });
            },
            directHandleClickTreeAdd4(index,row){
                this.tableIndex = '';
                this.tableRow = {};
                this.unitFrom = '';
                if(this.directTableTreeData4[index].number > 0){
                    this.unitFromDialogFormVisible = true;
                    this.tableIndex = index;
                    this.tableRow = row;
                    this.tableType = 5;
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
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
        },
        filters: {
            substr(value){
                if(value!=null){
                    return value.toFixed(4);
                }
            }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('inId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.typeBool=true;
                this.requestClientInfo();
                this.getAjaxList(2);
            }
            //采购单列表
            this.getAjaxPList();
            this.getAjaxProduct();
            this.getdatatime();
            this.getAjaxOList();
            this.getAjaxPickOrderList();
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

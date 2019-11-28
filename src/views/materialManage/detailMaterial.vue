<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/material' }">领料单管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="text-align: right">
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
                <el-form-item label="领料单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" disabled></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="领料日期">
                            <el-date-picker disabled type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
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
                <el-form-item label="备注">
                    <el-input type="textarea" disabled placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
            </el-form>
            <!--领料单明细-->
            <div class="contentBody" v-if="id">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="原料名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="140">
                        <template slot-scope="scope">
                            ￥{{scope.row.price}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestMaterialInfo,requestListByMaterialPid} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            return {
                tableData: null,//领料单明细列表
                //领料单弹出层
                formLabelWidth: '80px',
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
                    ]
                },
                content:''
            }
        },
        methods: {
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
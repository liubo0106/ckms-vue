<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/slr' }">报损单管理</el-breadcrumb-item>
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
                    <el-input disabled type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200" disabled></el-input>
                </el-form-item>
            </el-form>
            <!--采购单明细-->
            <div class="contentBody" v-if="isShow">
                <span style="display: block;margin-bottom: 15px;">驳回原因</span>
                <el-table :data="contentData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="comment" label="原因"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="createUser" label="驳回人"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="createTime" label="时间"></el-table-column>
                </el-table>
            </div>
            <div class="contentBody" v-if="id">

                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestDestroyInfo,requestListByDestroyPid,requestListByRejectRecordPid} from '../../api/api';
    export default {
        name: 'edit-out-stock-order',
        data() {
            return {
                tableData: null,//采购单明细列表
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    customerId:'',
                    type:'1',
                },
                //表单校验
                rules: {
                    name: [
                        { required: true, message: '请输入废库单名称', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请选择废库日期', trigger: 'blur' },
                    ],
                },
                param2: {
                    pid:''
                },
                productList:[],
                isShow:false,
                contentData:[],

            }
        },
        methods: {
            //查询明细列表

            getAjaxList(){
                let _this = this;
                requestListByDestroyPid(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }
                });
                requestListByRejectRecordPid(_this.param2).then((res)=>{
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
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
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
                this.$router.push({ path: '/slr' });
            }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('lossReportId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.requestClientInfo();
                this.getAjaxList();
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
            height: 700px;
        }
    }
</style>

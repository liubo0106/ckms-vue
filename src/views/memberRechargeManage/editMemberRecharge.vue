<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>会员充值管理</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>-->
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="9">
                        <el-form-item  label="会员" prop="memberId">
                            <el-select v-model="editForm.memberId" placeholder="请选择" filterable  @change="changeMember">
                                <el-option v-for="item in memberList" :label="item.name"   :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item  label="手机号" v-if="phone!=0">
                            <el-input  v-model="phone" :maxlength="11" style="width:218px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item  label="门店">
                            <el-select v-model="editForm.customerId" placeholder="请选择" :disabled="disabled2" @change="changeStore">
                                <el-option v-for="item in customerList" :label="item.name"   :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="充值金额" prop="money">
                            <el-select v-model="editForm.money" placeholder="请选择" @change="changeMoney" clearable :disabled="disabled3">
                                <el-option v-for="item in moneyList" :label="item.money"   :value="item.money"></el-option>
                            </el-select>
                            <el-button  :icon="moneyType==0 ? 'el-icon-plus':'el-icon-minus'"   circle @click="handleClick('', '', 'moneyType')"></el-button>
                        </el-form-item>
                        <el-form-item label="自定义金额" prop="money2" style="width: 320px" v-if="moneyType==1">
                            <el-input placeholder='请输入' v-model="editForm.money2" :maxlength="11" @change="changeCustomMoney"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="赠送金额" prop="give">
                            <el-input-number size="medium" :precision="2" v-model="editForm.give" :min="0" :max="999999999"  style="width:218px" disabled></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="折扣" prop="discount">
                            <el-input placeholder='请输入' v-model="editForm.discount" :maxlength="25" disabled style="width:218px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">

                    </el-col>
                </el-row>
                <!--<el-row>
                    <el-col :span="8">
                        <el-form-item label="充值金额" prop="price" >
                            <el-input-number size="medium" :precision="2" v-model="editForm.price" :min="0" :max="999999999" style="width:218px"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="赠送金额" prop="price">
                            <el-input-number size="medium" :precision="2" v-model="editForm.price" :min="0" :max="999999999"  style="width:218px"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>-->
                <el-form-item label="备注" prop="remark">
                    <el-input  type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <!--<el-button @click="goBack()">返回</el-button>-->
                </el-form-item>
            </el-form>
            <!--会员明细-->
            <div class="contentBody" >
               <!-- <el-form label-width="60px" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label-width="0">
                                <el-button icon="el-icon-plus" circle @click="handleClickDetail('', '', 'add')"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>-->
                <el-table :data="tableData" border>
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="money" label="充值金额"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="give" label="赠送金额"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="discount" label="享受折扣" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="customerName" label="充值门店名称" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="statusName" label="状态" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="createUser" label="操作员" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="260">
                     <template slot-scope="scope">
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.status == 0' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button icon="el-icon-success" v-if='scope.row.status == 0' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestSaveMemberRecharge,requestDeleteMemberRecharge,requestSearchMember,requestMemberRecharge,requestSearchClient,requestSearchrechargeRule,requestSearchMemberRecharge} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId')
            let customerName= sessionStorage.getItem('customerName')
            if(customerId=="null"){
                customerId='-'
            }
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                flag:sessionStorage.getItem('flag'),
                id: '',
                saveLoading: false,
                customerList:[],//门店
                memberList:[],//会员
                moneyList:[],//充值金额
                tableData: null,//会员充值明细列表
                disabled2:false,//门店
                disabled3:false,//门店
                moneyType:'0',//金额类型
                editForm: {
                    memberId:'',
                    money:'',
                    money2:'',//自定义金额
                    give:'',
                    discount:'',
                    customerId:customerId,
                    customerName: customerName,
                    customerName:'',
                    remark: '',
                },
                checkAll: false,
                rules: {
                    memberId: [
                        { required: true, message: '请输入选择会员', trigger: 'blur' },
                    ],


                },
                param: {
                    pageNo:1,
                    pageSize:0,
                    customerId:customerId,
                    status:1
                },
                //充值金额
                param2: {
                    money:'',
                },
                phone:0,
                //会员
                param3: {
                    memberId:'',
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
            }
        },
        methods: {
            //门店
            changeStore(val){
                let tn = {};
                tn = this.customerList.find((item)=>{
                    return item.id === val;
                });
                this.editForm.customerName = tn.name;
            },
            //会员
            changeMember(val){
                let tn = {};
                for(let i=0;i<this.memberList.length;i++){
                    if(this.memberList[i].id==val){
                        this.phone=this.memberList[i].phone;
                    }
                }
                tn = this.memberList.find((item)=>{
                    return item.id === val;
                });

                if(tn){
                    this.editForm.memberId = tn.id;
                    this.param3.memberId = tn.id;

                }else{
                    this.editForm.memberId=''
                }
                this.getTreeAjaxPage();

            },
            //充值金额
            changeMoney(val){
                let tn = {};
                tn = this.moneyList.find((item)=>{
                    return item.money === val;
                });
                if(tn){
                    this.editForm.give = tn.give;
                    this.editForm.discount = tn.discount;
                }else{
                    this.editForm.give=''
                    this.editForm.discount=''
                }

            },
            //自定义充值金额
            changeCustomMoney(val){
                let front=''
                let last=''
                for(let i=0;i<this.moneyList.length;i++){
                    front=this.moneyList[i].money;
                    if(val>=front){
                        let tn = {};
                        tn = this.moneyList.find((item)=>{
                            return item.money === front;
                        });
                        if(tn){
                            this.editForm.give = tn.give;
                            this.editForm.discount = tn.discount;
                        }else{
                            this.editForm.give=''
                            this.editForm.discount=''
                        }
                        break
                    }
                }
            },


            //请求会员
            getAjaxMember(){
                let _this = this;
                requestSearchMember(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.memberList = data;
                    }else{
                        _this.memberList = [];
                    }
                });
            },
            //请求门店
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
            //请求充值金额
            getAjaxMoney(){
                let _this = this;
                requestSearchrechargeRule(_this.param2).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.moneyList = data;
                    }else{
                        _this.moneyList = [];
                    }
                });
            },
            //请求会员明细
            getTreeAjaxPage(){
                let _this = this;
                requestSearchMemberRecharge(_this.param3).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableData = data;
                        }else{
                            _this.tableData = [];

                        }
                    }
                });
            },

            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteMemberRecharge(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
                                    _this.param.pageNo =1;
                                    _this.getTreeAjaxPage();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'ok'){
                    this.$confirm('是否确认该充值信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestMemberRecharge(sParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.param.pageNo =1;
                                    _this.getTreeAjaxPage();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(doType == 'moneyType'){
                   // this.moneyType='1'
                    if(this.moneyType==0){
                        this.moneyType='1'
                        this.disabled3 = true;
                        _this.editForm.money='';
                        _this.editForm.give='';
                        _this.editForm.discount='';
                    }else{
                        this.moneyType='0'
                        this.disabled3 = false;

                    }
                }
            },
            goBack() {
                this.$router.push({ path: '/memberRechargeManage' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let tn = {};
                        tn = this.customerList.find((item)=>{
                            return item.id === _this.editForm.customerId;
                        });
                        if(this.flag!='store'){
                            _this.editForm.customerName=_this.editForm.customerName;

                        }
                        if(_this.editForm.money){
                            _this.editForm.money=_this.editForm.money
                        }else{
                            _this.editForm.money=_this.editForm.money2
                        }
                        let editFormParam ={
                            memberId: _this.editForm.memberId,
                            money: _this.editForm.money,
                            give: _this.editForm.give,
                            discount: _this.editForm.discount,
                            customerId: _this.editForm.customerId,
                            customerName: tn.name,
                            remark: _this.editForm.remark,
                        };
                        requestSaveMemberRecharge(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    //_this.goBack();
                                    _this.getTreeAjaxPage();
                                    _this.editForm.money='';
                                    _this.editForm.money2='';
                                    _this.editForm.give='';
                                    _this.editForm.discount='';
                                    _this.editForm.memberId='';
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
            /*let id = sessionStorage.getItem('id');

            if(id){
                this.id=id;
                this.requestSupplierInfo();
            }*/
            this.getAjaxMember();//会员
            this.getAjaxSupplier();//门店
            this.getAjaxMoney();//充值金额
            //根据用户身份判断门店是否可选
            if(this.flag=='store'){
                this.disabled2 = true;
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

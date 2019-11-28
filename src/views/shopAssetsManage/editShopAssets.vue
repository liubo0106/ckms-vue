<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/shopAssetsManage' }">门店固定资产管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资产类型" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择" @change="changeProductType">
                                <el-option  label="固定资产" value="1">固定资产</el-option>
                                <el-option label="易耗材" value="2">易耗材</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-row>
                            <el-form-item v-if="editForm.type==1"  label="固定资产名称" :label-width="formLabelWidth" prop="productInfoId">
                                <el-select v-model="editForm.productInfoId" placeholder="请选择" @change="changeFixed">
                                    <el-option v-for="item in fixedList" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  v-if="editForm.type==2" label="易耗品名称" :label-width="formLabelWidth" prop="productInfoId">
                                <el-select v-model="editForm.productInfoId" placeholder="请选择" @change="changeConsume">
                                    <el-option v-for="item in consumetList" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestSaveGoods,requestGoodsInfo,requestGoodsInfoPid,requestSearchAssets} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            //校验商品是否重复添加
            var validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择商品'));
                } else {
                    if(this.oldProductInfoId === value){
                        callback();
                    }else{
                        requestGoodsInfoPid({pid:value}).then(res=>{
                            let data = res.data;
                            if (res.status == 200) {
                                callback();
                            }else{
                                callback(new Error(res.msg));
                            }
                        });
                    }
                }
            };
            var customerId= sessionStorage.getItem('customerId');
            var id=sessionStorage.getItem('id');
            return {
                oldProductInfoId:'',
                id: id,//主表id
                saveLoading: false,
                formLabelWidth: '120px',
                editForm: {
                    customerId:customerId,//门店ID
                    type:'1',
                    productInfoId:'',
                    price:0,
                    name:'',
                    serialNo:'',
                    standard:''
                },
                param1: {
                    pageSize:0,
                    type:'1'
                },
                param2: {
                    pageSize:0,
                    type:'2'
                },
                fixedList:[],
                consumetList:[],
                rules: {
                    productInfoId: [
                        { required: true, message: '请选择商品', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字', trigger: 'blur' },
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            //类型切换的时候清除原有数据
            changeProductType(){
                this.editForm.productInfoId=''
            },
            changeFixed(val){
                let tn = {};
                tn = this.fixedList.find((item)=>{
                    return item.id === val;
                });
                this.editForm.name = tn.name;
                this.editForm.serialNo = tn.serialNo;

            },
            changeConsume(val){
                let tn = {};
                tn = this.consumetList.find((item)=>{
                    return item.id === val;
                });
                this.editForm.name = tn.name;
                this.editForm.serialNo = tn.serialNo;
            },
            //请求固定资产信息
            getAjaxFixed(){
                let _this = this;
                requestSearchAssets(_this.param1).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.fixedList = data;
                        }else{
                            _this.fixedList = [];
                        }
                    }
                });
            },
            //请求易耗品信息
            getAjaxConsume(){
                let _this = this;
                requestSearchAssets(_this.param2).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.consumetList = data;
                        }else{
                            _this.consumetList = [];
                        }
                    }
                });
            },
            //门店商品信息
            requestGoodsInfo(){
                let _this = this;
                requestGoodsInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.type = data.type+'';
                            _this.editForm.productInfoId = data.productInfoId;
                            _this.editForm.serialNo = data.serialNo;
                            _this.editForm.standard = data.standard;
                            _this.oldProductInfoId = data.productInfoId;
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
                this.$router.push({ path: '/shopAssetsManage' });
            },
            /*主表*/
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            id:_this.id,
                            type: _this.editForm.type == 1? 3:4,
                            productInfoId: _this.editForm.productInfoId,
                            name: _this.editForm.name,
                            serialNo: _this.editForm.serialNo
                        };
                        requestSaveGoods(editFormParam).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.goBack();
                                        _this.saveLoading = false;
                                    }
                                });
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
        beforeMount() {
            this.getAjaxFixed();
            this.getAjaxConsume();
            if(this.id){
                this.requestGoodsInfo();
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
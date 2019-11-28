<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/assetsManage'}">固定资产及易消耗品管理</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>-->
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="资产编号" prop="serialNo">
                    <el-input placeholder='请输入' v-model="editForm.serialNo" :maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="资产名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="25"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资产类型" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择" style="width: 218px">
                                <el-option  label="固定资产" value="1">固定资产</el-option>
                                <el-option label="易耗品" value="2">易耗品</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="资产类別" prop="category">
                            <el-select v-model="editForm.category" placeholder="请选择" >
                                <el-option v-for="item in assetsList" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="单位" prop="standard">
                            <el-select v-model="editForm.standard" placeholder="请选择" >
                                <el-option v-for="item in standardDataDicList" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="型号" prop="model">
                            <el-input placeholder='请输入' v-model="editForm.model" :maxlength="15" style="width: 218px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="安全库存" prop="safeStock">
                            <el-input-number size="medium" :precision="2" v-model="editForm.safeStock" :min="0" :max="999999999" :step="1" style="width: 218px"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestAssetsInfo, requestSaveAssets,requestSupplierDataDic} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {

            return {
                id: '',
                saveLoading: false,
                editForm: {
                    name: '',
                    serialNo: '',
                    type:'1',
                    model: '',
                    category: '',
                    remark: '',
                    standard: '',
                    safeStock: 0
                },
                rules: {
                    serialNo: [
                        { required: true, message: '请输入资产编号', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入资产名称', trigger: 'blur' },
                    ],
                    model: [
                        { required: true, message: '请输入型号', trigger: 'blur' },
                    ],
                    category: [
                        { required: true, message: '请选择资产类别', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择资产类型', trigger: 'blur' },
                    ],
                    standard: [
                        { required: true, message: '请选择单位', trigger: 'change' },
                    ]
                },
                standardParam: {
                    type:"单位"
                },
                assetsParam: {
                    type:"资产类别"
                },
                assetsList:[],
                standardDataDicList:[]
            }
        },
        methods: {
            requestAssetsInfo(){
                let _this = this;
                requestAssetsInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.model = data.model;
                            _this.editForm.category = data.category;
                            _this.editForm.remark = data.remark;
                            _this.editForm.serialNo = data.serialNo;
                            _this.editForm.safeStock = data.safeStock;
                            _this.editForm.type=data.type+"";
                            _this.editForm.standard=data.standard;
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
                this.$router.push({ path: '/assetsManage' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            name: _this.editForm.name,
                            model: _this.editForm.model,
                            category: _this.editForm.category,
                            remark: _this.editForm.remark,
                            serialNo: _this.editForm.serialNo,
                            safeStock: _this.editForm.safeStock,
                            type : _this.editForm.type,
                            standard : _this.editForm.standard,
                            id : _this.id
                        };
                        requestSaveAssets(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.goBack();
                                    _this.saveLoading = false;
                                }
                            });
                        });
                    } else {
                        return false;
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
                requestSupplierDataDic(_this.assetsParam).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.assetsList = data;
                        }else{
                            _this.assetsList = [];
                        }
                    }
                });


            },

        },
        beforeMount() {
            let id = sessionStorage.getItem('id');
            if(id){
                this.id=id;
                this.requestAssetsInfo();
            }
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

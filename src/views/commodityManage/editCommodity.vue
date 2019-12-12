<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/commodityManage' }">原料管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{userId == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="原料编号" prop="serialNo">
                            <el-input placeholder='请输入' v-model="editForm.serialNo" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="原料出成率">
                            <el-input-number size="medium"  v-model="editForm.rawYield" :min="0.1" :max="1" :step="0.1" ></el-input-number>
                        </el-form-item>-->
                        <el-form-item label="安全库存" prop="safeStock">
                            <el-input-number size="medium" :precision="2" v-model="editForm.safeStock" :min="0" :max="999999999" :step="1" ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                       <!-- -->
                        <el-form-item label="原料名称" prop="name">
                            <el-input placeholder='请输入' v-model="editForm.name" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="净料出成率" prop="netYield">
                            <el-input-number size="medium"  v-model="editForm.netYield" :min="0.1" :max="1" :step="0.1" ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" >
                       <!-- -->
                        <el-form-item label="原料分类" prop="deptArray">
                            <!--<div slot="label"><span class="red-span" v-show="editForm.flag != 'company'">*</span>原料分类</div>-->
                            <template>
                                <el-cascader
                                        style="width: 100%"
                                        class="self-cascader-width"
                                        filterable
                                        :clearable = 'true'
                                        :props="props"
                                        placeholder = '请选择'
                                        v-model="editForm.deptArray"
                                        change-on-select
                                        :options="deptList">
                                </el-cascader>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="净料库存量" >-->
                            <!--<el-input-number disabled size="medium"  :precision="2" v-model="editForm.stock" :min="0" :step="1" ></el-input-number>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="出售单价" prop="safeStock">
                            <el-input-number size="medium" :precision="2" :disabled="true" v-model="editForm.price" :min="0" :max="999999999"></el-input-number>
                        </el-form-item>-->
                    </el-col>
                    <el-col :span="24">
                        <!--<el-form-item label="净料库存量" >-->
                        <!--<el-input-number disabled size="medium"  :precision="2" v-model="editForm.stock" :min="0" :step="1" ></el-input-number>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="成本价" prop="safeStock">
                            <el-input-number size="medium" :precision="2" :disabled="true" v-model="editForm.price" :min="0" :max="999999999"></el-input-number>
                        </el-form-item>-->
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="规格含量" prop="specPrefNum">
                            <el-input v-model="editForm.specPrefNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="基础单位" prop="standard">
                            <el-select v-model="editForm.standard" placeholder="请选择"  style="width: 200px" >
                                <el-option v-for="item in standardDataDicList" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="规格单位" prop="specSufStandard">
                            <el-select v-model="editForm.specSufStandard" placeholder="请选择"  style="width: 100%" >
                                <el-option v-for="item in standardDataDicList" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">

                    </el-col>
                    <el-col :span="8">

                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" style="background-color: #35B178;border-color:#35B178;" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestProductInfo, requestAllRole, requestSaveProduct, requestSearchOrg,requestSupplierDataDic} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            var validateDeptArray = (rule, value, callback) =>{
                if(this.editForm.flag == 'company'){
                    callback();
                }else{
                    if (value && value.length>0) {
                        callback();
                    } else {
                        callback(new Error('请选择'));
                    }
                }
            };
            return {
                pathIds: sessionStorage.getItem('pathIds'),
                oldName:'',
                nextDeptData: [],
                postList:[],
                dataDicList:[],
                standardDataDicList:[],
                props: {
                    checkStrictly:true,
                    value: 'id',
                    label: 'name',
                    children:'children'
                },
                deptList: [],
                deptId: sessionStorage.getItem('deptId'),
                saveLoading: false,
                userId: '',
                param: {
                    type:"规格"
                },
                standardParam: {
                    type:"单位"
                },
                editForm: {
                    name: '',
                    spec: '',
                    serialNo:'',
                    checkedRole: [],//默认选中角色
                    flag: 'staff',
                    post: '',
                    deptArray:[],
                    isManager:'',
                    rawPrice:'',
                    rawYield:'',
                    yieldPrice:'',
                    standard:'',
                    netYield:1,
                    rawYield:1,
                    costPrice:'',
                    number:'',
                    stock:'',
                    safeStock:'',
                    dataDicListId:'',
                    specPrefNum:'',
                    specSufStandard:'',
                    isLook:"0",
                    price:"0"

                },
                checkAll: false,
                roleIdList: [],//角色id
                roleList: null,//后台角色列表
                isIndeterminate: true,//全选按钮状态
                rules: {
                    name: [
                        { required: true, message: '请输入原料名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 100 个字', trigger: 'blur' }
                    ],
                    serialNo: [
                        { required: true, message: '请输入原料编号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 100 个字', trigger: 'blur' }
                    ],
                    standard: [
                        { required: true, message: '请选择单位', trigger: 'blur' },
                    ],
                    deptArray: [
                        { type: 'array', required: true, message: '请选择原料分类', trigger: 'change' }
                    ],
                    specPrefNum:[
                        { required: true, message: '请输入原料规格', trigger: 'blur' },
                    ],
                    specSufStandard:[
                        { required: true, message: '请选择原料规格单位', trigger: 'change' },
                    ]

                },

                headers: {'sessionId': sessionStorage.getItem('sessionId')},

            }
        },
        methods: {
            getTreeAjaxList(){
                let _this = this;
                requestSearchOrg({}).then(res => {
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
            getAjaxUserInfo(){
                let _this = this;
                requestProductInfo({id:this.userId}).then(res => {
                    let data = res.data;
                    if (data) {
                        _this.oldName = data.username;
                        _this.editForm.name = data.name;
                        _this.editForm.spec = data.spec;
                        _this.editForm.serialNo = data.serialNo;
                        _this.editForm.rawPrice = data.rawPrice;
                        _this.editForm.rawYield = data.rawYield;
                        _this.editForm.yieldPrice = data.yieldPrice;
                        _this.editForm.standard = data.standard;
                        _this.editForm.netYield = data.netYield;
                        _this.editForm.costPrice = data.costPrice;
                        _this.editForm.number = data.number;
                        _this.editForm.stock = data.stock;
                        _this.editForm.safeStock = data.safeStock;
                        _this.editForm.isLook = data.isLook+'';
                        _this.editForm.price = data.price;
                        _this.editForm.isWarning = data.isWarning;
                        _this.editForm.specPrefNum = data.specPrefNum;
                        _this.editForm.specSufStandard = data.specSufStandard;
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
            getAjaxAllRole(){
                let _this = this;
                requestAllRole().then(res => {
                    let data = res.data;
                    if (data && data.length>0) {
                        _this.roleList = data;
                        _this.roleList.forEach((p)=>{
                            _this.roleIdList.push(p.id);
                        });
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            handleCheckAllChange(val) {
                this.editForm.checkedRole = val ? this.roleIdList : [];
                this.isIndeterminate = false;
            },
            goBack() {
                this.$router.push({ path: '/commodityManage' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let pp = _this.editForm.deptArray;
                        let editFormParam ={
                            categoryId: pp.length>0 ? pp[pp.length-1].toString() : '',
                            name: _this.editForm.name,
                            spec: _this.editForm.spec,
                            serialNo: _this.editForm.serialNo,
                            id : _this.userId,
                            strArray:pp.length>0 ? pp.toString() : '',
                            rawPrice: _this.editForm.rawPrice,
                            rawYield: _this.editForm.rawYield,
                            yieldPrice: _this.editForm.yieldPrice,
                            standard: _this.editForm.standard,
                            netYield: _this.editForm.netYield,
                            costPrice: _this.editForm.costPrice,
                            number: _this.editForm.number,
                            stock: _this.editForm.stock,
                            safeStock: _this.editForm.safeStock,
                            isLook: _this.editForm.isLook,
                            price: _this.editForm.price,
                            isWarning: _this.editForm.isWarning,
                            specPrefNum:_this.editForm.specPrefNum,
                            specSufStandard:_this.editForm.specSufStandard,
                            spec:`${_this.editForm.specPrefNum}${_this.editForm.standard}/${_this.editForm.specSufStandard}`
                        };
                        requestSaveProduct(editFormParam).then(res => {
                            if(res.status==400){
                                this.$message({
                                    type:'error',
                                    message:res.msg,
                                    duration:1000,
                                })
                                _this.saveLoading = false;
                                return false;
                            }
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
            //请求商品规格
            getAjaxProductDataDic(){
                let _this = this;
                requestSupplierDataDic(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.dataDicList = data;
                        }else{
                            _this.dataDicList = [];
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
        },
        beforeMount() {
            this.getTreeAjaxList();
            let id = sessionStorage.getItem('userId');
            this.userId = id;
            if(id){
                this.getAjaxUserInfo();
            }else{
                if(this.pathIds && this.pathIds.length>0){
                    this.editForm.deptArray = this.pathIds.length>0 ? this.pathIds.split(','):[];
                }
            }
            this.getAjaxAllRole();
            this.getAjaxProductDataDic();
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
    .red-span{
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
</style>

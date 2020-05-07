<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>小票打印机配置</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-row>
                <el-form :model="editForm1" :rules="rules" ref="editForm1" label-width="200px" class="demo-ruleForm">
                    <el-col :span="11">
                        <el-form-item label="门店接单打印机"  prop="ORDER_PRINTER_IP">
                            <el-input placeholder='请输入有效的IP地址' v-model="editForm1.ORDER_PRINTER_IP" @change="submitForm('editForm1')" :maxlength="15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="testPrint('editForm1')" type="primary">测试</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="remove('editForm1')" type="danger">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-form :model="editForm2" :rules="rules" ref="editForm2" label-width="200px" class="demo-ruleForm">
                    <el-col :span="11">
                        <el-form-item label="厨房火锅、涮锅接单打印机" prop="HOTPOT_PRINTER_IP">
                            <el-input placeholder='请输入有效的IP地址' v-model="editForm2.HOTPOT_PRINTER_IP" @change="submitForm('editForm2')" :maxlength="15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="testPrint('editForm2')" type="primary">测试</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="remove('editForm2')" type="danger">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-form :model="editForm3" :rules="rules" ref="editForm3" label-width="200px" class="demo-ruleForm">
                    <el-col :span="11">
                        <el-form-item label="厨房烧烤接单打印机"  prop="BARBECUE_PRINTER_IP">
                            <el-input placeholder='请输入有效的IP地址' v-model="editForm3.BARBECUE_PRINTER_IP" @change="submitForm('editForm3')" :maxlength="15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="testPrint('editForm3')" type="primary">测试</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="remove('editForm3')" type="danger">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-form :model="editForm4" :rules="rules" ref="editForm4" label-width="200px" class="demo-ruleForm">
                    <el-col :span="11">
                        <el-form-item label="厨房凉菜接单打印机"  prop="COLDDISH_PRINTER_IP">
                            <el-input placeholder='请输入有效的IP地址' v-model="editForm4.COLDDISH_PRINTER_IP" @change="submitForm('editForm4')" :maxlength="15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="testPrint('editForm4')" type="primary">测试</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="remove('editForm4')" type="danger">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>

            <el-row>
                <el-form :model="editForm5" :rules="rules" ref="editForm5" label-width="200px" class="demo-ruleForm">
                    <el-col :span="11">
                        <el-form-item label="传菜全量打印机"  prop="PASSDISH_PRINTER_IP">
                            <el-input placeholder='请输入有效的IP地址' v-model="editForm5.PASSDISH_PRINTER_IP" @change="submitForm('editForm5')" :maxlength="15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="testPrint('editForm5')" type="primary">测试</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="10px">
                            <el-button @click="remove('editForm5')" type="danger">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-form :model="editForm6" :rules="rules" ref="editForm6" label-width="200px" class="demo-ruleForm">
                    <el-col :span="11">
                        <el-form-item label="后厨全量打印机"  prop="
">
                            <el-input placeholder='请输入有效的IP地址' v-model="editForm6.BACKKITCHEN_PRINTER_IP" @change="submitForm('editForm6')" :maxlength="15"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="8px">
                            <el-button @click="testPrint('editForm6')" type="primary">测试</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="8px">
                            <el-button @click="remove('editForm6')" type="danger">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestStorePrinterList, requestStorePrinterSave, requestStorePrinterTest,requestStorePrinterClear} from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            var validateIP = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入IP地址'));
                } else {
                    let myreg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                    if (!myreg.test(value)) {
                        callback(new Error('请输入正确的IP地址'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                customerId: sessionStorage.getItem('customerId'),
                saveLoading1: false,
                saveLoading2: false,
                saveLoading3: false,
                saveLoading4: false,
                saveLoading5: false,
                saveLoading6: false,
                editForm1: {
                    ORDER_PRINTER_IP: ''
                },
                editForm2: {
                    HOTPOT_PRINTER_IP: ''
                },
                editForm3: {
                    BARBECUE_PRINTER_IP: ''
                },
                editForm4: {
                    COLDDISH_PRINTER_IP: ''
                },
                editForm5: {
                    PASSDISH_PRINTER_IP: ''
                },
                editForm6: {
                    BACKKITCHEN_PRINTER_IP: ''
                },
                rules: {
                    HOTPOT_PRINTER_IP: [
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' },
                        { validator:validateIP,trigger:'blur' }
                    ],
                    BARBECUE_PRINTER_IP: [
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' },
                        { validator:validateIP,trigger:'blur' }
                    ],
                    COLDDISH_PRINTER_IP: [
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' },
                        { validator:validateIP,trigger:'blur' }
                    ],
                    ORDER_PRINTER_IP: [
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' },
                        { validator:validateIP,trigger:'blur' }
                    ] ,
                    PASSDISH_PRINTER_IP: [
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' },
                        { validator:validateIP,trigger:'blur' }
                    ],
                    BACKKITCHEN_PRINTER_IP: [
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' },
                        { validator:validateIP,trigger:'blur' }
                    ]
                }
            }
        },
        methods: {
            getAjaxInfo(){
                let _this = this;
                requestStorePrinterList({customerId:this.customerId}).then(res => {
                    let data = res.data;
                    if (data && data.length>0) {
                        data.forEach(item=>{
                            _this.editForm1.ORDER_PRINTER_IP = "";
                            _this.editForm2.HOTPOT_PRINTER_IP ="";
                            _this.editForm3.BARBECUE_PRINTER_IP ="";
                            _this.editForm4.COLDDISH_PRINTER_IP ="";
                            _this.editForm5.PASSDISH_PRINTER_IP ="";
                            _this.editForm6.BACKKITCHEN_PRINTER_IP ="";

                            if(item.code == 'ORDER_PRINTER'){
                                _this.editForm1.ORDER_PRINTER_IP = item.ip;
                            }
                            if(item.code == 'HOTPOT_PRINTER'){
                                _this.editForm2.HOTPOT_PRINTER_IP = item.ip;
                            }
                            if(item.code == 'BARBECUE_PRINTER'){
                                _this.editForm3.BARBECUE_PRINTER_IP = item.ip;
                            }
                            if(item.code == 'COLDDISH_PRINTER'){
                                _this.editForm4.COLDDISH_PRINTER_IP = item.ip;
                            }
                            if(item.code == 'PASSDISH_PRINTER'){
                                _this.editForm5.PASSDISH_PRINTER_IP = item.ip;
                            }
                            if(item.code == 'BACKKITCHEN_PRINTER'){
                                _this.editForm6.BACKKITCHEN_PRINTER_IP = item.ip;
                            }
                        });
                    } else {
                        this.$message({
                            message: '请配置IP地址！',
                            type: 'error'
                        });
                    }
                });
            },

            remove(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let editFormParam ={};
                        if(formName == 'editForm1'){
                            _this.saveLoading1 = true;
                            editFormParam ={
                                code: 'ORDER_PRINTER',
                                ip: _this.editForm1.ORDER_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm2'){
                            _this.saveLoading2 = true;
                            editFormParam ={
                                code: 'HOTPOT_PRINTER',
                                ip: _this.editForm2.HOTPOT_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm3'){
                            _this.saveLoading3 = true;
                            editFormParam ={
                                code: 'BARBECUE_PRINTER',
                                ip: _this.editForm3.BARBECUE_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm4'){
                            _this.saveLoading4 = true;
                            editFormParam ={
                                code: 'COLDDISH_PRINTER',
                                ip: _this.editForm4.COLDDISH_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm5'){
                            _this.saveLoading5 = true;
                            editFormParam ={
                                code: 'PASSDISH_PRINTER',
                                ip: _this.editForm5.PASSDISH_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm6'){
                            _this.saveLoading6 = true;
                            editFormParam ={
                                code: 'BACKKITCHEN_PRINTER',
                                ip: _this.editForm6.BACKKITCHEN_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        requestStorePrinterClear(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.getAjaxInfo();
                                    _this.saveLoading1 = false;
                                    _this.saveLoading2 = false;
                                    _this.saveLoading3 = false;
                                    _this.saveLoading4 = false;
                                    _this.saveLoading5 = false;
                                    _this.saveLoading6 = false;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });

            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let editFormParam ={};
                        if(formName == 'editForm1'){
                            _this.saveLoading1 = true;
                            editFormParam ={
                                code: 'ORDER_PRINTER',
                                ip: _this.editForm1.ORDER_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm2'){
                            _this.saveLoading2 = true;
                            editFormParam ={
                                code: 'HOTPOT_PRINTER',
                                ip: _this.editForm2.HOTPOT_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm3'){
                            _this.saveLoading3 = true;
                            editFormParam ={
                                code: 'BARBECUE_PRINTER',
                                ip: _this.editForm3.BARBECUE_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm4'){
                            _this.saveLoading4 = true;
                            editFormParam ={
                                code: 'COLDDISH_PRINTER',
                                ip: _this.editForm4.COLDDISH_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm5'){
                            _this.saveLoading5 = true;
                            editFormParam ={
                                code: 'PASSDISH_PRINTER',
                                ip: _this.editForm5.PASSDISH_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        if(formName == 'editForm6'){
                            _this.saveLoading6 = true;
                            editFormParam ={
                                code: 'BACKKITCHEN_PRINTER',
                                ip: _this.editForm6.BACKKITCHEN_PRINTER_IP,
                                customerId : _this.customerId
                            };
                        }
                        requestStorePrinterSave(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.getAjaxInfo();
                                    _this.saveLoading1 = false;
                                    _this.saveLoading2 = false;
                                    _this.saveLoading3 = false;
                                    _this.saveLoading4 = false;
                                    _this.saveLoading5 = false;
                                    _this.saveLoading6 = false;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            testPrint(formName){
                let _this = this;
                let editFormParam ={};
                if(formName == 'editForm1'){
                    editFormParam ={
                        code: 'ORDER_PRINTER',
                        customerId : _this.customerId
                    };
                }
                if(formName == 'editForm2'){
                    editFormParam ={
                        code: 'HOTPOT_PRINTER',
                        customerId : _this.customerId
                    };
                }
                if(formName == 'editForm3'){
                    editFormParam ={
                        code: 'BARBECUE_PRINTER',
                        customerId : _this.customerId
                    };
                }
                if(formName == 'editForm4'){
                    editFormParam ={
                        code: 'COLDDISH_PRINTER',
                        customerId : _this.customerId
                    };
                }
                if(formName == 'editForm5'){
                    editFormParam ={
                        code: 'PASSDISH_PRINTER',
                        customerId : _this.customerId
                    };
                }
                if(formName == 'editForm6'){
                    editFormParam ={
                        code: 'BACKKITCHEN_PRINTER',
                        customerId : _this.customerId
                    };
                }
                requestStorePrinterTest(editFormParam).then(res => {

                });
            }
        },
        beforeMount() {
            this.getAjaxInfo();
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
</style>

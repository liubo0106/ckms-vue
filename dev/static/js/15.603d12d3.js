(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"0oTA":function(e,t,r){"use strict";r.r(t);var o=r("TsPW"),a={name:"edit-user-manage",data:function(){return{id:"",saveLoading:!1,editForm:{name:"",phone:"",contact:"",address:""},checkAll:!1,rules:{name:[{required:!0,message:"请输入门店名称",trigger:"blur"}],phone:[{required:!0,message:"请输入电话",trigger:"blur"},{validator:function(e,t,r){""===t?r(new Error("请输入手机号")):/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(t)?r():r(new Error("请输入正确的手机号"))},trigger:"blur"}],contact:[{required:!0,message:"请输入联系人",trigger:"blur"}],address:[{required:!0,message:"请输入地址",trigger:"blur"}]},headers:{sessionId:sessionStorage.getItem("sessionId")}}},methods:{requestClientInfo:function(){var e=this,t=this;Object(o.g)({id:this.id}).then(function(r){if(200==r.status){var o=r.data;o&&(t.editForm.name=o.name,t.editForm.phone=o.phone,t.editForm.contact=o.contact,t.editForm.address=o.address)}else e.$message({message:"请求异常",type:"error"})})},goBack:function(){this.$router.push({path:"/clientManage"})},submitForm:function(e){var t=this,r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.saveLoading=!0;var a={name:r.editForm.name,phone:r.editForm.phone,contact:r.editForm.contact,address:r.editForm.address,id:r.id,status:0};Object(o.Dc)(a).then(function(e){t.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){r.goBack(),r.saveLoading=!1}})})})}},beforeMount:function(){var e=sessionStorage.getItem("id");e&&(this.id=e,this.requestClientInfo())}},n=(r("OzJt"),r("KHd+")),s=Object(n.a)(a,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",[e._v("门店管理")]),e._v(" "),r("el-breadcrumb-item",[e._v(e._s(""==e.id?"新增":"编辑"))])],1),e._v(" "),r("div",{staticClass:"contentBody"},[r("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"门店名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:25},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系人",prop:"contact"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:15},model:{value:e.editForm.contact,callback:function(t){e.$set(e.editForm,"contact",t)},expression:"editForm.contact"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"电话",prop:"phone"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:11},model:{value:e.editForm.phone,callback:function(t){e.$set(e.editForm,"phone",t)},expression:"editForm.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"地址",prop:"address"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:50},model:{value:e.editForm.address,callback:function(t){e.$set(e.editForm,"address",t)},expression:"editForm.address"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.saveLoading},on:{click:function(t){return e.submitForm("editForm")}}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:function(t){return e.goBack()}}},[e._v("返回")])],1)],1)],1)],1)},[],!1,null,"6903c612",null);s.options.__file="editClient.vue";t.default=s.exports},OzJt:function(e,t,r){"use strict";var o=r("SOdA");r.n(o).a},SOdA:function(e,t,r){}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{gjnw:function(e,t,r){"use strict";var a=r("k96+");r.n(a).a},"k96+":function(e,t,r){},uGx0:function(e,t,r){"use strict";r.r(t);var a=r("TsPW"),o={name:"edit-user-manage",data:function(){var e=this;return{oldName:"",saveLoading:!1,userId:"",editForm:{username:"",name:"",phone:"",checkedRole:[],workUnit:"",post:"",customerId:"",flag:"cka",isManager:"0",isLossManager:"0"},checkAll:!1,roleIdList:[],roleList:null,isIndeterminate:!0,customerList:[],param:{pageSize:0,status:1},rules:{checkedRole:[{type:"array",required:!0,message:"请至少选择一个角色",trigger:"change"}],username:[{min:1,max:50,message:"长度在 1 到 50 个字",trigger:"blur"},{validator:function(t,r,o){""===r?o(new Error("请输入用户名")):e.oldName===r?o():Object(a.ac)({username:r}).then(function(e){var t=e.data;200==e.status?t?o():o(new Error("输入的用户名已存在，请重新输入！")):o(new Error("系统异常！"))})},trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字",trigger:"blur"}],deptArray:[{type:"array",required:!0,message:"请选择",trigger:"change"}]},imageUrl:"",upLoadAction:a.Oe,headers:{sessionId:sessionStorage.getItem("sessionId")},avatarBosKey:""}},methods:{getAjaxUserInfo:function(){var e=this,t=this;Object(a.Qe)({id:this.userId}).then(function(r){var a=r.data;a?(t.oldName=a.username,t.editForm.username=a.username,t.editForm.name=a.name,t.editForm.phone=a.phone,t.editForm.checkedRole=a.roleIdList,t.imageUrl=a.avatarUrl,t.avatarBosKey=a.avatar,t.editForm.workUnit=a.workUnit,t.editForm.post=a.post,t.editForm.isManager=a.isManager+"",t.editForm.customerId=a.customerId,t.editForm.isLossManager=String(a.isLossManager),a.flag&&(t.editForm.flag=a.flag)):e.$message({message:"请求异常",type:"error"})})},getAjaxAllRole:function(){var e=this,t=this;Object(a.b)().then(function(r){var a=r.data;a&&a.length>0?(t.roleList=a,t.roleList.forEach(function(e){t.roleIdList.push(e.id)})):e.$message({message:"请求异常",type:"error"})})},handleCheckAllChange:function(e){this.editForm.checkedRole=e?this.roleIdList:[],this.isIndeterminate=!1},handleCheckedRolesChange:function(e){var t=e.length;this.checkAll=t===this.roleIdList.length,this.isIndeterminate=t>0&&t<this.roleIdList.length},changeProduct:function(e){this.customerList.find(function(t){return t.id===e})},getAjaxProduct:function(){var e=this;Object(a.zd)(e.param).then(function(t){if(200==t.status){var r=t.data.items;r&&r.length>0?e.customerList=r:e.customerList=[]}})},goBack:function(){this.$router.push({path:"/user"})},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,r=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG或PNG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&r},handleAvatarSuccess:function(e,t){var r=e.data;this.avatarBosKey=r.key,this.avatarBosKey?this.imageUrl=r.thumbnailUrl:this.$message.error("上传失败!")},submitForm:function(e){var t=this,r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.saveLoading=!0;r.editForm.deptArray;r.editForm.username=r.editForm.username.replace(/^\s+|\s+$/g,"");var o={username:r.editForm.username,phone:r.editForm.phone,name:r.editForm.name,id:r.userId,roleIdList:r.editForm.checkedRole,workUnit:r.editForm.workUnit,post:r.editForm.post,avatar:r.avatarBosKey,customerId:r.editForm.customerId,flag:r.editForm.flag,isManager:r.editForm.isManager,isLossManager:r.editForm.isLossManager};Object(a.wd)(o).then(function(e){t.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){r.goBack(),r.saveLoading=!1}})})})}},beforeMount:function(){var e=sessionStorage.getItem("userId");this.userId=e,e&&this.getAjaxUserInfo(),this.getAjaxAllRole(),this.getAjaxProduct()}},s=(r("gjnw"),r("KHd+")),i=Object(s.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),r("el-breadcrumb-item",{attrs:{to:{path:"/user"}}},[e._v("用户管理")]),e._v(" "),r("el-breadcrumb-item",[e._v(e._s(""==e.userId?"添加用户":"编辑用户"))])],1),e._v(" "),r("div",{staticClass:"contentBody"},[r("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:50},model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:15},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:11},model:{value:e.editForm.phone,callback:function(t){e.$set(e.editForm,"phone",t)},expression:"editForm.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"身份标识",prop:"flag"}},[r("el-radio-group",{model:{value:e.editForm.flag,callback:function(t){e.$set(e.editForm,"flag",t)},expression:"editForm.flag"}},[r("el-radio",{attrs:{label:"cka"}},[e._v("中央厨房")]),e._v(" "),r("el-radio",{attrs:{label:"store"}},[e._v("门店")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"店长",prop:"isManager"}},[r("el-radio-group",{model:{value:e.editForm.isManager,callback:function(t){e.$set(e.editForm,"isManager",t)},expression:"editForm.isManager "}},[r("el-radio",{attrs:{label:"0"}},[e._v("否")]),e._v(" "),r("el-radio",{attrs:{label:"1"}},[e._v("是")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"报损单管理员",prop:"isLossManager"}},[r("el-radio-group",{model:{value:e.editForm.isLossManager,callback:function(t){e.$set(e.editForm,"isLossManager",t)},expression:"editForm.isLossManager "}},[r("el-radio",{attrs:{label:"0"}},[e._v("否")]),e._v(" "),r("el-radio",{attrs:{label:"1"}},[e._v("是")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"角色分配",prop:"checkedRole"}},[[r("el-checkbox-group",{on:{change:e.handleCheckedRolesChange},model:{value:e.editForm.checkedRole,callback:function(t){e.$set(e.editForm,"checkedRole",t)},expression:"editForm.checkedRole"}},e._l(e.roleList,function(t){return r("el-checkbox",{key:t.id,attrs:{name:"checkedRole",label:t.id}},[e._v(e._s(t.name))])}),1)]],2),e._v(" "),r("el-form-item",{attrs:{label:"头像",prop:"avatarBosKey"}},[[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.upLoadAction,headers:e.headers,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),r("div",{staticClass:"el-upload__tip"},[e._v("只能上传jpg/png文件，且不超过2M")])]],2),e._v(" "),r("el-form-item",{attrs:{label:"所属门店"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeProduct},model:{value:e.editForm.customerId,callback:function(t){e.$set(e.editForm,"customerId",t)},expression:"editForm.customerId"}},e._l(e.customerList,function(e){return r("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"工作单位"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:200},model:{value:e.editForm.workUnit,callback:function(t){e.$set(e.editForm,"workUnit",t)},expression:"editForm.workUnit"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"职位"}},[r("el-input",{attrs:{placeholder:"请输入",maxlength:200},model:{value:e.editForm.post,callback:function(t){e.$set(e.editForm,"post",t)},expression:"editForm.post"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.saveLoading},on:{click:function(t){return e.submitForm("editForm")}}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:function(t){return e.goBack()}}},[e._v("返回")])],1)],1)],1)],1)},[],!1,null,"0763a649",null);i.options.__file="editUser.vue";t.default=i.exports}}]);
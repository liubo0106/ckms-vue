(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{Ac8Q:function(e,t,o){"use strict";var r=o("mevq");o.n(r).a},WisI:function(e,t,o){"use strict";o.r(t);var r=o("TsPW"),i={name:"edit-user-manage",data:function(){var e=this,t=sessionStorage.getItem("customerId");return{oldProductInfoId:"",id:sessionStorage.getItem("id"),saveLoading:!1,formLabelWidth:"120px",editForm:{customerId:t,type:"1",productInfoId:"",price:0,name:"",serialNo:"",standard:""},param1:{pageSize:0,type:"1"},param2:{pageSize:0,type:"2"},fixedList:[],consumetList:[],rules:{productInfoId:[{required:!0,message:"请选择商品",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字",trigger:"blur"},{validator:function(t,o,i){""===o?i(new Error("请选择商品")):e.oldProductInfoId===o?i():Object(r.mb)({pid:o}).then(function(e){e.data,200==e.status?i():i(new Error(e.msg))})},trigger:"blur"}]}}},methods:{changeProductType:function(){this.editForm.productInfoId=""},changeFixed:function(e){var t;t=this.fixedList.find(function(t){return t.id===e}),this.editForm.name=t.name,this.editForm.serialNo=t.serialNo},changeConsume:function(e){var t;t=this.consumetList.find(function(t){return t.id===e}),this.editForm.name=t.name,this.editForm.serialNo=t.serialNo},getAjaxFixed:function(){var e=this;Object(r.sd)(e.param1).then(function(t){if(200==t.status){var o=t.data.items;o&&o.length>0?e.fixedList=o:e.fixedList=[]}})},getAjaxConsume:function(){var e=this;Object(r.sd)(e.param2).then(function(t){if(200==t.status){var o=t.data.items;o&&o.length>0?e.consumetList=o:e.consumetList=[]}})},requestGoodsInfo:function(){var e=this,t=this;Object(r.lb)({id:this.id}).then(function(o){if(200==o.status){var r=o.data;r&&(t.editForm.name=r.name,t.editForm.type=r.type+"",t.editForm.productInfoId=r.productInfoId,t.editForm.serialNo=r.serialNo,t.editForm.standard=r.standard,t.oldProductInfoId=r.productInfoId)}else e.$message({message:"请求异常",type:"error"})})},goBack:function(){this.$router.push({path:"/shopAssetsManage"})},submitForm:function(e){var t=this,o=this;this.$refs[e].validate(function(e){if(!e)return!1;o.saveLoading=!0;var i={id:o.id,type:1==o.editForm.type?3:4,productInfoId:o.editForm.productInfoId,name:o.editForm.name,serialNo:o.editForm.serialNo};Object(r.Lc)(i).then(function(e){200==e.status?t.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){o.goBack(),o.saveLoading=!1}}):t.$message({type:"info",message:e.msg})})})}},beforeMount:function(){this.getAjaxFixed(),this.getAjaxConsume(),this.id&&this.requestGoodsInfo()}},a=(o("Ac8Q"),o("KHd+")),n=Object(a.a)(i,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[o("el-breadcrumb-item",{attrs:{to:{path:"/shopAssetsManage"}}},[e._v("门店固定资产管理")]),e._v(" "),o("el-breadcrumb-item",[e._v(e._s(""==e.id?"新增":"编辑"))])],1),e._v(" "),o("div",{staticClass:"contentBody"},[o("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"100px"}},[o("el-row",[o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"资产类型",prop:"type"}},[o("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeProductType},model:{value:e.editForm.type,callback:function(t){e.$set(e.editForm,"type",t)},expression:"editForm.type"}},[o("el-option",{attrs:{label:"固定资产",value:"1"}},[e._v("固定资产")]),e._v(" "),o("el-option",{attrs:{label:"易耗材",value:"2"}},[e._v("易耗材")])],1)],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-row",[1==e.editForm.type?o("el-form-item",{attrs:{label:"固定资产名称","label-width":e.formLabelWidth,prop:"productInfoId"}},[o("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeFixed},model:{value:e.editForm.productInfoId,callback:function(t){e.$set(e.editForm,"productInfoId",t)},expression:"editForm.productInfoId"}},e._l(e.fixedList,function(e){return o("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1):e._e(),e._v(" "),2==e.editForm.type?o("el-form-item",{attrs:{label:"易耗品名称","label-width":e.formLabelWidth,prop:"productInfoId"}},[o("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeConsume},model:{value:e.editForm.productInfoId,callback:function(t){e.$set(e.editForm,"productInfoId",t)},expression:"editForm.productInfoId"}},e._l(e.consumetList,function(e){return o("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1):e._e()],1)],1)],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary",loading:e.saveLoading},on:{click:function(t){return e.submitForm("editForm")}}},[e._v("提交")]),e._v(" "),o("el-button",{on:{click:function(t){return e.goBack()}}},[e._v("返回")])],1)],1)],1)],1)},[],!1,null,"62b13944",null);n.options.__file="editShopAssets.vue";t.default=n.exports},mevq:function(e,t,o){}}]);
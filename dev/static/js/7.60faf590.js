(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{CV9R:function(e,t,n){"use strict";var a=n("iaYp");n.n(a).a},iaYp:function(e,t,n){},y863:function(e,t,n){"use strict";n.r(t);var a=n("TsPW"),i={name:"role-manage",data:function(){return{tableData:null}},methods:{handleClick:function(e,t,n){var i=this;"delete"==n?i.$confirm("真的删除该行数据么, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id:t.id};Object(a.S)(e).then(function(e){200==e.status?i.$message({type:"success",message:"删除成功!",duration:300,onClose:function(){i.getAjaxList()}}):i.$message({type:"warning",message:e.msg,duration:2e3,onClose:function(){}})})}).catch(function(){i.$message({type:"info",message:"已取消删除"})}):"add"==n?(sessionStorage.setItem("roleId",""),this.$router.push({path:"/editrole"})):"edit"==n&&(sessionStorage.setItem("roleId",t.id),this.$router.push({path:"/editrole"}))},getAjaxList:function(){var e=this;Object(a.b)().then(function(t){if(200==t.status){var n=t.data;n&&n.length>0?e.tableData=n:e.tableData=[]}})}},beforeMount:function(){sessionStorage.removeItem("roleId"),this.getAjaxList()}},o=(n("CV9R"),n("KHd+")),r=Object(o.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),n("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),n("el-breadcrumb-item",[e._v("角色管理")])],1),e._v(" "),n("div",{staticClass:"contentBody"},[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[n("el-form-item",[n("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:function(t){return e.handleClick("","","add")}}})],1)],1),e._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[n("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),n("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"角色名"}}),e._v(" "),n("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticStyle:{"background-color":"#24cbc1",color:"#fff",border:"none"},attrs:{icon:"el-icon-edit",size:"mini"},on:{click:function(n){return e.handleClick(t.$index,t.row,"edit")}}},[e._v("编辑")]),e._v(" "),n("el-button",{staticStyle:{"background-color":"#fe8d29",color:"#fff",border:"none"},attrs:{icon:"el-icon-delete",size:"mini",type:"danger"},on:{click:function(n){return e.handleClick(t.$index,t.row,"delete")}}},[e._v("删除")])]}}])})],1)],1)],1)},[],!1,null,"599bf0c4",null);r.options.__file="role.vue";t.default=r.exports}}]);
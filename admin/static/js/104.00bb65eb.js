(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{"4nKx":function(e,t,a){"use strict";var r=a("aBYM");a.n(r).a},HRtm:function(e,t,a){"use strict";a.r(t);var r=a("TsPW"),n={name:"storeSummary",data:function(){return{totalNum:0,searchForm:{pageNo:1,pageSize:15,productInfoName:"",categoryName:"",beginDate:"",endDate:"",customerId:""},dataTime:"",goodsData:[],isShow:!1,cusTomerData:[]}},created:function(){this.getAjaxPage(),this.getdatatime(),this.getCusData()},methods:{indexMethod:function(e){return(this.searchForm.pageNo-1)*this.searchForm.pageSize+e+1},getCusData:function(){var e=this;Object(r.zd)(this.searchForm).then(function(t){200==t.status&&(e.cusTomerData=t.data.items)}),"null"!=sessionStorage.getItem("customerId")?(this.searchForm.customerId=sessionStorage.getItem("customerId"),this.isShow=!0):this.isShow=!1},getdatatime:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,r=a>9?a:"0"+a,n=e.getDate(),o=n>9?n:"0"+n;this.searchForm.beginDate=t+"-"+r+"-"+o,this.searchForm.endDate=t+"-"+r+"-"+o,this.dataTime=[this.searchForm.beginDate,this.searchForm.endDate]},getAjaxPage:function(){var e=this;Object(r.ce)(this.searchForm).then(function(t){200==t.status&&(e.goodsData=t.data.items,e.totalNum=parseInt(t.data.totalNum))})},onSearch:function(){this.searchForm.beginDate=this.dataTime[0],this.searchForm.endDate=this.dataTime[1],this.getAjaxPage()},handleClick:function(e){"reset"==e&&(this.searchForm.productInfoName="",this.searchForm.categoryName="",this.getAjaxPage()),"export"==e&&(this.searchForm.endDate=this.dataTime[1],this.searchForm.beginDate=this.dataTime[0],location.href=r.Pe+"export/storegoodsReportExport?beginDate="+this.searchForm.beginDate+"&endDate="+this.searchForm.endDate+"&categoryName"+this.searchForm.categoryName+"&productInfoName="+this.searchForm.productInfoName+"&customerId="+this.searchForm.customerId)},handleSizeChange:function(e){this.searchForm.pageSize=e,this.getAjaxPage()},handleCurrentChange:function(e){this.searchForm.pageNo=e,this.getAjaxPage()}},filters:{subStr:function(e){return null==e?e:e.toFixed(2)}}},o=(a("4nKx"),a("KHd+")),s=Object(o.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("门店库存汇总表")])],1),e._v(" "),a("div",{staticClass:"contentBody"},[a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{attrs:{placeholder:"商品名称"},model:{value:e.searchForm.productInfoName,callback:function(t){e.$set(e.searchForm,"productInfoName",t)},expression:"searchForm.productInfoName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品分类"}},[a("el-input",{attrs:{placeholder:"商品分类"},model:{value:e.searchForm.categoryName,callback:function(t){e.$set(e.searchForm,"categoryName",t)},expression:"searchForm.categoryName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"门店名称"}},[a("el-select",{attrs:{disabled:e.isShow},model:{value:e.searchForm.customerId,callback:function(t){e.$set(e.searchForm,"customerId",t)},expression:"searchForm.customerId"}},[1!=e.isShow?a("el-option",{attrs:{label:"全部",value:""}}):e._e(),e._v(" "),e._l(e.cusTomerData,function(e,t){return a("el-option",{attrs:{label:e.name,value:e.id}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"时间"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dataTime,callback:function(t){e.dataTime=t},expression:"dataTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearch(t)}}}),e._v(" "),a("el-button",{attrs:{icon:"el-icon-refresh-right",circle:""},on:{click:function(t){return e.handleClick("reset")}}})],1)],1),e._v(" "),a("div",{staticStyle:{"padding-bottom":"20px","text-align":"right"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleClick("export")}}},[e._v("导出")])],1),e._v(" "),a("el-table",{attrs:{border:"",data:e.goodsData}},[a("el-table-column",{attrs:{label:"序号",type:"index","header-align":"center",align:"center",index:e.indexMethod}}),e._v(" "),a("el-table-column",{attrs:{label:"分类",prop:"categoryName","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"商品名称",prop:"productInfoName","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"期初结存数量",prop:"beginNumber","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"期初结存金额","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("subStr")(t.row.beginTotalPrice)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"本期入库数量",prop:"inNumber","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"本期入库金额","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("subStr")(t.row.inTotalPrice)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"本期出库数量",prop:"outNumber","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"本期出库金额",prop:"outTotalPrice","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("subStr")(t.row.outTotalPrice)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"期末结存数量",prop:"endNumber","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"期末结存金额",prop:"endTotalPrice","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("subStr")(t.row.endTotalPrice)))])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.searchForm.pageNo,"page-sizes":[15,30,45,60],"page-size":e.searchForm.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"40a364c0",null);s.options.__file="storeSummary.vue";t.default=s.exports},aBYM:function(e,t,a){}}]);
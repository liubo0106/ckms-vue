import {baseUrl, httpRequest, httpRequestUpload} from './http';
//基础
export const requestUrl = baseUrl;
//登录接口
export const requestLogin = params => { return httpRequest('post','index/login',params,'json')};
//注销接口
export const requestLogout = params => { return httpRequest('post','index/logout',params,'json')};
//修改密码
export const requestUpdatePwd = params => { return httpRequest('post','server/user/updatePwd',params,'json') };
//上传接口
export const requestUploadFile =  httpRequestUpload('server/file/upload');
/*
 * *权限模块start
 * *yanjun
 */
//左侧menu权限
export const requestGetMenus = params => { return httpRequest('get','server/user/loadMenuListByUser',params,'json')};
//查询用户列表
export const requestSearchUser = params => { return httpRequest('post','server/user/page',params,'json')};
//删除用户
export const requestDeleteUser = params => { return httpRequest('get','server/user/delete',params,'')};
//重置密码
export const requestResetPwd = params => { return httpRequest('get','server/user/resetPwd',params,'')};
//查询用户详情
export const requestUserInfo = params => { return httpRequest('get','server/user/info',params,'')};
//添加用户
export const requestSaveUser = params => { return httpRequest('post','server/user/save',params,'json')};
//校验用户名唯一性
export const requestOnlyUser = params => { return httpRequest('post','server/user/verifyName',params,'')};
//查询用户名是否可用
export const requestVerifyUserName = params => { return httpRequest('get','server/user/verifyName',params,'')};
//获取所有角色列表
export const requestAllRole = params => { return httpRequest('get','server/role/findByList',params,'')};
//删除角色
export const requestDeleteRole = params => { return httpRequest('get','server/role/deleteById',params,'')};
//查询角色详情
export const requestRoleInfo = params => { return httpRequest('get','server/role/findById',params,'')};
//添加角色
export const requestSaveRole = params => { return httpRequest('post','server/role/save',params,'json')};
//获取所有菜单列表
export const requestAllMenu = params => { return httpRequest('get','server/menu/findTreeList',params,'')};
//删除菜单
export const requestDeleteMenu = params => { return httpRequest('get','server/menu/deleteById',params,'')};
//查询菜单详情
export const requestMenuInfo = params => { return httpRequest('get','server/menu/findById',params,'')};
//添加菜单
export const requestSaveMenu = params => { return httpRequest('post','server/menu/save',params,'json')};
/*
 * *权限模块end
 * *yanjun
 */

/*
商品管理
*/
//查询商品列表
export const requestSearchProductList = params => { return httpRequest('post','server/product/page',params,'json')};
//查询原材料价格曲线
export const requestSearchqueryPrice = params => { return httpRequest('post','server/purchaseDetail/queryPrice',params,'json')};
//删除商品
export const requestDeleteProduct = params => { return httpRequest('post','server/product/delete',params,'')};
export const requestisEnabledProducts = params => { return httpRequest('post','server/product/isEnabled',params,'')};
//获取商品树列表
export const requestSearchProduct = params => { return httpRequest('post','server/category/treeList',params,'json')};
//添加商品
export const requestSaveProduct = params => { return httpRequest('post','server/product/save',params,'json')};
//商品详情
export const requestProductInfo = params => { return httpRequest('get','server/product/info',params,'')};

/*
商品分类
*/
//获取树列表
export const requestSearchOrg = params => { return httpRequest('post','server/category/treeList',params,'json')};
//删除部门
export const requestDeleteOrg = params => { return httpRequest('post','server/category/delete',params,'')};
//部门分页
export const requestSearchDeptPage = params => { return httpRequest('post','server/category/page',params,'json')};
//添加部门
export const requestSaveOrg = params => { return httpRequest('post','server/category/save',params,'json')};

/*
打包管理
*/
//查询商品列表
export const requestSearchGroupList = params => { return httpRequest('post','server/packInfo/page',params,'json')};
//删除商品
export const requestDeleteGroup = params => { return httpRequest('post','server/packInfo/delete',params,'')};
export const requestisEnabledGroup = params => { return httpRequest('post','server/packInfo/isEnabled',params,'')};
//获取商品树列表
export const requestSearchGroup = params => { return httpRequest('post','server/packCategory/treeList',params,'json')};
//添加商品
export const requestSaveGroup = params => { return httpRequest('post','server/packInfo/save',params,'json')};
//商品详情
export const requestGroupInfo = params => { return httpRequest('get','server/packInfo/info',params,'')};
/*
打包明细
* */
//查询列表
export const requestListByPidPackDetail= params => { return httpRequest('post','server/packDetail/listByPid',params,'')};
//添加
export const requestSavePackDetail= params => { return httpRequest('post','server/packDetail/save',params,'json')};
//查询详情
export const requestPackDetailInfo = params => { return httpRequest('get','server/packDetail/info',params,'')};
//删除
export const requestDeletePackDetail = params => { return httpRequest('get','server/packDetail/delete',params,'')};


/*
打包分类
*/
//获取部门树列表
export const requestSearchOrgType = params => { return httpRequest('post','server/packCategory/treeList',params,'json')};
//删除部门
export const requestDeleteOrgType = params => { return httpRequest('post','server/packCategory/delete',params,'')};
//部门分页
export const requestSearchDeptPageType = params => { return httpRequest('post','server/packCategory/page',params,'json')};
//添加部门
export const requestSaveOrgType = params => { return httpRequest('post','server/packCategory/save',params,'json')};


/*
供应商管理
*/
//查询列表
export const requestSearchSupplier = params => { return httpRequest('post','server/supplier/page',params,'json')};
//添加
export const requestSaveSupplier= params => { return httpRequest('post','server/supplier/save',params,'json')};
//查询详情
export const requestSupplierInfo = params => { return httpRequest('get','server/supplier/info',params,'')};
//删除
export const requestDeleteSupplier = params => { return httpRequest('get','server/supplier/delete',params,'')};
//状态更新
export const requestSupplier = params => { return httpRequest('get','server/supplier/status',params,'')};
//商品规格
export const requestSupplierDataDic = params => { return httpRequest('get','server/dataDic/listByType',params,'')};
/*
客户管理
* */
//查询列表
export const requestSearchClient = params => { return httpRequest('post','server/customer/page',params,'json')};
//添加
export const requestSaveClient= params => { return httpRequest('post','server/customer/save',params,'json')};
//查询详情
export const requestClientInfo = params => { return httpRequest('get','server/customer/info',params,'')};
//删除
export const requestDeleteClient = params => { return httpRequest('get','server/customer/delete',params,'')};
//状态更新
export const requestCustomer = params => { return httpRequest('get','server/customer/status',params,'')};

/*
 * *数据字典模块startserver/project/save
 * *yanjun
 */
//删除数据字典
export const requestDeleteDataDic = params => { return httpRequest('get','server/dataDic/delete',params,'')};
//添加事件来源
export const requestSaveDataDic = params => { return httpRequest('post','server/dataDic/save',params,'json')};
//获取数据字典列表
export const requestFindDataDicList = params => { return httpRequest('post','server/dataDic/page',params,'json')};
//获取全部数据字典列表
export const requestFindDataDicTypeAll = params => { return httpRequest('get','server/dataDic/listByType',params,'')};
//查询数据字典树形列表
export const requestTreeList = params => { return httpRequest('get','server/dataDic/treeList',params,'')};

/*
采购单
* */
//查询列表
export const requestSearchPurchase = params => { return httpRequest('post','server/purchaseOrder/page',params,'json')};
//添加
export const requestSavePurchase= params => { return httpRequest('post','server/purchaseOrder/save',params,'json')};
//查询详情
export const requestPurchaseInfo = params => { return httpRequest('get','server/purchaseOrder/info',params,'')};
//删除
export const requestDeletePurchase = params => { return httpRequest('get','server/purchaseOrder/delete',params,'')};
//状态更新
export const requestStatusPurchase = params => { return httpRequest('get','server/purchaseOrder/status',params,'')};
/*
采购单明细
* */
//查询列表
export const requestListByPid = params => { return httpRequest('post','server/purchaseDetail/listByPid',params,'')};
//添加
export const requestSavePurchaseDetail= params => { return httpRequest('post','server/purchaseDetail/save',params,'json')};
//查询详情
export const requestPurchaseDetailInfo = params => { return httpRequest('get','server/purchaseDetail/info',params,'')};
//删除
export const requestDeletePurchaseDetail = params => { return httpRequest('get','server/purchaseDetail/delete',params,'')};

/*
入库单
* */
//查询入库单列表
export const requestInStockOrderPage = params => { return httpRequest('post','server/inStockOrder/page',params,'json')};
//添加入库单
export const requestSaveInStockOrder= params => { return httpRequest('post','server/inStockOrder/save',params,'json')};
//查询入库单详情
export const requestInStockOrderDetailInfo = params => { return httpRequest('get','server/inStockOrder/info',params,'')};
//删除入库单
export const requestDeleteInStockOrder = params => { return httpRequest('get','server/inStockOrder/delete',params,'')};
//状态更新
export const requestStatusIn = params => { return httpRequest('get','server/inStockOrder/status',params,'')};
//查询入库单明细列表
export const requestListByInPid = params => { return httpRequest('post','server/inStockDetail/listByPid',params,'')};
//删除入库单明细
export const requestDeleteInDetail = params => { return httpRequest('get','server/inStockDetail/delete',params,'')};
//添加入库单明细
export const requestSaveInStockDetail= params => { return httpRequest('post','server/inStockDetail/save',params,'json')};
//入库类型为领料单时，需要根据入库明细（打包商品）检查厨房原料库存
export const requestInStockOrderCheckStock= params => { return httpRequest('get','server/inStockOrder/checkStock',params,'')};



/*
出库单
* */
//查询出库单列表
export const requestOutStockOrderPage = params => { return httpRequest('post','server/outStockOrder/page',params,'json')};
//添加出库单
export const requestSaveOutStockOrder= params => { return httpRequest('post','server/outStockOrder/save',params,'json')};
//查询出库单详情
export const requestOutStockOrderDetailInfo = params => { return httpRequest('get','server/outStockOrder/info',params,'')};
//删除出库单
export const requestDeleteOutStockOrder = params => { return httpRequest('get','server/outStockOrder/delete',params,'')};
//状态更新
export const requestStatusOut = params => { return httpRequest('get','server/outStockOrder/status',params,'')};
//查询出库单明细列表
export const requestListByOutPid = params => { return httpRequest('post','server/outStockDetail/listByPid',params,'')};
//删除出库单明细
export const requestDeleteOutDetail = params => { return httpRequest('get','server/outStockDetail/delete',params,'')};
//添加出库单明细
export const requestSaveOutStockDetail= params => { return httpRequest('post','server/outStockDetail/save',params,'json')};
//出库单校验库存
export const requestSaveOutCheckStock= params => { return httpRequest('get','server/outStockOrder/checkStock',params,'')};
/*
门店下单管理
* */
//查询列表
export const requestSalesOrderPage = params => { return httpRequest('post','server/salesOrder/page',params,'json')};
//添加
export const requestSaveSalesOrder= params => { return httpRequest('post','server/salesOrder/save',params,'json')};
//查询详情
export const requestSalesOrderInfo = params => { return httpRequest('get','server/salesOrder/info',params,'')};
//删除出库单
export const requestDeleteSalesOrder = params => { return httpRequest('get','server/salesOrder/delete',params,'')};
//判断库存状态
export const requestCheckStock = params => { return httpRequest('get','server/salesOrder/checkStock',params,'')};
//状态更新
export const requestSalesOrder = params => { return httpRequest('get','server/salesOrder/status',params,'')};

//查询销售单明细列表
export const requestListBySalesPid = params => { return httpRequest('post','server/salesDetail/listByPid',params,'')};
//删除销售单明细
export const requestDeleteSalesDetail = params => { return httpRequest('get','server/salesDetail/delete',params,'')};
//添加销售单明细
export const requestSaveSalesDetail= params => { return httpRequest('post','server/salesDetail/save',params,'json')};

//打包商品列表接口
export const requestSaveSalesDetailList = params => { return httpRequest('post','server/packInfo/page',params,'json')};
//打包商品详情接口
export const requestSaveSalesDetailListPid = params => { return httpRequest('get','server/packDetail/listByPid',params,'')};


/*
物流管理
* */
//查询列表
export const requestSearchLogistics = params => { return httpRequest('post','server/logistics/page',params,'json')};
//添加
export const requestSaveLogistics= params => { return httpRequest('post','server/logistics/save',params,'json')};
//查询详情
export const requestLogisticsInfo = params => { return httpRequest('get','server/logistics/info',params,'')};
//删除
export const requestDeleteLogistics = params => { return httpRequest('get','server/logistics/delete',params,'')};
export const requestisEnabledLogistics = params => { return httpRequest('get','server/logistics/isEnabled',params,'')};
//状态更新
export const requestLogistics = params => { return httpRequest('get','server/logistics/status',params,'')};

/*
门店商品管理
* */
//查询列表
export const requestSearchGoods = params => { return httpRequest('post','server/storeGoods/page',params,'json')};
//添加
export const requestSaveGoods= params => { return httpRequest('post','server/storeGoods/save',params,'json')};
//删除
export const requestDeleteGoods = params => { return httpRequest('get','server/storeGoods/delete',params,'')};
export const requestisEnabledGoods = params => { return httpRequest('get','server/storeGoods/isEnabled',params,'')};
//查询详情
export const requestGoodsInfo = params => { return httpRequest('get','server/storeGoods/info',params,'')};
//查询商品信息是否重复
export const requestGoodsInfoPid = params => { return httpRequest('get','server/storeGoods/checkExist',params,'')};
//状态
export const requestGoodsStatus = params => { return httpRequest('get','server/storeGoods/status',params,'')};
//校验上下架
export const requestGoodsCheck = params =>{ return httpRequest('get','server/storeGoods/checkIsApplyProduct',params,'')};


/*
门店商品配料
* */
//查询列表
export const requestSearchDosing = params => { return httpRequest('post','server/storeGoodsDetail/page',params,'json')};
//添加
export const requestSaveDosing= params => { return httpRequest('post','server/storeGoodsDetail/save',params,'json')};
//删除
export const requestDeleteDosing = params => { return httpRequest('get','server/storeGoodsDetail/delete',params,'')};

/*
门店桌号管理
* */

//查询列表
export const requestSearchDesk = params => { return httpRequest('post','server/storeDesk/page',params,'json')};
//添加
export const requestSaveDesk= params => { return httpRequest('post','server/storeDesk/save',params,'json')};
//删除
export const requestDeleteDesk = params => { return httpRequest('get','server/storeDesk/delete',params,'')};
//查询详情
export const requestDeskInfo = params => { return httpRequest('get','server/storeDesk/info',params,'')};
//生成二维码
export const requestGenerateQRCode = params => { return httpRequest('get','server/storeDesk/generateQRCode',params,'')};

/*
客户订单管理
* */
//查询列表
export const requestSearchStoreOrde = params => { return httpRequest('post','server/storeOrder/page',params,'json')};
export const requestSearchStoreOrdeTotal = params => { return httpRequest('post','server/storeOrder/pageTotal',params,'json')};
//状态更新
export const requestStatusStoreOrde= params => { return httpRequest('get','server/storeOrder/status',params,'')};

export const requestStatusAllStoreOrde= params =>{return httpRequest('get','server/storeOrder/statusAll',params,'')}

/*
店铺入库管理
* */
//查询入库单列表
export const requestShopInStockOrderPage = params => { return httpRequest('post','server/storageOrder/page',params,'json')};
//添加入库单
export const requestSaveShopInStockOrder= params => { return httpRequest('post','server/storageOrder/save',params,'json')};
//查询入库单详情
export const requestShopInStockOrderDetailInfo = params => { return httpRequest('get','server/storageOrder/info',params,'')};
//删除入库单
export const requestDeleteShopInStockOrder = params => { return httpRequest('get','server/storageOrder/delete',params,'')};
//状态更新
export const requestStatusShopIn = params => { return httpRequest('get','server/storageOrder/status',params,'')};
//查询入库单明细列表
export const requestListByShopInPid = params => { return httpRequest('post','server/storageDetail/listByPid',params,'')};
//删除入库单明细
export const requestDeleteShopInDetail = params => { return httpRequest('get','server/storageOrder/delete',params,'')};
//添加入库单明细
export const requestSaveShopInStockDetail= params => { return httpRequest('post','server/storageOrder/save',params,'json')};

/*
菜品分类管理
*/
//获取树列表
export const requestSearchMenuType = params => { return httpRequest('post','server/storeCategory/treeList',params,'json')};
//删除部门
export const requestDeleteMenuType = params => { return httpRequest('post','server/storeCategory/delete',params,'')};
//部门分页
export const requestSearchDeptPageMenuType = params => { return httpRequest('post','server/storeCategory/page',params,'json')};
//添加部门
export const requestSaveMenuType = params => { return httpRequest('post','server/storeCategory/save',params,'json')};
//获取菜品分类列表
export const requestMenuListByInPid = params => { return httpRequest('post','server/storeCategory/listByPid',params,'')};

/*
客户订单结算管理
* */
//根据门店id查询桌台列表及状态
export const requestStoreDeskList = params => { return httpRequest('get','server/storeDesk/list',params,'')};
//根据桌台id查询订单
export const requestStoreDeskOrders = params => { return httpRequest('get','server/storeDesk/orders',params,'')};
//根据订单id查询订单明细列表
export const requestStoreOrderDetailListByPid = params => { return httpRequest('get','server/storeOrderDetail/listByPid',params,'')};
//添加
export const requestSaveStoreOrde= params => { return httpRequest('post','server/storeOrder/save',params,'json')};
//添加订单详情
export const requestSaveStoreOrdeDetail= params => { return httpRequest('post','server/storeOrderDetail/save',params,'json')};
//删除
export const requestDeleteStoreOrde = params => { return httpRequest('get','server/storeOrder/delete',params,'')};
//删除顾客订单

export const requestDeleteCheackAll = params =>{ return httpRequest('get','server/storeOrder/deleteAll',params,'')};


//查询详情
export const requestStoreOrdeInfo = params => { return httpRequest('get','server/storeOrder/info',params,'')};

export const requestStoreOrdeInfoAll = params => { return httpRequest('get','server/storeOrder/infoAll',params,'')};
//结算全部
export const requestStoreOrdeCheckOut = params => { return httpRequest('post','server/storeOrder/checkout',params,'json')};
export const requestStoreOrdeCheckOrder = params => { return httpRequest('get','server/storeOrder/checkOrder',params,'')};
//结算校验
export const requestStoreOrderpaymentCheck = params =>{return httpRequest('get','server/storeOrder/paymentCheck',params,'')};


//检查订单明细中的商品库存
export const requestStoreOrderCheckStock = params => { return httpRequest('post','server/storeOrderDetail/checkStock',params,'json')};
//菜品免费接口
export const requestSaveStoreOrdeFree= params => { return httpRequest('post','server/storeOrderDetail/free',params,'')};
//打印小票
export const requestPrintBill= params => { return httpRequest('get','server/storeOrder/printBill',params,'')};

export const requestprintBillAlls=params =>{return httpRequest('get','server/storeOrder/printBillAlls',params,'')};

//转台
export const requestTurntable= params => { return httpRequest('get','server/storeDesk/turntable',params,'')};
//根据id删除门店客户订单明细信息
export const requestStoreOrderDetailDelete= params => { return httpRequest('get','server/storeOrderDetail/delete',params,'')};
//门店顾客退菜
export const requestStoreOrderDetailSave= params => { return httpRequest('post','server/storeOrderReturn/save',params,'json')};
//复制菜品
export const requestCopyOrder= params => { return httpRequest('get','server/storeDesk/copyOrder',params,'')};

/*
门店退货管理
* */
//查询门店退货列表
export const requestStoreReturnPage = params => { return httpRequest('post','server/storeReturn/page',params,'json')};
//添加门店退货
export const requestSaveStoreReturn= params => { return httpRequest('post','server/storeReturn/save',params,'json')};
//查询门店退货单详情
export const requestStoreReturnDetailInfo = params => { return httpRequest('get','server/storeReturn/info',params,'')};
//删除门店退货
export const requestDeleteStoreReturn = params => { return httpRequest('get','server/storeReturn/delete',params,'')};
//状态更新
export const requestStatusStoreReturn = params => { return httpRequest('get','server/storeReturn/status',params,'')};
//查询门店退货明细列表
export const requestListByStoreReturnPid = params => { return httpRequest('post','server/storeReturnDetail/listByPid',params,'')};
//删除门店退货明细
export const requestDeleteStoreReturnDetail = params => { return httpRequest('get','server/storeReturnDetail/delete',params,'')};
//添加门店退货明细
export const requestSaveStoreReturnDetail= params => { return httpRequest('post','server/storeReturnDetail/save',params,'json')};


/*
废库管理/报损单管理
* */
//查询废库单列表
export const requestDestroyPage = params => { return httpRequest('post','server/wasteOrder/page',params,'json')};
//添加废库单
export const requestSaveDestroy= params => { return httpRequest('post','server/wasteOrder/save',params,'json')};
//查询废库单详情
export const requestDestroyInfo = params => { return httpRequest('get','server/wasteOrder/info',params,'')};
//删除废库单
export const requestDeleteDestroy = params => { return httpRequest('get','server/wasteOrder/delete',params,'')};
//状态更新
export const requestStatusDestroy = params => { return httpRequest('get','server/wasteOrder/status',params,'')};
//查询出库单明细列表
export const requestListByDestroyPid = params => { return httpRequest('post','server/wasteDetail/listByPid',params,'')};
//查询驳回原因
export const requestListByRejectRecordPid = params => { return httpRequest('post','server/wasteOrder/selectRejectRecord',params,'')};
//删除出库单明细
export const requestDeleteDestroyDetail = params => { return httpRequest('get','server/wasteDetail/delete',params,'')};
//添加出库单明细
export const requestSaveDestroyDetail= params => { return httpRequest('post','server/wasteDetail/save',params,'json')}


/*
固定资产及易消耗品管理
*/
//查询列表
export const requestSearchAssets = params => { return httpRequest('post','server/consumable/page',params,'json')};
//添加
export const requestSaveAssets= params => { return httpRequest('post','server/consumable/save',params,'json')};
//查询详情
export const requestAssetsInfo = params => { return httpRequest('get','server/consumable/info',params,'')};
//删除
export const requestDeleteAssets = params => { return httpRequest('get','server/consumable/delete',params,'')};
export const requestisEnabledAssets = params => { return httpRequest('get','server/consumable/isEnabled',params,'')};

/*
领料单管理
* */
//查询领料单列表
export const requestMaterialPage = params => { return httpRequest('post','server/pickOrder/page',params,'json')};
//添加领料单
export const requestSaveMaterial= params => { return httpRequest('post','server/pickOrder/save',params,'json')};
//查询领料单详情
export const requestMaterialInfo = params => { return httpRequest('get','server/pickOrder/info',params,'')};
//删除领料单
export const requestDeleteMaterial = params => { return httpRequest('get','server/pickOrder/delete',params,'')};
//状态更新
export const requestStatusMaterial = params => { return httpRequest('get','server/pickOrder/status',params,'')};
//查询领料单明细列表
export const requestListByMaterialPid = params => { return httpRequest('post','server/pickDetail/listByPid',params,'')};
//删除领料单明细
export const requestDeleteMaterialDetail = params => { return httpRequest('get','server/pickDetail/delete',params,'')};
//添加领料单明细
export const requestSaveMaterialDetail= params => { return httpRequest('post','server/pickDetail/save',params,'json')};
//入库类型为领料单时，需要根据入库明细（打包商品）检查厨房原料库存
export const requestPickOrderCheckStock= params => { return httpRequest('get','server/pickOrder/checkStock',params,'')};
//领料单数据批量导入数据库

export const requestPickDataSave= params =>{return httpRequest('post','server/pickDetail/batchSave',params,'json')};

/*
厨房原料库存管理
*/
//查询列表
export const requestSearchKitchenRawList = params => { return httpRequest('post','server/kitchenRaw/page',params,'json')};

/*
会员基本信息
*/
//查询列表
export const requestSearchMember = params => { return httpRequest('post','server/member/page',params,'json')};
//添加
export const requestSaveMember= params => { return httpRequest('post','server/member/save',params,'json')};
//查询详情
export const requestMemberInfo = params => { return httpRequest('get','server/member/info',params,'')};
//删除
export const requestDeleteMember = params => { return httpRequest('get','server/member/delete',params,'')};
//状态更新
export const requestMember = params => { return httpRequest('get','server/member/status',params,'')};

/*
会员充值规则
*/
//查询列表
export const requestSearchrechargeRule = params => { return httpRequest('post','server/rechargeRule/page',params,'json')};
//添加
export const requestSaverechargeRule= params => { return httpRequest('post','server/rechargeRule/save',params,'json')};
//查询详情
export const requestrechargeRuleInfo = params => { return httpRequest('get','server/rechargeRule/info',params,'')};
//删除
export const requestDeleterechargeRule = params => { return httpRequest('get','server/rechargeRule/delete',params,'')};

/*
会员充值管理
*/
//查询列表
export const requestSearchMemberRecharge = params => { return httpRequest('post','server/rechargeRecord/page',params,'json')};
//添加
export const requestSaveMemberRecharge= params => { return httpRequest('post','server/rechargeRecord/save',params,'json')};
//查询详情
export const requestMemberRechargeInfo = params => { return httpRequest('get','server/rechargeRecord/info',params,'')};
//删除
export const requestDeleteMemberRecharge = params => { return httpRequest('get','server/rechargeRecord/delete',params,'')};
//状态更新
export const requestMemberRecharge = params => { return httpRequest('get','server/rechargeRecord/status',params,'')};

/*
会员消费管理
* */
//查询列表
export const requestSearchMemberRecord = params => { return httpRequest('post','server/storeCheckout/page',params,'json')};
//详情
export const requestDetailMemberRecord= params => { return httpRequest('get','server/storeCheckout/orders',params,'')};
/*
打印机设置管理
* */
//查询
export const requestStorePrinterList = params => { return httpRequest('get','server/storePrinter/list',params,'')};
//添加
export const requestStorePrinterSave= params => { return httpRequest('post','server/storePrinter/save',params,'json')};
//测试
export const requestStorePrinterTest= params => { return httpRequest('post','server/storePrinter/test',params,'json')};

/*
报表统计
* */
//采购单报表统计
export const requestPurchaseReportPage = params => { return httpRequest('post','server/report/purchaseOrder',params,'json')};
export const requestPurchaseReportDetailPage = params => { return httpRequest('post','server/report/purchaseDetailVo',params,'json')};
//领料单报表统计
export const requestMaterialReportPage= params => { return httpRequest('post','server/report/pickOrder',params,'json')};
export const requestMaterialReportDetailPage = params => { return httpRequest('post','server/report/pickDetailVo',params,'json')};
//入库单报表统计
export const requestInStockOrderReportPage= params => { return httpRequest('post','server/report/inStockOrder',params,'json')};
export const requestInStockOrderReportPageWithPro= params => { return httpRequest('post','server/report/inStockDetailWithPro',params,'json')};
export const requestInStockOrderReportDetailPage= params => { return httpRequest('post','server/report/inStockDetailVo',params,'json')};
//出库单报表统计
export const requestOutStockOrderReportPage= params => { return httpRequest('post','server/report/outStockOrder',params,'json')};
export const requestOutStockOrderReportDetailPage= params => { return httpRequest('post','server/report/outStockDetailVo',params,'json')};
//消费明细
export const requestConsumptionPage= params => {return httpRequest('post','server/report/consumeDetailCollect',params,'json')}
/*
单位换算配置管理
* */
export const requestUnitConversionPage = params => { return httpRequest('post','server/unitConversion/page',params,'json')};
export const requestUnitConversionSave = params => { return httpRequest('post','server/unitConversion/save',params,'json')};

//客户订单导出报表
export const requestStoreOrdeExport = params => { return httpRequest('get','export/storeOrderReport',params,'')};
//客户消费情况报表
export const requestClientExport = params => { return httpRequest('get','export/storeCheckoutReport',params,'')};

//顾客退菜明细
export const requestStoreOrderReturn = params => { return httpRequest('post','server/storeOrderReturn/page',params,'json')};

/*
复合调料包
*/
//查询列表
export const requestSearchCompound = params => { return httpRequest('post','server/compound/page',params,'json')};
//添加
export const requestSaveCompound= params => { return httpRequest('post','server/compound/save',params,'json')};
//查询详情
export const requestCompoundInfo = params => { return httpRequest('get','server/compound/info',params,'')};
//删除
export const requestDeleteCompound = params => { return httpRequest('get','server/compound/delete',params,'')};
/*
复合调料包详情
*/
//查询列表
export const requestListByPidCompoundDetail = params => { return httpRequest('post','server/compoundDetail/listByPid',params,'')};
//添加
export const requestSaveCompoundDetail= params => { return httpRequest('post','server/compoundDetail/save',params,'json')};
//查询详情
export const requestCompoundInfoDetail = params => { return httpRequest('get','server/compoundDetail/info',params,'')};
//删除
export const requestDeleteCompoundDetail = params => { return httpRequest('get','server/compoundDetail/delete',params,'')};

//请求套餐列表
export const requestRestaurantDetail = params =>{ return httpRequest('post','server/setMeal/page',params,'json')};
//添加套餐
export const requestRestaurantSaveGoods = params => { return httpRequest('post','server/setMeal/save',params,'json')};

//查询套餐详情

export const requestRestaurantGoodsInfo = params => { return httpRequest('get','server/setMeal/info',params,'')};

//添加套餐菜品
export const requestRestaurantSaveDosing= params => { return httpRequest('post','server/setMealDetail/save',params,'json')};
//查询

export const requestRestaurantSearchDosing = params => { return httpRequest('post','server/setMealDetail/page',params,'json')};

export const requestRestaurantDeleteDosing = params => { return httpRequest('get','server/setMealDetail/delete',params,'')};

//订单预结算

export const requestBugetData = params =>{return httpRequest('post','/server/storeOrder/printBillAll',params,'json')};
//套餐列表下架上架

export const requestRestaurantGoodsStatus = params => { return httpRequest('get','server/setMeal/status',params,'')};

//套餐列表删除
export const requestRestaurantDeleteGoods = params => { return httpRequest('get','server/setMeal/delete',params,'')};

//商品列表重组接口

export const requestRecombinationPage= params =>{return httpRequest('post','server/storeGoodsRestDetail/page',params,'json')}

//商品重组保存接口

export const requestRecombinationSave= params =>{return httpRequest('post','server/storeGoodsRestDetail/save',params,'json')}

//商品重组详情接口

export const requestRecombinationInfo = params =>{return httpRequest('post','server/storeGoodsRestDetail/info',params,'json')}

export const requestRecombinationDelete = params =>{return httpRequest('post','server/storeGoodsRestDetail/delete',params,'')}
export const requestRecimbinationCheck= params=>{return httpRequest('post','server/storeGoodsRestDetail/checkStock',params,'')}
export const requestRecombinationgenerateStock=params=>{return httpRequest('post','server/storeGoodsRestDetail/generateStock',params,'')}
//套餐列表查询
export const requestRecombinationgeneratemaxNumber=params=>{return httpRequest('post','server/storeGoodsRestDetail/maxNumber',params,'')}
//商品重组计算可合成份数

//商品校验
export const requestCheckOrder=params=>{return httpRequest('get','weiXin/checkStock',params,'')}

//下单套餐口味选择
export const requestRestaurantFlavor=params=>{return httpRequest('post','server/setMealDetail/listWithFlavor',params,'')}

// //删除
// export const requestDeleteGoods = params => { return httpRequest('get','server/storeGoods/delete',params,'')};
//
// //查询详情
// export const requestGoodsInfo = params => { return httpRequest('get','server/storeGoods/info',params,'')};
// //查询商品信息是否重复
// export const requestGoodsInfoPid = params => { return httpRequest('get','server/storeGoods/checkExist',params,'')};
// //状态
// export const requestGoodsStatus = params => { return httpRequest('get','server/storeGoods/status',params,'')};
// /*
// 门店商品配料
// * */
// //查询列表
// export const requestSearchDosing = params => { return httpRequest('post','server/storeGoodsDetail/page',params,'json')};
// //添加
// export const requestSaveDosing= params => { return httpRequest('post','server/storeGoodsDetail/save',params,'json')};
// //删除
// export const requestDeleteDosing = params => { return httpRequest('get','server/storeGoodsDetail/delete',params,'')};
//
// /*

// 当前这个模块： API进行统一管理
import requests from './request.js';
import mockRequests from './mockAjax.js'
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:"get"});
// export const reqgetCategoryList = () =>requests.get(`/product/getBaseCategoryList`);
// 获取banner (Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests({url:'/banner',method:"get"});
//获取floor数据
export const reqGetFloorList = () => mockRequests({url:'/floor',method:"get"});
//获取搜索模块数据 地址/api/list  请求方式post 需要带参数
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})
//获取详情页模块数据 地址/api/item/{skuId}  请求方式get 需要带参数
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})
// 将产品添加到购物车中(获取更新某一个产品的个数)
//  /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdataShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})
// 获取购物车列表数据接口
//  url:/api/cart/cartList  Get
export const reqCartList = () => requests({url:"/cart/cartList",method:"get"})
// 删除购物产品的接口
// url:/api/cart/deleteCart/{skuid}  method:DELETE
export const reqDeleteCartById = (skuid) => requests({url:`/cart/deleteCart/${skuid}`,method:"delete"});
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
// 获取验证码
//  /api/user/passport/sendCode/{phone}  method get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 注册
//  /api/user/passport/register   method post   phone code password
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})
// 登录
// /api/user/passport/login method post   phone password
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})
//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'});
//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});
//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});

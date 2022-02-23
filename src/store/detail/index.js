import {reqGoodsInfo,reqAddOrUpdataShopCart} from '@/api/index'
// 封装游客身份模块uuid--->生成一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodsInfo:{},
  // 游客临时身份
  uuid_token:getUUID(),
};
const mutations = {
  GETGOODSINFO(state,goodsInfo) {
    state.goodsInfo = goodsInfo;
  }
};
const actions = {
  // 获取产品信息
 async getGoodsInfo({commit},skuId) {
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200) {
      commit("GETGOODSINFO",result.data)
    }
  },
  // 将产品加入购物车中
  async addOrUpdataShopCart({commit},{skuId,skuNum}) {
    // 加入购物车返回的解构
    // 加入购物车以后(发请求) 前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200,代表这次操作成功
    // 因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
    let result = await reqAddOrUpdataShopCart(skuId,skuNum);
    // 代表服务器加入购物车成功
    if(result.code == 200) {
      return 'ok'
    }else {
      // 代表加入购物车失败
      return Promise.reject(new Error('failer'))
    }
  }
};
// 简化数据而生
const getters = {
  // 路径导航简化数据
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList||[];
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
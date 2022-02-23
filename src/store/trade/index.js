import {reqAddressInfo,reqOrderInfo} from '@/api/index'
const state = {
  address:[],
  order:{}
};
const mutations = {
  GETUSERADDRESS(state,address) {
    state.address = address;
  },
  GETUSERORDER(state,order) {
    state.order = order;
  }
};
const actions = {
  // 获取用户地址
  async getUserAddress({commit}) {
    let result = await reqAddressInfo();
    console.log(result);
    if(result.code == 200) {
      commit('GETUSERADDRESS',result.data)
    }
  },
  // 获取商品清单数据
  async getUserOrder({commit}) {
    let result = await reqOrderInfo();
    if(result.code == 200) {
      commit('GETUSERORDER',result.data)
      console.log(result);
    }

  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}
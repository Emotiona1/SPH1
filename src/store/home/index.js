// home模块小仓库

import { reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api";

// state:仓库存储数据的地方
// mutations:修改state的唯一手段
// acction；处理action,可以书写自己的业务逻辑，也可以处理异步
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const state = {
  // 三级联动的数据
  categoryList:[],
  // 轮播图数据
  bannerList:[],
  // 楼层数据
  floorList:[],
};
const mutations = {
  CATEGORYLIST(state,categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state,getBannerList) {
    state.bannerList = getBannerList;
  },
  GETFLOORLIST(state,floorList) {
    state.floorList = floorList;
  }
};
const actions = {
  async categoryList({commit}) {
    // 通过API里面的接口函数调用 向服务器发送请求 获取服务器的数据
    let result = await reqCategoryList()
    if(result.code == 200) {
      commit('CATEGORYLIST',result.data)
    }
  },
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if(result.code == 200) {
      commit('GETBANNERLIST',result.data)
    }
  },
  async getFloorList(content) {
    let result = await reqGetFloorList();
    if(result.code == 200) {
      content.commit('GETFLOORLIST',result.data)
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
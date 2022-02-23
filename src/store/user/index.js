import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api/index'
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
  code:'',
  token:getToken(),
  userInfo:{}
};
const mutations = {
  GETCODE(state,code) {
    state.code = code;
  },
  // 用户登录
  USERLOGIN(state,token) {
    state.token = token;
  },
  // 获取用户信息
  GETUSERINFO(state,userInfo) {
    state.userInfo = userInfo;
  },
  // 退出登录
  CLEAR(state) {
    // 仓库相关信息清空
    state.token = '';
    state.userInfo = {};
    // 本地存储清空
    removeToken();
  }
};
const actions = {
  // 获取验证码
  async getCode({commit},phone) {
    let result = await reqGetCode(phone);
    if(result.code == 200) {
      commit('GETCODE',result.data);
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({commit},user) {
    let result = await reqUserRegister(user)
    if(result.code == 200) {
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录
  async userLogin({commit},data) {
    let result = await reqUserLogin(data);
    if(result.code == 200) {
      commit('USERLOGIN',result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo();
    if(result.code == 200) {
      commit('GETUSERINFO',result.data);
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogOut({commit}) {
    // 只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLogout();
    // action里面不能操作state,提交mutation修改state
    if(result.code == 200) {
      commit('CLEAR');
      return 'ok'
    }else {
      return Promise(new Error('faile'))
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
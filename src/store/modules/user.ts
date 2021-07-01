import { Module } from "vuex";
import RootStateInterface, { UserModuleState } from "../types";

const userModule: Module<UserModuleState, RootStateInterface> = {
  namespaced: true,
  state: {
    userName: '',
    userInfo: {},
    token: ''
  },
  getters: {
    userName: (state) => state.userName,
    userInfo: (state) => state.userInfo,
    token: (state) => state.token
  },
  mutations: {
    SET_USER_NAME: (state, val) => {
      state.userName = val
      localStorage.setItem('userName', JSON.stringify(val))
    },
    SET_USER_INFO: (state, val) => {
      state.userInfo = val
      localStorage.setItem('userInfo', JSON.stringify(val))
    },
    SET_TOKEN: (state, val) => {
      state.token = val
      localStorage.setItem('token', val)
    },
  },
  actions: {
    SET_USER_NAME_ASYNC: (context, val) => {
      setTimeout(() => {
        context.commit('SET_USER_NAME', val)
      }, 0);
    },
    SIGN_OUT: (context) => {
      context.commit('SET_TOKEN', '')
      context.commit('SET_USER_NAME', '')
      context.commit('SET_USER_INFO', null)
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userInfo')
    },
  }
}

export default userModule

import { Module } from "vuex";
import { chatServerApi } from '../../axios/api'
import RootStateInterface, { UserModuleState } from "../types";

const userModule: Module<UserModuleState, RootStateInterface> = {
  namespaced: true,
  state: {
    realName: '',
    userInfo: {},
    token: '',
    messageList: []
  },
  getters: {
    realName: (state) => state.realName,
    userInfo: (state) => state.userInfo,
    token: (state) => state.token
  },
  mutations: {
    SET_REAL_NAME: (state, val) => {
      state.realName = val
      localStorage.setItem('realName', val)
    },
    SET_USER_INFO: (state, val) => {
      state.userInfo = val
      localStorage.setItem('userInfo', JSON.stringify(val))
    },
    SET_TOKEN: (state, val) => {
      state.token = val
      localStorage.setItem('token', val)
    },
    SET_MESSAGELIST: (state, val) => {
      state.messageList = val
    },
    ADD_MESSAGELIST: (state, val) => {
      state.messageList.push(val)
    },
  },
  actions: {
    SET_REAL_NAME_ASYNC: (context, val) => {
      setTimeout(() => {
        context.commit('SET_REAL_NAME', val)
      }, 0);
    },
    SIGN_OUT: (context) => {
      context.commit('SET_TOKEN', '')
      context.commit('SET_REAL_NAME', '')
      context.commit('SET_USER_INFO', null)
      localStorage.removeItem('token')
      localStorage.removeItem('realName')
      localStorage.removeItem('userInfo')
    },
    GET_ALL_MESSAGE_LIST: (context) => {
      // 默认获取最新十条记录
      chatServerApi.getChatRecord({
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        console.log(res)
        const httpResult = res.data
        if (httpResult.code === 200) {
          context.commit('SET_MESSAGELIST', httpResult.row)
        }
      }).catch(err => {
        console.log(err)

      })
    }
  }
}

export default userModule

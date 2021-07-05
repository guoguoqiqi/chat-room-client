import { Module } from "vuex";
import { chatServerApi } from '@/axios/api'
import { message as AtdMessage, message } from 'ant-design-vue'
import RootStateInterface, { UserModuleState } from "../types";
import { ENV_APP_DATA, MessageOrigin, MessageType, UserInfo } from "@/common/constant";

const userModule: Module<UserModuleState, RootStateInterface> = {
  namespaced: true,
  state: {
    realName: '',
    userInfo: {},
    token: '',
    messageList: [],
    socket: null,
    onlineNumber: 0
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
    SET_SOCKET: (state, val) => {
      state.socket = val
    },
    SET_ONLINENUMBER: (state, val) => {
      state.onlineNumber = val
    },
  },
  actions: {
    setRealNameAsync: (context, val) => {
      setTimeout(() => {
        context.commit('SET_REAL_NAME', val)
      }, 0);
    },
    signOut: (context) => {
      context.commit('SET_TOKEN', '')
      context.commit('SET_REAL_NAME', '')
      context.commit('SET_USER_INFO', null)
      localStorage.removeItem('token')
      localStorage.removeItem('realName')
      localStorage.removeItem('userInfo')
    },
    getAllMessageList: (context) => {
      // 默认获取最新千条记录(后续分页)
      chatServerApi.getChatRecord({
        pageIndex: 1,
        pageSize: 1000
      }).then(res => {
        const httpResult = res.data
        if (httpResult.code === 200) {
          context.commit('SET_MESSAGELIST', httpResult.row)
        }
      }).catch(err => {
        console.log(err)

      })
    },
    // 初始化SocketIO
    initSocketIO: ({ commit, state, dispatch, rootState }) => {
      const socketiIoUrl =
        process.env.NODE_ENV === 'development'
          ? ENV_APP_DATA['DEV_APP_WEB_URL']
          : ENV_APP_DATA['PRO_APP_WEB_URL']

      try {
        const socket = io(socketiIoUrl + '/chat')
        const accountName = (state.userInfo as UserInfo).username
        const realName = (state.userInfo as UserInfo).realName

        socket.emit('enterRoom', {
          account_name: accountName,
          real_name: realName,
          message_origin: MessageOrigin.USER_MSG,
          message_type: MessageType.TEXT_MSG,
          message_value: (state.userInfo as UserInfo).realName + '进入房间',
        })

        // 监听在线人数
        socket.on('onlineNumberChange', (message: any) => {
          commit('SET_ONLINENUMBER', JSON.parse(message.message_value).onlineNumber)
        })

        // 监听用户发的消息
        socket.on('sendMessage', (message: any) => {
          commit('ADD_MESSAGELIST', message)
        });

        // 监听用户进入房间
        socket.on('enteredRoom', (message: any) => {
          commit('SET_SOCKET', socket)
          if (message.account_name !== accountName) {
            AtdMessage.info(message.message_value)
          }
        });

        // 监听用户离开房间
        socket.on('leavedRoom', (message: any) => {
          console.log(message)
          AtdMessage.info(message.message_value)
        });

      } catch (error) {
        console.log(error)
        AtdMessage.error('服务器异常！')
      }

    },
    sendMessage: ({ commit, state }, val) => {
      try {
        state.socket.emit('sendMessage', val)
      } catch (error) {
        console.log(error)
      }
    },
  }
}

export default userModule

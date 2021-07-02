import service from './http'
import * as HttpTypes from './types'

export const chatServerApi = {
  // 用户登录
  login: (data: HttpTypes.LoginParams): Promise<HttpTypes.HttpResponse> => service('/user/login', {
    method: 'post',
    responseType: 'json',
    data: data
  }),
  // 用户注册
  register: (data: HttpTypes.RegisterParams): Promise<HttpTypes.HttpResponse> => service('/user/register', {
    method: 'post',
    responseType: 'json',
    data: data
  }),
  // 聊天记录
  getChatRecord: (params: HttpTypes.ChatRecordPage): Promise<HttpTypes.HttpResponse> => service('/chat/get-record', {
    method: 'get',
    responseType: 'json',
    params: params
  }),
  // 发送消息
  pushMessage: (data: HttpTypes.pushMessageParams): Promise<HttpTypes.HttpResponse> => service('/chat/send', {
    method: 'post',
    responseType: 'json',
    data: data
  }),

}

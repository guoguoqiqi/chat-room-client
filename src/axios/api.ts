import service from './http'
import * as HttpTypes from './types'

export const login = async (data: HttpTypes.LoginParams): Promise<HttpTypes.HttpResponse> => {
  return service('/user/login', {
    method: 'post',
    responseType: 'json',
    data: data
  })
}
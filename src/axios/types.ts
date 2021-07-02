// 接口响应通过格式
export interface HttpResponse {
  status: number
  statusText: string
  data: {
    code: number
    desc: string
    [key: string]: any
  }
}

// 登录参数格式
export interface LoginParams {
  username: string
  password: string
}

// 注册参数格式
export interface RegisterParams {
  accountName: string,
  realName: string,
  password: string,
  repassword: string,
  mobile: number,
  role?: string | number
}

export interface ChatRecordPage {
  pageIndex: number
  pageSize: number
}

export interface pushMessageParams {
  account_name: string
  real_name: string
  message_origin: string
  message_type: string
  message_value: string
}

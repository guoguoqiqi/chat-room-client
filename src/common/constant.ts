import avatar1 from '@/assets/images/avatar1.png'
import avatar2 from '@/assets/images/avatar2.gif'
import avatar3 from '@/assets/images/avatar3.gif'

export {
  avatar1, avatar2, avatar3
}

export enum MessageOrigin {
  SYSTEM_MSG = 'systemMsg',
  USER_MSG = 'userMsg'
}

export enum MessageType {
  TEXT_MSG = 'textMsg',
  SMILE_MSG = 'smileMsg',
  IMAGE_MSG = 'imageMsg',
  VIDEO_MSG = 'videoMsg'
}

export interface SendMessageBody {
  account_name: string
  real_name: string
  message_origin: string
  message_type: string
  message_value: any
}

export interface GetMessageBody {
  account_name: string
  create_time: string
  message_origin: string
  message_type: string
  message_value: any
  real_name: string
  record_id: number
}

export interface UserInfo {
  realName: string
  role: number
  username: string
  mobile: string
}
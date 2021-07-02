import { GetMessageBody, UserInfo } from "../common/constant";

// 根Store
export default interface RootStateInterface {
  language: string,
}

// 集成所有子模块
export interface AllStateTypes extends RootStateInterface {
  user: UserModuleState,
  app: AppModuleState
}

export interface UserModuleState {
  realName: string,
  userInfo: UserInfo | object,
  token: string
  messageList: Array<GetMessageBody>
}

export interface AppModuleState {
  appName: string;
}
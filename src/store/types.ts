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
  userName: string,
  userInfo: object,
  token: string
}

export interface AppModuleState {
  appName: string;
}
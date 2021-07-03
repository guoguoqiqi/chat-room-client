import { Module } from "vuex";
import RootStateInterface, { AppModuleState, } from "../types";

const appModule: Module<AppModuleState, RootStateInterface> = {
  namespaced: true,
  state: {
    appName: 'chat room system',
    appSetting: {
      vipFontColor: false
    },
    appSettingModalVisible: false
  },
  getters: {
    appName: (state) => state.appName,
  },
  mutations: {
    SET_APP_NAME(state, val: string) {
      state.appName = val;
    },
    SET_APP_SETTING_VISIBLE(state, val: boolean) {
      state.appSettingModalVisible = val;
    },
    SET_APP_SETTING(state, val) {
      state.appSetting = val;
    },
  },
  actions: {}
}

export default appModule
import { Module } from "vuex";
import RootStateInterface, { AppModuleState, } from "../types";

const appModule: Module<AppModuleState, RootStateInterface> = {
  namespaced: true,
  state: {
    appName: 'chat room system'
  },
  getters: {
    appName: (state) => state.appName,
  },
  mutations: {
    SET_APP_NAME(state, val: string) {
      state.appName = val;
    },
  },
  actions: {}
}

export default appModule
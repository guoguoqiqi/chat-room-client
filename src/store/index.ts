import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import RootStateInterface, { AllStateTypes } from './types'
import appModule from "./modules/app";
import userModule from "./modules/user";

export const key: InjectionKey<Store<RootStateInterface>> = Symbol();

export default createStore<RootStateInterface>({
  state: {
    language: 'CN'
  },
  modules: {
    app: appModule,
    user: userModule
  }
})

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}


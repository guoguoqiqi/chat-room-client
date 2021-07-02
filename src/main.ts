import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from "./router";
import store, { key } from './store'

import 'ant-design-vue/dist/antd.css';
import './public/home.css'

// 全局组件
import ChatModal from '@/components/common/modal.vue'

const app = createApp(App)

app.use(router).use(Antd).use(store, key)
// 注册全局组件
app.component('ChatModal', ChatModal)

// app.config.globalProperties.systemName = 'mangguopi' // 全局挂载
app.mount('#app')

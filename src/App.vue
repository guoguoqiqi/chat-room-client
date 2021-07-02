<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    if (localStorage.getItem('token')) {
      console.log('----------- 用户已登录 -----------')
      store.commit('user/SET_TOKEN', localStorage.getItem('token'))
      store.commit(
        'user/SET_USER_INFO',
        JSON.parse(localStorage.getItem('userInfo') as string)
      )
      store.commit('user/SET_REAL_NAME', localStorage.getItem('realName'))
    }
  },
})
</script>

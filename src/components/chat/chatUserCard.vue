<template>
  <div class="m-card">
    <header>
      <img class="avatar" width="50" height="50" :src="avatar2">
      <p class="name">{{realName}}</p>
    </header>
    <footer>
      <input class="search" type="text" placeholder="search friends...">
    </footer>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'

import { avatar2 } from '../../common/constant'

export default defineComponent({
  setup() {
    const store = useStore()
    const realName = computed(() => store.state.user.realName)

    return {
      realName,
      avatar2,
    }
  },
})
</script>
<style lang="less">
.m-card {
  padding: 12px;
  border-bottom: solid 1px #24272c;
  footer {
    margin-top: 10px;
  }
  .avatar, .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
  }
  .search {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    border: solid 1px #3a3a3a;
    outline: none;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    background-color: #26292e;
    border-radius: 4px;
  }
}

</style>
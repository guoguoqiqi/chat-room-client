<template>
  <div class="m-list">
    <ul>
      <li class="active">
        <img class="avatar" width="40" height="40" :src="avatar1">
        <p class="name">朋友</p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { avatar1 } from '../../common/constant'

export default defineComponent({
  setup() {
    return {
      avatar1,
    }
  },
})
</script>
<style lang="less">
.m-list {
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
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
  }
}

</style>
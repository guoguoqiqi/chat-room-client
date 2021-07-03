<template>
  <div class="m-message">
    <ul>
      <li v-for="item in messageList" :key="item.account_name">
        <p class="time"><span>{{item.create_time}}</span></p>
        <div class="main" :class="{ self: item.account_name === acountName }">
          <img class="avatar" width="30" height="30" :src="avatar1" />
          <div class="name"><span :class="{'vip-font-color': vipFontColor}">{{item.real_name}}</span></div>
          <div class="text"><span :class="{'vip-font-color': vipFontColor}">{{item.message_value}}</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  nextTick,
  onBeforeUnmount,
} from 'vue'
import { useStore } from '@/store/index'
import { avatar1 } from '@/common/constant'
import { UserInfo } from '@/common/constant'
import { renderTime, scrollToBottom } from '@/common/utils'

export default defineComponent({
  setup() {
    const store = useStore()

    const acountName = computed(() => {
      return (store.state.user.userInfo as UserInfo).username
    })
    const realName = computed(() => {
      return (store.state.user.userInfo as UserInfo).realName
    })
    const vipFontColor = computed(() => {
      return store.state.app.appSetting.vipFontColor
    })
    const messageList = computed(() => {
      nextTick(() => {
        scrollToBottom()
      })
      store.state.user.messageList.map(
        (item) => (item.create_time = renderTime(item.create_time))
      )
      return store.state.user.messageList
    })

    // 获取最近记录
    store.dispatch('user/getAllMessageList')

    // 初始化SocketIO
    store.dispatch('user/initSocketIO')

    onMounted(() => {})

    onBeforeUnmount(() => {
      // chatWebSocket.leaveRoom({
      //   account_name: acountName.value,
      //   real_name: realName.value,
      //   message_origin: MessageOrigin.USER_MSG,
      //   message_type: MessageType.TEXT_MSG,
      //   message_value: realName.value + '离开房间',
      // })
    })

    return {
      acountName,
      vipFontColor,
      messageList,
      avatar1,
    }
  },
})
</script>
<style lang="less">
.m-message {
  height: 300px;
  padding: 10px 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgb(145, 144, 144);
  }
  &::-webkit-scrollbar-corner {
    background: #179a16;
  }
  li {
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      background-color: #dcdcdc;
      border-radius: 2px;
    }
  }
  .name {
    font-size: 12px;
  }
  .avatar {
    float: left;
    width: 32px;
    height: 32px;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }
  .text {
    display: inline-block;
    position: relative;
    max-width: ~'calc(100% - 40px)';
    min-height: 30px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 2.5;
    text-align: left;
    background-color: #fafafa;
    word-break: break-all;
    border-radius: 4px;
    &:before {
      content: ' ';
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #b2e281;
      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}

</style>
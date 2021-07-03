<template>
  <div class="m-text">
    <textarea id="message-input" v-model="message" placeholder="按 Enter 发送" @keydown="sendMessage" />
    <button id="message-button" @click="sendMessage">发送</button>
  </div>
</template>
<script lang="ts">
import {
  MessageOrigin,
  MessageType,
  SendMessageBody,
  UserInfo,
} from '@/common/constant'
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store/index'
import { chatServerApi } from '@/axios/api'
import { pushMessageParams } from '@/axios/types'
import { scrollToBottom } from '@/common/utils'
import { message as AtdMessage } from 'ant-design-vue'

export default defineComponent({
  name: 'ChatInput',
  setup() {
    const store = useStore()
    const message = ref('猥琐发育别浪!!!')
    const sendMessage = (event: KeyboardEvent | MouseEvent) => {
      if (
        !message.value &&
        event instanceof KeyboardEvent &&
        event.keyCode === 13
      ) {
        event.preventDefault()
        AtdMessage.warn('发送内容为空')
        return
      }

      const myMessage = {
        account_name: (store.state.user.userInfo as UserInfo).username,
        real_name: (store.state.user.userInfo as UserInfo).realName,
        message_origin: MessageOrigin.USER_MSG,
        message_type: MessageType.TEXT_MSG,
        message_value: message.value,
      } as SendMessageBody

      if (event instanceof MouseEvent) {
        pushMessage(myMessage)
        return
      }
      if (event instanceof KeyboardEvent) {
        if (event.keyCode === 13) {
          event.preventDefault()
          pushMessage(myMessage)
        }
      }
    }

    const pushMessage = async (myMessage: pushMessageParams) => {
      const httpResult = await chatServerApi.pushMessage(myMessage)
      if (httpResult.data.code === 200) {
        store.dispatch('user/sendMessage', myMessage)
        // store.commit('user/ADD_MESSAGELIST', myMessage)
        message.value = ''
        scrollToBottom()
      }
    }

    return {
      message,
      sendMessage,
      pushMessage,
    }
  },
})
</script>
<style scoped lang="less">
.m-text {
  position: relative;
  height: 160px;
  border-top: solid 1px #ddd;
  #message-input {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
  }
  #message-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 3px 15px;
    border: 1px solid #e0dbdb;
    letter-spacing: 5px;
    &:hover {
      color: #fff;
      background-color: #089208;
      cursor: pointer;
    }
  }
}

</style>
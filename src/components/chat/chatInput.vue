<template>
  <div class="m-text">
    <div id="chat-tools">
      <SmileOutlined @click="showEmojiPicker" />

      <div class="emoji-picker" v-show="emojiPickerVisible">
        <Picker :data="emojiIndex" set="twitter" @select="getToEmojiMessage" />
      </div>
    </div>
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
import { SmileOutlined } from '@ant-design/icons-vue'

import emojiData from 'emoji-mart-vue-fast/data/all.json'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

export default defineComponent({
  name: 'ChatInput',
  setup() {
    const store = useStore()
    const message = ref('猥琐发育别浪!!!')

    // emoji
    const emojiIndex = new EmojiIndex(emojiData)
    const emojiPickerVisible = ref<boolean>(false)

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
      console.log(myMessage, 'message.value')

      const httpResult = await chatServerApi.pushMessage(myMessage)
      if (httpResult.data.code === 200) {
        store.dispatch('user/sendMessage', myMessage)
        // store.commit('user/ADD_MESSAGELIST', myMessage)
        message.value = ''
        scrollToBottom()
      }
    }

    const showEmojiPicker = () => {
      emojiPickerVisible.value = true
    }

    const getToEmojiMessage = (emoji: any) => {
      message.value += emoji.native
      emojiPickerVisible.value = false
    }

    return {
      message,
      emojiIndex,
      emojiPickerVisible,
      sendMessage,
      pushMessage,
      showEmojiPicker,
      getToEmojiMessage,
    }
  },
  components: {
    SmileOutlined,
    Picker,
  },
})
</script>
<style scoped lang="less">
.m-text {
  position: relative;
  height: 160px;
  border-top: solid 1px #ddd;
  #chat-tools {
    width: 100%;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 10px;
    line-height: 30px;
    & > .anticon {
      font-size: 18px;
      cursor: pointer;
    }

    .emoji-picker {
      display: flex;
      position: absolute;
      left: 6px;
      bottom: 30px;
    }
  }
  #message-input {
    width: 100%;
    height: 100%;
    padding: 30px 10px 0px;
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
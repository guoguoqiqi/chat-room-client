<template>
  <div id="chat">
    <div class="sidebar">
      <chat-user-card></chat-user-card>
      <chat-friends></chat-friends>
      <UnorderedListOutlined @click="customAppSetting" />
    </div>
    <div class="main">
      <chat-message></chat-message>
      <chat-input></chat-input>
    </div>
    <appSetting></appSetting>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import chatFriends from '@/components/chat/chatFriends.vue'
import chatUserCard from '@/components/chat/chatUserCard.vue'
import chatMessage from '@/components/chat/chatMessage.vue'
import chatInput from '@/components/chat/chatInput.vue'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/store/index'
import appSetting from '@/components/appSetting.vue'
export default defineComponent({
  setup() {
    const store = useStore()
    const customAppSetting = () => {
      store.commit('app/SET_APP_SETTING_VISIBLE', true)
    }

    return {
      customAppSetting,
    }
  },
  components: {
    chatFriends,
    chatUserCard,
    chatMessage,
    chatInput,
    UnorderedListOutlined,
    appSetting,
  },
})
</script>
<style lang="less">
#chat {
  overflow: hidden;
  border-radius: 3px;
  .sidebar, .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    position: relative;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .sidebar .anticon-unordered-list {
    position: absolute;
    bottom: 12px;
    left: 12px;
    cursor: pointer;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
  .m-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .m-message {
    height: ~'calc(100% - 160px)';
  }
}

</style>

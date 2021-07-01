<template>
  <div id="chat">
    <div class="sidebar">
      <chat-user-card></chat-user-card>
      <chat-friends></chat-friends>
    </div>
    <div class="main">
      <chat-message></chat-message>
      <chat-input></chat-input>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import chatFriends from '@/components/chat/chatFriends.vue'
import chatUserCard from '@/components/chat/chatUserCard.vue'
import chatMessage from '@/components/chat/chatMessage.vue'
import chatInput from '@/components/chat/chatInput.vue'
export default defineComponent({
  setup() {},
  components: {
    chatFriends,
    chatUserCard,
    chatMessage,
    chatInput,
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
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
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

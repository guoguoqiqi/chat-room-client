<template>
  <div class="m-text">
    <textarea placeholder="按 Ctrl + Enter 发送"></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatInput',
})
</script>
<style lang="less">
.m-text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
  }
}
</style>
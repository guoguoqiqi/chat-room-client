<template>
  <div>
    <a-button @click="showModal">Open Modal with customized footer</a-button>
    <chatModal :customModalSetting="customModalSetting" :customVisible="modalVisible" @okCb="modalOkCb"
      @cancelCb="modalCancelCb">
      <template v-slot:customContent>6666</template>
    </chatModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import chatModal from '@/components/common/modal.vue'
export default defineComponent({
  setup() {
    const customModalSetting = reactive({
      title: '测试弹窗',
      contentText: '测试弹窗',
      closable: true,
      maskClosable: false,
    })

    const modalVisible = ref<boolean>(false)

    const showModal = () => {
      modalVisible.value = true
    }

    const modalOkCb = () => {
      modalVisible.value = false
    }

    const modalCancelCb = () => {
      modalVisible.value = false
    }
    return {
      showModal,
      customModalSetting,
      modalVisible,
      modalOkCb,
      modalCancelCb,
    }
  },
  components: {
    chatModal,
  },
})
</script>


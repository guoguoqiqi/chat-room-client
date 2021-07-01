<template>
  <a-modal v-model:visible="visible" :width="width" @cancel="handleCancel" @ok="handleOk"
    :destroyOnClose="destroyOnClose" :closable="closable" :mask="mask" :maskClosable="maskClosable">
    <template #title>
      <span class="title">{{title}}</span>
      <slot name="customTitle"></slot>
    </template>
    <template #footer>
      <a-button key="cancel" :type="cancelType" @click="handleCancel">{{cancelText }}</a-button>
      <a-button key="submit" :type="okType " :loading="loading" @click="handleOk">
        {{okText}}
      </a-button>
    </template>
    <div class="content">
      {{contentText}}
      <slot name="customContent"></slot>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, computed } from 'vue'

interface customModalSettingType {
  title: string
  contentText: string
  width?: string | number
  loading?: boolean
  okText?: string
  okType?: string
  cancelText?: string
  cancelType?: string
  destroyOnClose?: boolean
  keyboard?: boolean
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
}

export default defineComponent({
  props: {
    customModalSetting: {
      type: Object as PropType<customModalSettingType>,
      required: true,
    },
    customVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const parent = { ...context }
    const visible = computed(() => props.customVisible)

    // 统一默认配置
    var defaultModalSetting = {
      // 对话框标题
      title: 'Modal Title',
      // 对话框内容
      contentText: 'This is a modal',
      // 对话框宽度
      width: '360px',
      // 提交是否加载
      loading: false,
      // 提交按钮文字
      okText: '确定',
      // 提交按钮类型
      okType: 'danger',
      // 取消按钮文字
      cancelText: '取消',
      // 取消按钮类型
      cancelType: 'default',
      // 是否每次销毁
      destroyOnClose: true,
      // 是否允许ESC退出
      keyboard: false,
      // 是否显示查号
      closable: false,
      // 是否显示遮罩
      mask: true,
      // 是否点击遮罩关闭
      maskClosable: true,
    }

    var settings = reactive({
      ...defaultModalSetting,
      ...props.customModalSetting,
    })

    const handleOk = () => {
      parent.emit('okCb')
    }

    const handleCancel = () => {
      parent.emit('cancelCb')
    }

    return {
      visible,
      handleOk,
      handleCancel,
      ...toRefs(settings),
    }
  },
})
</script>


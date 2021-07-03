<template>
  <a-modal v-model:visible="appSettingModalVisible" :mask="true" :width="240" title="APP配置" :closable="false"
    :maskClosable="false" cancelText="取消" okText="确认" @cancel="handleCancel" @ok="handleOk">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :colon="false" labelAlign="left">
      <a-form-item label="炫酷会员色">
        <a-switch v-model:checked="formState.vipFontColor" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, UnwrapRef } from 'vue'
import { useStore } from '@/store/index'
import { AppSetting } from '@/common/constant'
export default defineComponent({
  setup(props, context) {
    const store = useStore()

    const appSettingModalVisible = computed(() => {
      return store.state.app.appSettingModalVisible
    })

    const formState: UnwrapRef<AppSetting> = reactive({
      vipFontColor: false,
    })

    const handleCancel = () => {
      store.commit('app/SET_APP_SETTING_VISIBLE', false)
    }

    const handleOk = () => {
      store.commit('app/SET_APP_SETTING_VISIBLE', false)
      store.commit('app/SET_APP_SETTING', formState)

      console.log(store.state.app.appSetting)
    }

    return {
      appSettingModalVisible,
      formState,
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
      handleCancel,
      handleOk,
    }
  },
})
</script>
<style scoped lang="less">
::v-deep .ant-modal-body {
  padding: 15px 5px !important;
}

</style>

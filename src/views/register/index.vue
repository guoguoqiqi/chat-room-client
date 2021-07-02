<template>
  <a-form layout="horizontal" :model="formState" @finish="handleFinish" id="register-form-box">
    <a-form-item>
      <a-input v-model:value="formState.realName" placeholder="昵称">
        <template #prefix>
          <SmileOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.accountName" placeholder="账号">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="密码">
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.repassword" type="password" placeholder="确认密码">
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.mobile" placeholder="手机号码">
        <template #prefix>
          <MobileOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="!submitDisabled" block>
        确认注册
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import {
  SmileOutlined,
  UserOutlined,
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons-vue'
import { encrypt } from '@/common/crypto'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { chatServerApi } from '@/axios/api'

interface FormState {
  realName: string
  accountName: string
  password: string
  repassword: string
  mobile: number
}
export default defineComponent({
  setup() {
    const router = useRouter()

    const formState: FormState = reactive({
      realName: '',
      accountName: '',
      password: '',
      repassword: '',
      mobile: 13145215201,
    })

    const submitDisabled = computed(() => {
      return (
        formState.realName &&
        formState.accountName &&
        formState.password &&
        formState.repassword &&
        formState.mobile
      )
    })

    const handleFinish = async () => {
      const httpRequest = await chatServerApi.register({
        accountName: formState.accountName,
        password: formState.password,
        repassword: formState.repassword,
        realName: formState.realName,
        mobile: formState.mobile,
      })
      console.log(httpRequest, 'register')
      if (httpRequest.data.code === 200) {
        const encryptText: string = encrypt(
          JSON.stringify({
            accountName: formState.accountName,
            password: formState.password,
          })
        )
        localStorage.setItem('encryptText', encryptText)
        localStorage.setItem('isRememberAcount', 'remembered')
        message.success('注册成功, 即将前往登录')
        setTimeout(() => {
          router.push({
            name: 'Login',
          })
        }, 1000)
        return
      }

      message.error(httpRequest.data.msg)
    }

    return {
      formState,
      handleFinish,
      submitDisabled,
    }
  },
  components: {
    SmileOutlined,
    UserOutlined,
    LockOutlined,
    MobileOutlined,
  },
})
</script>
<style scoped lang="less">
#register-form-box {
  width: 500px;
  margin: 50px auto;
}

</style>


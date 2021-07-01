<template>
  <a-form layout="horizontal" :model="formState" @finish="handleFinish" id="login-form-box">
    <a-form-item>
      <a-input v-model:value="formState.username" placeholder="Username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-model:checked="rememberAcount">记住密码</a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="!submitDisabled" block>
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { encrypt, decrypt } from '../../common/crypto'
import { message } from 'ant-design-vue'
import { useStore } from '../../store/index'
import { useRouter } from 'vue-router'
import { login } from '../../axios/api'

interface FormState {
  username: string
  password: string
}
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const formState: FormState = reactive({
      username: '',
      password: '',
    })

    const submitDisabled = computed(() => {
      return formState.username && formState.password
    })

    const rememberAcount = ref(false)

    watch(rememberAcount, (newValue, preValue) => {
      console.log(newValue, preValue)
      if (newValue) {
        localStorage.setItem('isRememberAcount', 'remembered')
      } else {
        localStorage.removeItem('isRememberAcount')
      }
    })

    onMounted(() => {
      const isRememberAcount = localStorage.getItem('isRememberAcount')
      if (isRememberAcount) {
        const decryptText = JSON.parse(
          decrypt(localStorage.getItem('encryptText') as string)
        )

        formState.username = decryptText.username
        formState.password = decryptText.password

        rememberAcount.value = true
      }
    })

    const handleFinish = async () => {
      const httpRequest = await login({
        username: formState.username,
        password: formState.password,
      })
      console.log(httpRequest, 'login')
      if (httpRequest.data.code === 200) {
        const userName = formState.username
        store.commit('user/SET_TOKEN', httpRequest.data.data.token)
        store.commit('user/SET_USER_NAME', userName)
        const encryptText: string = encrypt(
          JSON.stringify({
            username: formState.username,
            password: formState.password,
          })
        )
        localStorage.setItem('encryptText', encryptText)
        message.success('登录成功')
        router.push({
          name: 'Home',
        })
        return
      }

      rememberAcount.value = false
      localStorage.removeItem('isRememberAcount')

      message.error(httpRequest.data.msg)
    }

    return {
      formState,
      handleFinish,
      submitDisabled,
      rememberAcount,
    }
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
})
</script>
<style scoped>
#login-form-box {
  width: 500px;
  margin: 50px auto;
}
</style>


<template>
  <a-form
    layout="horizontal"
    :model="formState"
    @finish="handleFinish"
    id="login-form-box"
  >
    <a-form-item>
      <a-input v-model:value="formState.username" placeholder="Username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-model:checked="rememberAcount">记住密码</a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="!submitDisabled"
        block
      >
        登录
      </a-button>
      <div class="register-btn" @click="enterPage('Register')">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        注册
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { encrypt, decrypt } from "@/common/crypto";
import { message } from "ant-design-vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import { chatServerApi } from "@/axios/api";

interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const formState: FormState = reactive({
      username: "",
      password: "",
    });

    const submitDisabled = computed(() => {
      return formState.username && formState.password;
    });

    const rememberAcount = ref(false);

    watch(rememberAcount, (newValue, preValue) => {
      if (newValue) {
        localStorage.setItem("isRememberAcount", "remembered");
      } else {
        localStorage.removeItem("isRememberAcount");
      }
    });

    onMounted(() => {
      const isRememberAcount = localStorage.getItem("isRememberAcount");
      if (isRememberAcount) {
        const decryptText = JSON.parse(
          decrypt(localStorage.getItem("encryptText") as string)
        );
        formState.username = decryptText.username;
        formState.password = decryptText.password;
        rememberAcount.value = true;
      }
    });

    const handleFinish = async () => {
      const httpRequest = await chatServerApi.login({
        username: formState.username,
        password: formState.password,
      });
      console.log(httpRequest, "login");
      if (httpRequest.data.code === 200) {
        store.commit("user/SET_TOKEN", httpRequest.data.data.token);
        store.commit("user/SET_USER_INFO", httpRequest.data.data.user);
        store.commit("user/SET_REAL_NAME", httpRequest.data.data.user.realName);
        const encryptText: string = encrypt(
          JSON.stringify({
            username: formState.username,
            password: formState.password,
          })
        );
        localStorage.setItem("encryptText", encryptText);
        message.success("登录成功");
        router.push({
          name: "Home",
        });
        return;
      }

      rememberAcount.value = false;
      localStorage.removeItem("isRememberAcount");

      message.error(httpRequest.data.msg);
    };

    const enterPage = (routeName: string) => {
      localStorage.clear();
      router.push({
        name: routeName,
      });
    };

    return {
      formState,
      handleFinish,
      submitDisabled,
      rememberAcount,
      enterPage,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>
<style scoped lang="less">
#login-form-box {
  width: 500px;
  margin: 50px auto;
  .register-btn {
    position: relative;
    display: inline-block;
    width: 100%;
    padding: 10px 0;
    color: #03e9f4;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 24px;
  }

  .register-btn:hover {
    cursor: pointer;
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
  }

  .register-btn span {
    position: absolute;
    display: block;
  }

  .register-btn span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  .register-btn span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  .register-btn span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  .register-btn span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
}
</style>

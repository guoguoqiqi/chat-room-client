import { message as AtdMessage } from "ant-design-vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import router from "@/router";

const showStatus = (status: number) => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权或授权过期，将重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "无此资源(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    case 600:
      message = "查无此人(600)";
      break;
    default:
      message = `连接出错(${status})`;
  }
  return `${message}`;
};

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3029/nest-demo-01/"
      : "http://106.55.228.251:3029/nest-demo-01",
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    post: {
      "Content-Type": "application/json;charset=utf-8",
    },
  },
  timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    error.data = {};
    error.data.msg = "服务器异常，请联系管理员！";
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response, "response");
    const status = response.status;
    let msg = "";
    if (status < 200 || status >= 300) {
      msg = showStatus(status);
      if (typeof response.data === "string") {
        response.data = { msg };
      } else {
        response.data.msg = msg;
      }
    }
    return response;
  },
  (error) => {
    console.log(error, "error");
    if (axios.isCancel(error)) {
      console.log("repeated request: " + error.message);
    } else {
      error.data = {};
      error.data.msg = showStatus(error.response.data.statusCode);
      AtdMessage.error(error.data.msg);

      // 授权过期自动跳转登录
      if (error.response.data.statusCode === 401) {
        setTimeout(() => {
          router.push({
            name: "Login",
          });
        }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

export default service;

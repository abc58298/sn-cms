import axios from "axios";
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'
import { ref } from 'vue'
// -------------------------1. 创建axios实例-----------------------
const instance = axios.create({
  // 接口
  baseURL: "/api",
  // 超时时间
  timeout: 3000,
});
// -------------------------2.请求拦截-----------------------
instance.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token');
    if (token) {
      config.headers['token'] = token
    }
    // 加载loading
    addLoading();
    return config;
  },
  error => {
    //  请求发生错误，抛出异常
    Promise.reject(error);
  }
);

// -------------------------3.响应拦截-----------------------
instance.interceptors.response.use(
  res => {
    // 取消加载 loading
    cancelLoading();
    return res;
  },
  error => {
    // 取消加载 loading
    cancelLoading();
    if (error && error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          ElMessage.error("请求错误");
          break;
        case 401:
          ElMessage.error("未授权，请重新登录");
          break;
        case 403:
          ElMessage.error("登录过期，请重新登录");
          break;
        case 404:
          ElMessage.error("请求错误，未找到相应的资源");
          break;
        case 408:
          ElMessage.error("请求超时");
          break;
        case 500:
          ElMessage.error("服务器错误");
          break;
        case 504:
          ElMessage.error("网络超时");
          break;
        default:
          ElMessage.error("请求失败");
      }
    } else {
      if (JSON.stringify(error).includes("timeout")) {
        error.code = "TIMEOUT";
        error.message = "服务器响应超时，请刷新页面";
      }
    }
    return Promise.reject(error);
  },

);

// -------------------------4.配置全局loading-----------------------
let loadCount = 0;
let loadingInstance = ref(null);
// 加载loading
const addLoading = () => {
  loadCount++;
  if (loadCount === 1) {
    loadingInstance.value = ElLoading.service({
      fullscreen: false,
      text: "正在请求数据中....",
      background: "rgba(0, 0, 0, 0)",
    });
  }

};
// 取消加载loading
const cancelLoading = () => {
  loadCount--;
  if (loadCount === 0) {
    loadingInstance.value.close();
  };
};
// -------------------------配置全局loading-----------------------
// 5.导出 axios 实例
export default instance;


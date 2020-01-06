import axios from "axios";
import router from "../router";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:5000";
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    if (store.getters.token) {
      config.headers.Authorization = "Bearer " + store.getters.token;
    }
    return config;
  },
  function(error) {
    console.log("requestError:" + error);
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么s
    console.log("err==>" + error);
    console.log(error.response);
    if (error.response) {
      if (error.response.status == 401) {
        store.dispatch("user/removeToken").then(s => {
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
        });
      }
    }
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return ""; //Promise.reject(error);
  }
);

export const httpGet = (url, data) => {
  return axios.get(url, { params: data }).then(res => res.data);
};

export const httpPost = (url, data) => {
  return axios.post(url, data).then(res => res.data);
};

import axios from "axios";
import { httpGet, httpPost } from "@/utils/request";

export const login = data => {
  return axios.get("/api/Account", { params: data });
};
export const getUserInfoByToken = data => {
  return httpGet("/api/User/GetUserInfoByToken", data);
};

export const getUserListByPage = data => {
  return httpGet("/api/User/Get", data);
};

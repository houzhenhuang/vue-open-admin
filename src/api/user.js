import axios from "axios";
import { httpGet, httpPost, httpPatch, httpDelete } from "@/utils/request";

export const login = data => {
  return axios.get("/api/Account", { params: data });
};
export const getUserInfoByToken = data => {
  return httpGet("/api/User/GetUserInfoByTokenAsync", data);
};

export const getUsersByPage = data => {
  return httpGet("/api/User/GetUsersByPageAsync", data);
};
export const addUser = data => {
  return httpPost("/api/User/AddUserAsync", data);
};
export const editUser = data => {
  return httpPatch("/api/User/EditUserAsync", data);
};
export const deleteUser = data => {
  return httpDelete("/api/User/DeleteUserAsync", data);
};
export const getRolesByUser = data => {
  return httpGet("/api/User/GetRolesByUserAsync", data);
};
export const disRoleAsync = data => {
  return httpPatch("/api/User/DisRoleAsync", data);
};


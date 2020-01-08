import axios from "axios";
import { httpGet, httpPost, httpPut, httpDelete } from "@/utils/request";

export const getRoles = data => {
  return httpGet("/api/Role/GetRolesAsync", data);
};

export const addRole = data => {
  return httpPost("/api/Role/AddRoleAsync", data);
};
export const editRole = data => {
  return httpPut("/api/Role/EditRoleAsync", data);
};
export const deleteRole = data => {
  return httpDelete("/api/Role/DeleteRoleAsync", data);
};

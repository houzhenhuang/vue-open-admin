import axios from "axios";
import "@/utils/request";

export const getPermissionMenus = data => {
  return axios.get("/api/Permission/GetPermissionMenus", { params: data }).then(resp=>resp.data);
};

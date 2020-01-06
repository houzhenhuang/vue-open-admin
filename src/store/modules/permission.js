import { constantRoutes, filterAsyncRouter } from "@/router";
import { getPermissionMenus } from "@/api/permission";
const state = {
  routes: [],
  addRoutes: []
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    filterAsyncRouter(routes);
    state.routes = constantRoutes.concat(routes);
  }
};
const actions = {
  generateRoutes({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getPermissionMenus({ userId: userId })
        .then(response => {
          if (response.success) {
            const { data } = response;
            commit("SET_ROUTES", data);
            resolve(data);
          } else {
            reject(response.message);
          }
          //   let accessedRoutes;
          //   if (roles.includes("admin")) {
          //     accessedRoutes = asyncRoutes || [];
          //   } else {
          //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          //   }
          //   commit("SET_ROUTES", accessedRoutes);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

import Cookies from "js-cookie";
import { login, getUserInfoByToken } from "@/api/user";

const TokenKey = "OpenAdmin-Token";

const state = {
  token: Cookies.get(TokenKey),
  name: "",
  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  REMOVE_TOKEN: state => {
    Cookies.remove(TokenKey);
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username, password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          Cookies.set(TokenKey, data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfoByToken({ token: state.token })
        .then(response => {
          if (response && response.success) {
            const { data } = response;
            const { roles, name } = data;
            if (!roles || roles.length <= 0) {
              reject("该用户没有角色");
            }
            commit("SET_ROLES", roles);
            commit("SET_NAME", name);
            // commit("SET_AVATAR", avatar);
            // commit('SET_INTRODUCTION', introduction)
            resolve(data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeToken({ commit }) {
    return new Promise(resolve => {
      commit("REMOVE_TOKEN");
      resolve(1);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

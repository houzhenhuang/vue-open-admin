import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import tabs from "./modules/tabs";
import user from "./modules/user";
import permission from "./modules/permission";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    tabs,
    //   settings,
    user,
    permission
  },
  getters
});

export default store;

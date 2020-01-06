const state = {
  tabs:
    sessionStorage.getItem("tabs") == null
      ? []
      : JSON.parse(sessionStorage.getItem("tabs")),
  activeName: ""
};

const mutations = {
  ADD_TABS: (state, tab) => {
    state.activeName = tab.fullPath;

    if (state.tabs.some(t => t.fullPath == tab.fullPath)) return;
    state.tabs.push(
      Object.assign({}, tab, {
        title: tab.meta.title || "no-name"
      })
    );
    sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
  },
  DEL_TABS: (state, tabName) => {
    state.tabs = state.tabs.filter(tab => tab.fullPath !== tabName);
    sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
  },
  SET_ACTIVE_NAME: (state, activeName) => {
    state.activeName = activeName;
  }
};

const actions = {
  addTabs({ commit }, tab) {
    commit("ADD_TABS", tab);
  },
  delTabs({ commit }, tabName) {
    commit("DEL_TABS", tabName);
  },
  setActiveName({ commit }, activeName) {
    commit("SET_ACTIVE_NAME", activeName);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

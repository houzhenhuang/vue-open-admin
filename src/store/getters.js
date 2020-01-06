const getters = {
  sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  tabs: state => state.tabs.tabs,
  tabActiveName: state => state.tabs.activeName,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
};
export default getters;

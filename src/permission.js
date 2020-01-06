import router from "./router";
import store from "@/store";
import { Message } from "element-ui";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration   showSpinner:是否显示螺旋加载

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  var token = store.getters.token;
  if (token) {
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    if (hasRoles) {
      next();
    } else {
      if (to.path == "/login") {
        next();
      } else {
        const userInfo = await store
          .dispatch("user/getUserInfo");
        store
          .dispatch("permission/generateRoutes", userInfo.id)
          .then(accessRoutes => {
            router.addRoutes(accessRoutes);
          });
        next();
      }
    }
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login" });
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

import Vue from "vue";
import Router from "vue-router";

//Vue-router 报NavigationDuplicated的解决方案
const originalPush = Router.prototype.push;
Router.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

import Layout from "@/layout";
import { Alert } from "element-ui";

export const constantRoutes = [
  {
    path: "/login",
    mame: "login",
    component: () => import("@/views/Login/index"),
    meta: { needLayout: false },
    hidden: true
  },
  // {
  //   path: "/menu",
  //   component: Layout,
  //   name: "menu",
  //   meta: {
  //     title: "多级菜单",
  //     icon: "menu",
  //     isMenuItem: false
  //   },
  //   children: [
  //     {
  //       path: "/menu/menu-1",
  //       component: Layout, // Parent router-view
  //       name: "Menu-1",
  //       meta: { title: "多级菜单-1", icon: "menu" },
  //       children: [
  //         {
  //           path: "/menu/menu-1/menu-1-1",
  //           component: () => import("@/views/Menu/Menu-1/Menu-1-1/index"),
  //           name: "menu-1-1",
  //           meta: { title: "多级菜单-1-1", icon: "menu" }
  //         }
  //       ]
  //     },
  //     {
  //       path: "/menu/menu-2",
  //       component: () => import('@/views/Menu/Menu-2/index'), // Parent router-view
  //       name: "Menu-2",
  //       meta: { title: "多级菜单-2", icon: "menu" },
  //     },
  //   ]
  // },
  {
    path: "/",
    component: () => import("@/views/Home/index"),
    name: "home",
    meta: { title: "首页", icon: "home", isMenuItem: true, needLayout: true }
  },
  {
    path: "/example",
    component: Layout,
    // redirect: '/example/table',
    name: "example",
    meta: { title: "演示", icon: "example", needLayout: true },
    children: [
      {
        path: "/example/table",
        name: "table",
        component: () => import("@/views/Example/Table/index"),
        meta: { title: "Table", icon: "table", needLayout: true }
      },
      {
        path: "tree",
        name: "tree",
        component: () => import("@/views/Example/Tree/index"),
        meta: { title: "Tree", icon: "tree", needLayout: true }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    routes: constantRoutes
  });

const router = createRouter();

export function filterAsyncRouter(asyncRouter) {
  asyncRouter.filter(route => {
    if (!route.meta.isMenuItem) {
      route.component = Layout;
    } else {
      console.log(route.path);
      route.component = () => import("@/views" + route.path + "/index");
    }
    if (route.children && route.children.length) {
      filterAsyncRouter(route.children);
    }
    return true;
  });
}

export function addRoutes(routes) {
  routes.forEach(route => {
    router.addRoutes(route);
  });
}

export default router;

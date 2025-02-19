<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <el-menu-item
      v-if="test(item)"
      :index="resolvePath(item)"
      :class="{'submenu-title-noDropdown':!isNest}"
    >
      <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
    <el-submenu v-else :index="resolvePath(item)">
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
        <span slot="title">{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    test(route) {
      this.onlyOneChild = route;
      if (route.path.substring(0, 1) === "/" && route.meta.isMenuItem) {
        return true;
      }
      return !(route.children && route.children.length);
    },
    resolvePath(route) {
      if (route.path.substring(0, 1) === "/" && route.meta.isMenuItem) {
        return route.path;
      }
      if (this.basePath.indexOf(route.path) > 0) {
        return this.basePath;
      }
      return path.resolve(this.basePath, route.path);
    }
  }
};
</script>

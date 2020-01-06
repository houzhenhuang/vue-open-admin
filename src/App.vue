<template>
  <div id="app">
    <div v-if="$route.meta.needLayout" :class="classObj" class="app-wrapper" id="app">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <el-tabs
            v-model="tabActiveName"
            @tab-click="handleClick"
            @tab-remove="removeTab"
            @contextmenu.prevent.native="openMenu(this,$event)"
          >
            <el-tab-pane
              v-for="(tab) in tabs"
              :key="tab.meta.title"
              :label="tab.meta.title"
              :name="tab.fullPath"
              :closable="tab.fullPath=='/'?false:true"
            >
              <span slot="label">
                <svg-icon v-show="tab.fullPath=='/'" icon-class="home" />
                &nbsp;{{tab.meta.title}}
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>
        <app-main />
        <ul v-show="visible" class="contextmenu" :style="{left:left+'px',top:top+'px'}">
          <li>
            <i class="el-icon-refresh-right"></i>刷新
          </li>
          <div class="el-divider el-divider--horizontal">
            <!---->
          </div>
          <li>
            <span>关闭</span>
          </li>
          <li>
            <i class="el-icon-more"></i>关闭其它
          </li>
          <!---->
          <li>
            <i class="el-icon-back"></i>关闭到左侧
          </li>
          <li>
            <span>关闭所有</span>
          </li>
        </ul>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Sidebar, Navbar, AppMain },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0
    };
  },
  computed: {
    ...mapGetters(["tabs"]),
    tabActiveName: {
      get: function() {
        return this.$store.getters.tabActiveName;
      },
      set: function(val) {
        this.$store.dispatch("tabs/setActiveName", val);
      }
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return "desktop";
    },
    fixedHeader() {
      return false;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  watch: {
    $route() {
      this.addTab();
    }
  },
  methods: {
    removeTab(targetName) {
      this.$store.dispatch("tabs/delTabs", targetName);
      if (this.tabActiveName === targetName) {
        this.$store.dispatch(
          "tabs/setActiveName",
          this.tabs[this.tabs.length - 1].fullPath
        );
        this.$router.replace(this.tabActiveName);
      }
    },
    handleClick(tab) {
      if (tab.$route.fullPath == this.tabActiveName) return;
      this.$router.replace(this.tabActiveName);
    },
    addTab() {
      const { name, fullPath, meta } = this.$route;
      if (name) {
        this.$store.dispatch("tabs/addTabs", {
          fullPath,
          meta
        });
      }
      return false;
    },
    openMenu(that, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left

      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      console.log(e.clientX);
      const left = e.clientX - 210 + 15;

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  border: 1px solid #ebeef5;
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  min-width: 130px;
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    i {
      margin-right: 8px;
      font-size: 14px;
      vertical-align: -1px;
      span {
        margin-left: 22px;
      }
    }
  }
  li:hover {
    background: #eee;
  }
  .el-divider--horizontal {
    margin: 5px 0;
  }
}
</style>

<style lang="scss" >
.el-tabs__header {
  margin: 0;
}
.el-tabs__nav-scroll {
  padding-left: 15px;
}
.el-tabs__item:focus.is-active.is-focus:not(:active) {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style> 



<template>
  <div class="dashboard-container">
    <div class="dashboard-text">角色管理</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    show: function() {
      alert(1);
    },
    show1: function() {
      alert(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

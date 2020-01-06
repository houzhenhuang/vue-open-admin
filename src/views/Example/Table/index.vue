<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: table</div>

    <input type="button" value="按钮" @contextmenu="show()" />
    <input type="button" value="按钮1" @contextmenu.prevent="show1()" />
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

<template>
  <el-table highlight-current-row :data="users" style="width: 100%">
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column label="#" type="index" width="80"></el-table-column>
    <el-table-column prop="name" label="昵称"></el-table-column>
    <el-table-column prop="account" label="登录名"></el-table-column>
    <el-table-column prop="roles" label="角色">
      <template slot-scope="scope">
        <el-tag v-for="role in scope.row.roles" :key="role" size="medium">{{role}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="sex" label="性别" :formatter="formatSex"></el-table-column>
    <el-table-column prop="birthday" label="生日" :formatter="formatBirth"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status==1?'success':'danger'"
          size="medium"
        >{{scope.row.status==1?"正常":"禁用"}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getUserListByPage } from "@/api/user";
import util from "@/utils/date"
export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    formatSex(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    formatBirth: function(row, column) {
      return !row.birthday || row.birthday == ""
        ? ""
        : util.formatDate.format(new Date(row.birthday), "yyyy-MM-dd");
    },
    getUsers() {
      let data = {
        pageIndex: 1,
        keyworld: ""
      };
      getUserListByPage(data).then(res => {
        if (res.success) {
          let pageResult = res.data;
          this.users = pageResult.data;
          console.log(pageResult);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

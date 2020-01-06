<template>
  <section>
    <!-- 工具条 -->
    <el-col class="toolbar">
      <el-form :inline="true" :model="toobarForm">
        <el-form-item label="关键字">
          <el-input v-model="toobarForm.keyworld" placeholder="昵称/登录名"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="toobarForm.status" placeholder="状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表  -->
    <el-table highlight-current-row :data="users" style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="#" type="index" width="80"></el-table-column>
      <el-table-column prop="name" label="昵称" sortable></el-table-column>
      <el-table-column prop="account" label="登录名" sortable></el-table-column>
      <el-table-column prop="roles" label="角色" sortable>
        <template slot-scope="scope">
          <el-tag v-for="role in scope.row.roles" :key="role" size="medium">{{role}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatSex" sortable></el-table-column>
      <el-table-column prop="birthday" label="生日" :formatter="formatBirth" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable>
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
  </section>
</template>

<script>
import { getUserListByPage } from "@/api/user";
import util from "@/utils/date";
export default {
  data() {
    return {
      users: [],
      toobarForm: {
        keyworld: "",
        status: ""
      }
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
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

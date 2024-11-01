<template>
  <el-page-header icon="" content="用户管理" title="序列号管理系统"></el-page-header>
   <el-form>
    <el-row class="row" :gutter="20">
      <el-col :span="6">
        <el-form-item label="用户ID" prop="username">
          <el-input  autocomplete="off" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="角色状态" prop="state">
          <el-select placeholder="请选择账号状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item>
          <el-button type="primary">查阅</el-button>
          <el-button >重置</el-button> <!-- Updated button -->
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <!-- 使用 columns 配置生成表头 -->
    <el-table-column
      v-for="(col, index) in columns"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
    />
    <!-- 自定义操作列 -->
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-button round type="danger">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { reactive } from 'vue';

// 定义表头列信息
const columns = [
  { prop: 'id', label: 'ID', width: 100 },
  { prop: 'userId', label: '用户名', width: 100 },
  { prop: 'userName', label: '密码', width: 100 },
  { prop: 'userPassword', label: '邮箱', width: 100 },
  { prop: 'phoneNumber', label: '手机号', width: 100 },
  { prop: 'accountStatus', label: '角色', width: 100 },
  { prop: 'registrationDate', label: '创建时间', width: 100 },
  { prop: 'registrationDate', label: '更新时间', width: 100 }
];

// 表格数据
const tableData = reactive([
  {
    id: 1,
    userId: 'U12345',
    userName: 'John Doe',
    userPassword: 'password123',
    phoneNumber: '123-456-7890',
    accountStatus: '启用',
    registrationDate: '2023-09-15'
  },
  {
    id: 2,
    userId: 'U67890',
    userName: 'Jane Smith',
    userPassword: 'securePass',
    phoneNumber: '987-654-3210',
    accountStatus: '禁用',
    registrationDate: '2023-08-10'
  }
  // 其他数据行
]);
//选项
const options=[
{label:"启用",value:0},
{label:"禁用",value:1}
]
</script>

<style scoped>
.row{
  margin-top:30px;
}
</style>

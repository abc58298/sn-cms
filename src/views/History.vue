<template>
  <el-page-header icon="" content="用户管理" title="序列号管理系统"></el-page-header>
   <el-form>
    <el-row class="row" :gutter="20">
      <el-col :span="6">
        <el-form-item label="序列号" prop="username">
          <el-input  autocomplete="off" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="序列号状态" prop="state">
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
          <el-button>重置</el-button> <!-- Updated button -->
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
  </el-table>
</template>

<script setup>
import { reactive } from 'vue';

// 表格数据
// 定义表头列信息
const columns = [
  { prop: 'id', label: 'ID', width: 150 },
  { prop: 'userId', label: '序列号', width: 150 },
  { prop: 'Status', label: '状态', width: 150 },
  { prop: 'applyDate', label: '分配时间', width: 150 },
  { prop: 'startDate', label: '过期时间', width: 150 },

];

// 表格数据
const tableData = reactive([
  {
    id: 1,
    userId: 'SN12345',
    productName: '产品A',
    applyDate: '2023-07-01',
    startDate: '2023-08-01',
    endDate: '2024-08-01',
    serialStatus: '启用',
    note: '备注信息1'
  },
  {
    id: 2,
    userId: 'SN67890',
    productName: '产品B',
    applyDate: '2023-06-15',
    startDate: '2023-07-15',
    endDate: '2024-07-15',
    serialStatus: '禁用',
    note: '备注信息2'
  }
  // 可根据需求添加更多数据行
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

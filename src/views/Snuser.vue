<template>
  <el-page-header icon="" content="序列号管理" title="序列号管理系统"></el-page-header>
   <el-form>
    <el-row class="row" :gutter="20">
      <el-col :span="6">
        <el-form-item label="序列号" prop="username">
          <el-input autocomplete="off" />
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
          <el-button >重置</el-button> <!-- Updated button -->
          <el-button type="primary" @click="handleDistribute(row)">分配</el-button>
          <el-button >生成</el-button> <!-- Updated button -->
          <text class="createMany">+批量生成</text>
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
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
    modal
  >
        <el-form-item label="分配数量:" prop="username">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="分配对象:" prop="username">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="分配产品:" prop="username">
          <el-input autocomplete="off" />
        </el-form-item>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
         确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive,ref } from 'vue';

// 定义表头列信息
const columns = [
  { prop: 'id', label: 'ID', width: 150 },
  { prop: 'userId', label: '序列号', width: 150 },
  { prop: 'Status', label: '状态', width: 150 },
  { prop: 'createDate', label: '创建时间', width: 150 },
  { prop: 'updateDate', label: '更新时间', width: 150 },
  { prop: 'assignDate', label: '分配时间', width: 150 },
  { prop: 'assignDate', label: '过期时间', width: 150 },
];


// 表格数据
const tableData = reactive([
  {
    id: 1,
    userId: 'SN12345',
    serialStatus: '启用',
    applyDate: '2023-07-01',
    assignTo: '张三',
    assignCount: 5,
    note: '备注信息1'
  },
  {
    id: 2,
    userId: 'SN67890',
    serialStatus: '禁用',
    applyDate: '2023-06-15',
    assignTo: '李四',
    assignCount: 3,
    note: '备注信息2'
  }

]);

//选项
const options=[
{label:"启用",value:0},
{label:"禁用",value:1}
]
//弹窗
const dialogVisible=ref(false);
//处理编辑
const handleEdit=(row)=>{
  dialogVisible.value=true;
  //将当前行数据赋值给表单
  form.value=row;
}
//分配
const handleDistribute=(row)=>{
  dialogVisible.value=true;
  //将当前行数据赋值给表单
  form.value=row;
}

</script>

<style scoped lang="scss">
.row{
  margin-top:30px;
}
.text-edit{
  color:#4d8cff;
  margin-right:20px;
}
.text-delete{
  color:#4d8cff
}
.dialog-footer {
  display: flex;
  justify-content: center; /* 居中对齐 */
  padding: 20px; /* 给底部留出一些空间 */
}
.createMany{
  color:rgb(15, 92, 235);
  margin-left:150px;
}
</style>

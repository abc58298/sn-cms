<template>
  <el-page-header icon="" content="序列号管理" title="序列号管理系统"></el-page-header>

  <el-form>
    <el-row class="row" :gutter="20">
      <el-col :span="6">
        <el-form-item label="序列号" prop="username">
          <el-input size="default" autocomplete="off" v-model="query.serialNumber" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="序列号状态" prop="state">
          <el-select placeholder="请选择账号状态" v-model="query.state">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查阅</el-button>
          <el-button  @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleDistribute">分配</el-button>
          <el-button type="primary" @click="batchCreate">生成</el-button>
          <text class="createMany" @click="batchCreate">+批量生成</text>

          <!-- 批量生成弹窗 -->
          <el-dialog v-model="dialogCreate" title="批量生成" width="500" modal>
            <el-form-item label="需要生成的序列号数目">
              <el-input size="default" autocomplete="off" v-model="serialNumber" />
            </el-form-item>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogCreate = false">取消</el-button>
                <el-button type="primary" @click="confirmBatchCreate">确定</el-button>
              </div>
            </template>
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(col, index) in columns"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
    />
  </el-table>

  <!-- 分配弹窗 -->
  <el-dialog v-model="dialogVisible" title="Tips" width="500" modal>
    <el-form-item label="分配批次:">
      <el-input size="default" autocomplete="off" v-model="assginData.batches" />
    </el-form-item>
    <el-form-item label="分配数量:">
      <el-input size="default" autocomplete="off" v-model="assginData.count" />
    </el-form-item>
    <el-form-item label="分配产品:">
      <el-input size="default" autocomplete="off" v-model="assginData.product" />
    </el-form-item>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { snList, snAssigment, snBatch } from "@/api/sn";
import { ElMessage } from "element-plus";

// 查询条件
const query = reactive({
  serialNumber: '',
  state: null,
});

// 表格数据
const tableData = ref([]);
const options = [
  { label: "未使用", value: 0 },
  { label: "已使用", value: 1 },
  { label: "已过期", value: 2 },
  { label: "已作废", value: 3 },
];

// 对话框
const dialogVisible = ref(false);
const dialogCreate = ref(false);
const serialNumber = ref("");
const assginData = reactive({
  batches: "",
  count: "",
  product: ""
});

// 生命周期钩子
onMounted(()=>{
  getsnData()
});

// 获取序列号数据
const getsnData = async () => {
  try {
    const hasQuery = query.serialNumber || query.state !== null;
    const params = hasQuery ? query : {};
    const res = await snList(params);

    if (res?.code === 200) {
      tableData.value = res.data;
    } else {
      console.error(`错误信息 ${res?.code}`);
    }
  } catch (error) {
    console.error("获取序列号列表出错:", error);
  }
};

// 查询
const handleQuery = () => {
  getsnData();
};

// 重置
const handleReset = () => {
  query.serialNumber = '';
  query.state = null;
  getsnData();
};

// 分配
const handleDistribute = () => {
  dialogVisible.value = true;
};

// 确认分配
const confirm = async () => {
  try {
    const res = await snAssigment(assginData);
    if (res.code === 200) {
      ElMessage.success(res.message);
      dialogVisible.value = false;
    } else {
      ElMessage.error(res.message || "分配序列号失败，请重试");
    }
  } catch (error) {
    ElMessage.error("请求失败");
  }
};

// 批量生成
const batchCreate = () => {
  dialogCreate.value = true;
};

// 确定批量生成
const confirmBatchCreate = async () => {
  const res = await snBatch(serialNumber.value);
  if (res.code === 200) {
    ElMessage.success("批量生成成功");
  } else {
    ElMessage.error("批量生成失败");
  }
};

// 表头配置
const columns = [
  { prop: 'id', label: 'ID', width: 150 },
  { prop: 'userId', label: '序列号', width: 150 },
  { prop: 'Status', label: '状态', width: 150 },
  { prop: 'createDate', label: '创建时间', width: 150 },
  { prop: 'updateDate', label: '更新时间', width: 150 },
  { prop: 'assignDate', label: '分配时间', width: 150 },
  { prop: 'expireDate', label: '过期时间', width: 150 },
];
</script>

<style scoped lang="scss">
.row {
  margin-top: 30px;
}
.text-edit {
  color: #4d8cff;
  margin-right: 20px;
}
.text-delete {
  color: #4d8cff;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.createMany {
  color: rgb(15, 92, 235);
  margin-left: 150px;
}
</style>

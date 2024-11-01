<template>
  <el-page-header icon="" content="序列号使用记录" title="序列号管理系统"></el-page-header>
   <el-form>
    <el-row class="row" :gutter="20">
      <el-col :span="6">
        <el-form-item label="分配对象" prop="username">
          <el-input  autocomplete="off"  v-model="query.acciptUser"/>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="批次" prop="state">
          <el-select placeholder="请选择" v-model="query.batches">
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
        <el-form-item >
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button  @click="handleReset">重置</el-button>

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
   <div class="footer">
     <div class="total">共5条记录</div>
      <div class="main">111</div>
      <el-button type="primary" @click="exportExcel">导出</el-button>
   </div>
</template>

<script setup>
import { onMounted, reactive,ref } from 'vue';
import {snList,snExcel}   from "@/api/sn"
onMounted(() => {
  // 在这里调用接口获取数据
  getsnData()
});
// 定义表头列信息
const columns = [
  { prop: 'id', label: 'ID', width: 140 },
  { prop: 'serialNumber', label: '序列号', width: 140 },
  { prop: 'allocationObject', label: '分配对象', width: 140 },
  { prop: 'allocationBatch', label: '分配批次', width: 140 },
  { prop: 'allocationProduct', label: '分配产品', width: 140 },
  { prop: 'allocationTime', label: '分配时间', width: 140 },
  { prop: 'expirationTime', label: '过期时间', width: 140 },
];
//选项
const options=[
{label:"未分配",value:0},
{label:"已分配",value:1},
{label:"已出租",value:2},
{label:"已过期",value:3},
{label:"已取消",value:4},
]
const tableData =ref([])
const query=reactive({
  acciptUser:"",
  batches:""
})
const getsnData = async () => {
  try {
    // 检查查询条件是否为空
    const hasQuery = query.acciptUser || query.batches !== null;
    const params = hasQuery ? query : {}; // 根据查询条件构建参数
    const res = await snList(params);

    if (res?.code === 200) {
      tableData.value = res.data;
      ElMessage.success("获取序列号使用记录成功"); // 添加成功提示
    } else {
      ElMessage.error(`错误信息: ${res?.code}`); // 显示错误信息
      console.error(`错误信息 ${res?.code}`);
    }
  } catch (error) {
    ElMessage.error("获取序列号使用记录出错"); // 捕获错误时显示提示
    console.error("获取序列号使用记录出错:", error);
  }
}

// 查询方法
const handleQuery = () => {
  console.log(query)
  getsnData(); // 根据 `query` 进行查询
};
//重置
const handleReset=()=>{
  query.acciptUser='';  //清空序列号
  query.batches=null;       //清空状态
  getsnData();              //重置后查询全部数据
}

//导出excel数据
   const exportExcel = async () => {
  // 显示导出中的提示
  ElMessage.info("正在导出数据，请稍候...");

  try {
    const res = await snExcel();

    if (res?.code === 200) {
      // 导出成功
      ElMessage.success("Excel 数据导出成功！");
      // 这里可以处理下载逻辑，例如将文件保存到本地
      // window.location.href = res.data.downloadUrl; // 假设下载链接在 res.data.downloadUrl
    } else {
      // 导出失败
      ElMessage.error(`导出失败: ${res?.message || '未知错误'}`);
      console.error(`导出失败: ${res?.code}`);
    }
  } catch (error) {
    // 捕获错误
    ElMessage.error("导出过程中发生错误，请重试！");
    console.error("导出数据时出错:", error);
  }
};
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
.footer{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 140px;
}
</style>

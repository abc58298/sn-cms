<template>
    <el-page-header icon="" content="自定义序列号" title="序列号管理系统"></el-page-header>
  <el-form>
    <el-row class="row" :gutter="20">
      <el-col :span="20">
        <el-form-item label="序列号前缀 " prop="username">
          <el-input  autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="row" :gutter="20">
      <el-col :span="8">
        <el-form-item label="是否包含数字 " prop="username" >
          <el-input  autocomplete="off" required/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="特殊符号 " prop="username">
          <el-input  autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="row" :gutter="20">
      <el-col :span="8">
        <el-form-item label="是否包含大写字母 " prop="username">
          <el-select v-model="selectedValue" placeholder="请选择" required>
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
            </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否包含大写字母 " prop="username">
          <el-select v-model="selectedValue" placeholder="请选择" required>
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
            </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-button type="primary">自定义序列号</el-button>
    <el-button >重置</el-button>
</template>

<script setup>
import {ref} from 'vue'
const options = [
  { label: '是', value: 0 },
  { label: '否', value: 1 }
];
//选择的值
const selectedValue=ref("")
</script>
<style scoped>
.row{
  margin-top:30px;
}
.el-button{
  margin-top:60px;
}
</style>

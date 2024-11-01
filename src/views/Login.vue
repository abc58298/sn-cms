<template>
  <div class="login-container">
    <img src="@/assets/login.png" class="login-image" />
    <div class="formContainer">
      <span>序列号管理系统</span>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <div class="tips">
          <text>记住密码</text>
          <text>忘记密码?</text>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
        <div class="tips">
          <text>没有账号?</text>
          <text>注册</text>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const loginFormRef = ref();
const loginForm = reactive({
  username: "",
  password: "",
});

// 自定义校验规则
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value.length < 3 || value.length > 20) {
          callback(new Error("用户名长度应在3到20个字符之间"));
        } else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          callback(new Error("用户名只能包含字母、数字、下划线和破折号"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value.length < 6 || value.length > 20) {
          callback(new Error("密码长度应在6到20个字符之间"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 提交表单
const submitForm = async () => {
  const isValid = await loginFormRef.value.validate();
  if (isValid) {
    try {
      const response = await axios.post('/api/login', {
        username: loginForm.username,
        password: loginForm.password,
      });
      ElMessage.success('登录成功！');
      // 处理登录成功后的逻辑
    } catch (error) {
      ElMessage.error('登录失败，请检查用户名和密码');
      console.error('Login error:', error);
    }
  } else {
    ElMessage.warning('请检查输入的内容');
  }
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100vh;
}
.login-image {
  flex: 1;
  max-width: 50%;
  object-fit: cover;
}
.formContainer {
  flex: 1;
  max-width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(137, 137, 137);
  border: 1px solid #000000;
  span {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .tips {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  .tips span:nth-child(1) {
    font-size: 15px;
    margin-left: 120px;
  }

  .tips span:nth-child(2) {
    color: rgb(153, 205, 235);
    font-size: 15px;
  }

  :deep(.el-form-item__label) {
    color: rgb(137, 137, 137);
  }
}
</style>

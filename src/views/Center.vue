<template>
  <el-page-header icon="" content="基本资料" title="序列号管理系统"></el-page-header>
  <div class="card">
    <div class="tips">请完善以下信息，以便我们更好地为您服务</div>
  </div>

  <span>联系方式</span>
  <el-row class="row" :gutter="50">
    <el-col :span="10">
      <el-form-item label="国家地区:" prop="country" required>
        <el-input autocomplete="off"   />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="街道地址" prop="streetAddress">
        <el-input  autocomplete="off" />
      </el-form-item>
    </el-col>
  </el-row>

  <el-row class="row" :gutter="50">
    <el-col :span="10">
      <el-form-item label="所在地区:" prop="region" required>
        <el-input  autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="联系电话" prop="phoneNumber">
        <el-input  autocomplete="off" placeholder="例如: 87xxxxxxxxxx" />
      </el-form-item>
    </el-col>
  </el-row>

  <el-row class="row" :gutter="70">
    <el-col :span="10"></el-col>
    <el-col :span="8">
      <el-form-item label="传真" prop="fax">
        <el-input  autocomplete="off" placeholder="例如: 021-88888888" />
      </el-form-item>
    </el-col>
  </el-row>

  <span>账号信息</span>
  <el-row class="row" :gutter="60">
    <el-col :span="10">
      <el-form-item label="昵称:" prop="nickname" required>
        <el-input autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="邮箱:" prop="email">
        <el-input  autocomplete="off" placeholder="例如: abc@qq.com" />
      </el-form-item>
    </el-col>
  </el-row>

  <el-row class="row" :gutter="60">
    <el-col :span="10">
      <el-form-item label="密码:" prop="password" required>
        <el-input autocomplete="off" type="password" />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
const imageUrl = ref('');

// 上传成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

// 上传前校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像图片必须为 JPG 格式！');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片大小不能超过 2MB！');
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.card {
  background-color: #e7fafd;
  border: 1px solid #4ad4e9;
  margin-top: 10px;
  margin-bottom: 20px;

  .tips {
    color: #63daec;
    font-size: 15px;
    padding: 5px;
  }
}

span {
  margin-top: 10px;
  color: #a8a8a8;
  font-size: 10px;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d3d3d3;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 30px;
  color: #c0c4cc;
}
</style>

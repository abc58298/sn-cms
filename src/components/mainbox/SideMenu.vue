<template>
  <el-aside :width="store.isCollapsed ? '60px' : '220px'" class="el-aside">
    <el-menu
      :collapse="store.isCollapsed"
      :collapse-transition="false"
      :router="true"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/user" v-admin>
        <el-icon><Avatar /></el-icon>
        <span v-show="!store.isCollapsed">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/sn">
        <el-icon><HomeFilled /></el-icon>
        <span v-show="!store.isCollapsed">序列号管理</span>
      </el-menu-item>
      <el-menu-item index="/sncode">
        <el-icon><HomeFilled /></el-icon>
        <span v-show="!store.isCollapsed">序列号使用记录</span>
      </el-menu-item>
      <el-menu-item index="/history">
        <el-icon><Avatar /></el-icon>
        <span v-show="!store.isCollapsed">历史记录</span>
      </el-menu-item>
      <el-menu-item index="/customize">
        <el-icon><Avatar /></el-icon>
        <span v-show="!store.isCollapsed">自定义序列号</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span v-show="!store.isCollapsed">个人中心</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { HomeFilled, Avatar } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { mystore } from "@/store"
const route = useRoute()
const store = mystore()
//权限管理
const vAdmin = {
    mounted(el){
        //权限管理
        if(store.user.role!==2){
            el.parentNode.removeChild(el)
        }
    }
}
</script>

<style lang="scss">
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100vh;
    --el-menu-bg-color: #1d3042;       // 背景色
    --el-menu-text-color: #ffffff;     // 文字颜色
    --el-menu-active-color: #409eff;   // 活动菜单项的文字颜色

    .el-menu-item {
      &:hover {
        background-color: #2d3c50;  // 悬停背景色
      }
    }
  }
}
</style>

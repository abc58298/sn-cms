<template>
  <el-header class="el-header">
    <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu />
            </el-icon>
            <span style="margin-left:10px;">序列号管理系统</span>
        </div>
    <div class="right">
        <!-- <span style="line-height:40px;">欢迎{{store.user.username}}回来</span> -->
        <span style="line-height:40px;">欢迎张俊熙回来</span>
        <el-dropdown>
    <el-avatar :size="40" src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item>{{roleName}}</el-dropdown-item> -->
        <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
// //引入仓库保存折叠状态
import { useRouter } from "vue-router"
import { mystore } from "@/store"
//  import {userRouterStore} from '../../store/userRouterStore'
 import { Menu} from "@element-plus/icons-vue";
 const router = useRouter()
const store=mystore()
 //解决菜单折叠问题
 const handleCollapsed = () => {
   store.changeCollapsed()
};
 const handleExit=()=>{
  //清空token
   localStorage.removeItem("token")
   store.changeUser({})
   //跳转页面
   router.push("/login")
 }

</script>
<style lang="scss" scoped>
.el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    color:#000000;
}

</style>

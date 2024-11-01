import { defineStore } from 'pinia'
export const mystore = defineStore('mystore', {
  state: () => ({
    user: {
      role: 1
    }, //用户信息
    isCollapsed: false, //菜单栏是否折叠
    routerInitialized: false // 路由状态
  }),
  actions: {
    // 控制侧边栏的展开
    changeCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    //更新角色
    changeUser(newUser) {
      this.user = newUser
    },
    //更新路由状态
    changeRouter(value) {
      this.routerInitialized = value
    }
  },
  persist: {
    paths: ['isCollapsed', 'user'] // 控制是否持久化
  }
})

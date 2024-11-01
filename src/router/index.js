import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Mainbox from '@/views/Mainbox.vue'
import { mystore } from '@/store' // 引入 store
import RoutesConfig from './config'
import NotFound from '@/components/NotFound/NotFound.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: Mainbox,
    children: [
      {
        path: '/sn',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Sn.vue')
      },
      {
        path: '/sncode',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Sncode.vue')
      },
      {
        path: '/history',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/History.vue')
      },
      {
        path: '/customize',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Customize.vue')
      },
      {
        path: '/Center',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Center.vue')
      },
      {
        path: '/user',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/User.vue'),
        meta: { requireAdmin: true } // 设置需要管理员权限的路由
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// 每次路由跳转之前的守卫
router.beforeEach((to, from, next) => {
  const store = mystore() // 获取 store 实例

  // 无需权限的页面允许访问
  if (to.name === 'login') {
    next()
  } else {
    // 用户未登录则重定向到 login 页面
    if (!localStorage.getItem('token')) {
      next({ path: '/login' })
    } else {
      // 检查管理员权限
      if (to.meta.requireAdmin && store.user.role !== 2) {
        next({ path: '/mainbox' }) // 若无权限重定向到主页面
      } else {
        // 动态加载路由
        if (!store.routerInitialized) {
          ConfigRouter(store)
        }
        next() // 放行至目标页面
      }
    }
  }
})

// 动态配置路由
const ConfigRouter = (store) => {
  if (!router.hasRoute('mainbox')) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: Mainbox
    })
  }

  RoutesConfig.forEach((item) => {
    if (checkPermission(item, store)) {
      router.addRoute('mainbox', item)
    }
  })

  // 默认重定向到 login
  router.addRoute('mainbox', {
    path: '/',
    redirect: '/login'
  })

  // 404 匹配
  router.addRoute('mainbox', {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: NotFound
  })

  store.changeRouter(true) // 标记路由已加载
}

// 检查权限
const checkPermission = (item, store) => {
  if (item.meta && item.meta.requireAdmin) {
    return store.user && store.user.role === 2 // 确保管理员访问
  }
  return true
}

export default router

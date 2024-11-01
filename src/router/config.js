const routes = [
  {
    path: '/sn',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Sn.vue')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "home" */ '@/views/User.vue')
  },
  {
    path: '/history',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/History.vue')
  },
  {
    path: '/customize',
    requireAdmin: true,
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Customize.vue')
  },
  {
    path: '/Center',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Center.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(
        /* webpackChunkName: "home" */ '@/components/NotFound/NotFound.vue'
      )
  }
]
export default routes

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Logger.vue'
import HelloPage from '../views/HelloPage.vue'
import UserList from '../views/UserList.vue'
import MyInfo from '../views/MyInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        // 欢迎页
        path: '/index',
        name: 'Index',
        component: HelloPage,
        meta: {
          title: '欢迎页'
        }
      },
      {
        // 用户列表页
        path: '/userList',
        name: 'UserList',
        component: UserList,
        meta: {
          title: '用户列表'
        },
        beforeEnter (to, from, next) {
          if (to.path === '/userlist' && Vue.prototype.GLOBAL.getUser().type === 1) {
            next()
          } else {
            next(false)
          }
        }
      },
      {
        // 个人信息页
        path: '/myInfo',
        name: 'MyInfo',
        component: MyInfo,
        meta: {
          title: '个人信息'
        }
      },
      {
        path: '*',
        redirect: '/index'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截  判断用户是否登录
// 判断本地是否存在用户信息是否存在 ？ 进行正常操作 ：重定向到登录页
router.beforeEach((to, from, next) => {
  const userType = Vue.prototype.GLOBAL.getUser().type
  if (to.path === '/login') {
    next()
  } else {
    if (!userType) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
})

export default router

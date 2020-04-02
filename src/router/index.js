import Vue from 'vue'
import VueRouter from 'vue-router'
// import { getCookie } from '../utils/cookie'

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
/*
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (!getCookie('userCookie')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
})
*/
export default router

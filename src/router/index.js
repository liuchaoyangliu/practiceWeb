/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
import NotFound from '@/components/404.vue'

import Home from '@/views/home.vue'
import HomePage from '@/views/homePage/homePage.vue'
import Institutions from '@/views/institutions/institutions.vue'
import Personnel from '@/views/personnel/personnel.vue'
import Attendance from '@/views/attendance/attendance.vue'
import SystemLog from '@/views/systemLog/systemLog.vue'
import Recruitment from '@/views/recruitment/recruitment.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/homePage',
      component: Home,
      children: [
        {
          path: '/homePage',
          name: '首页',
          components: {
            default: HomePage,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/personnel/personnel',
          name: '人员管理',
          components: {
            default: Personnel,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/systemLog/systemLog',
          name: '系统日志',
          components: {
            default: SystemLog,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/recruitment/recruitment',
          name: '招聘管理',
          components: {
            default: Recruitment,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/institutions/institutions',
          name: '机构管理',
          components: {
            default: Institutions,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/attendance/attendance',
          name: '考勤管理',
          components: {
            default: Attendance,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        }
      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router

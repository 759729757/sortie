import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index'
import News from '@/pages/news'
import About from '@/pages/about'
import NotFound from '@/pages/notFound'
import wxPay from '@/pages/wx/pay'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/pay',
      name: 'pay',
      component: wxPay
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },


    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    }
  ]
})


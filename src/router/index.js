import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index'
import News from '@/pages/news'
import Search from '@/pages/search'
import NewsDetail from '@/pages/newsDetail'
import About from '@/pages/about'
import NotFound from '@/pages/notFound'
import wxPay from '@/pages/wx/pay'
import Shop from '@/pages/shop'
import Magazine from '@/pages/magazine'

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
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/magazine',
      name: 'Magazine',
      component: Magazine
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: NewsDetail
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/store',
      name: 'Shop',
      component: Shop
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


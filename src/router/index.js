import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index'
import News from '@/pages/news'
import About from '@/pages/about'
import NotFound from '@/pages/notFound'

Vue.use(Router)

export default new Router({
  routes: [
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


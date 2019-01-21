import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '@/views/content'

Vue.use(VueRouter)

export default new VueRouter({
  // base: '/app/',
  routes: [
    {
      // Gallery with optionnal category name
      path: '/gallery/:category?',
      component: Content
    },
    {
      path: '*',
      redirect: '/gallery/travel'
    }
  ]
})

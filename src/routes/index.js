import Vue from 'vue'
import VueRouter from 'vue-router'
import Gallery from '@/views/gallery'

Vue.use(VueRouter)

export default new VueRouter({
  // base: '/app/',
  routes: [
    {
      // Gallery with optionnal category name
      path: '/gallery/:category?',
      component: Gallery
    },
    {
      path: '*',
      redirect: '/gallery'
    }
  ]
})

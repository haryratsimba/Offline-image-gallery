import Vue from 'vue'

import App from './views/app'

import router from './routes'

window.onload = () => {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router
  })
}

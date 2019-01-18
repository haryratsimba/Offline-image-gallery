import Vue from 'vue'

import App from './views/app'

window.onload = () => {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
}

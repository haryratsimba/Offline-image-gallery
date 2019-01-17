import Vue from 'vue';

import App from './views/app';

window.onload = ()=> {
    new Vue({
        el: '#app',
        components: { App },
        template: '<App/>'
    })
}

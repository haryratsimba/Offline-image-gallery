import Vue from "vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
        <img src="https://splashbase.s3.amazonaws.com/unsplash/regular/tumblr_mnh0n9pHJW1st5lhmo1_1280.jpg"></img>
    </div>`,
    data: {
        name: "World"
    },
    mounted() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/src/service-worker/sw.js');
        }
    }
});
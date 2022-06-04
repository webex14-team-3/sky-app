import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"

createApp(App).use(router).mount("#app")

// 6月3日test
import Vue from "vue"
// import VueHead from "vue-head"
// import BootstrapVue from "bootstrap-vue"
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
// import firebase from "firebase/app"
import "firebase/auth"

// Vue.use(BootstrapVue)
// Vue.use(VueHead)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")

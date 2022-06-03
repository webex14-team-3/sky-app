import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"

createApp(App).use(router).mount("#app")

// test
import Vue from "vue"
import "bootstrap/dist/css/bootstrap.css"
import "firebase/auth"

Vue.config.productionTip = false

// 1.Firebase側の設定のウェブ設定で表示したコードをコピペする

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")

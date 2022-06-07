import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"

createApp(App).use(router).mount("#app")

// 6月3日test
// import "firebase/auth"

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app")

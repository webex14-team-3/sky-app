import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart)

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app")

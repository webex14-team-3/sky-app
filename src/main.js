import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faHeart)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app")

createApp(App).use(router).mount("#app")

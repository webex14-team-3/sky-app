import { createRouter, createWebHistory } from "vue-router"
// {}は、インポートする際、export defaultだと不必要。exportのみの場合は必要。
// ※defaultの有無の違いは、export default ○○の○○のままインポートできる(名前を変える必要がない)。
//                         export ○○の○○を変更することができる {}の中で好きなような名前に出来る。
// ex ファイルをexportする際に{}が必要になる場合がある。
import HomeScreen from "@/views/HomeScreen.vue"
import MemoFormat from "@/views/MemoFormat.vue"
import MyAccount from "@/views/MyAccount.vue"
import AboutView from "@/views/AboutView.vue"

const routes = [
  {
    path: "/",
    name: "HomeScreen",
    component: HomeScreen,
  },
  {
    path: "/memoFormat",
    name: "MemoFormat",
    component: MemoFormat,
  },
  {
    path: "/myAccount",
    name: "MyAccount",
    component: MyAccount,
  },
  {
    path: "/aboutView",
    name: "AboutView",
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

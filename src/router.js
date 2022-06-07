import { createRouter, createWebHistory } from "vue-router"
// {}は、インポートする際、export defaultだと不必要。exportのみの場合は必要。
// ※defaultの有無の違いは、export default ○○の○○のままインポートできる(名前を変える必要がない)。
//                         export ○○の○○を変更することができる {}の中で好きなような名前に出来る。
// ex ファイルをexportする際に{}が必要になる場合がある。
import Login from "./views/Login.vue"
import HomeScreen from "./views/HomeScreen.vue"

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "HomeScreen",
    component: HomeScreen,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 未認証の場合はログイン画面へ
// router.beforeResolve((to, from, next) => {
//   console.log(to)
//   if (to.path == "/") {
//     next()
//   } else {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         console.log("認証中")
//         next()
//       } else {
//         console.log("未認証")
//         next({ path: "/" })
//       }
//     })
//   }
// })

export default router

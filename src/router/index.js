import { createRouter, createWebHistory } from "vue-router"
import HomeScreen from "@/views/HomeScreen.vue"
import MemoFormat from "@/views/MemoFormat.vue"
import MyAccount from "@/views/MyAccount.vue"
import ProfilePage from "@/views/ProfilePage.vue"

const routes = [
  {
    path: "/",
    name: "HomeScreen",
    component: HomeScreen,
  },
  {
    path: "/MemoFormat",
    name: "MemoFormat",
    component: MemoFormat,
  },
  {
    path: "/MyAccount",
    name: "MyAccount",
    component: MyAccount,
  },
  {
    path: "/ProfilePage",
    name: "ProfilePage",
    component: ProfilePage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

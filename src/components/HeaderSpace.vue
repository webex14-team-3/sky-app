<template>
  <div class="allContainer">
    <div class="baseContainer">
      <router-link to="/" class="navLogo navLink" style="text-decoration: none"
        ><a class="container">TopPage</a></router-link
      >
      <div class="navItems">
        <router-link
          to="/myAccount"
          class="navItem navLink"
          style="text-decoration: none"
          ><a class="container">MyPage</a></router-link
        >
        <router-link
          to="/aboutView"
          class="navItem navLink"
          style="text-decoration: none"
          ><a class="container">Profile</a></router-link
        >
      </div>
      <button class="loginButton" @click="googleLogin">
        <a class="container" v-if="loginName">Login</a>
        <a class="container" v-else>Logout</a>
      </button>
    </div>
  </div>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      loginName: true,
    }
  },
  methods: {
    googleLogin() {
      if (this.loginName === true) {
        // new"ネームプレート" provider "インスタンス"
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result.user)
            this.$store.commit("updateUserInfo", { uid: result.user.uid })
            this.$store.commit("updateUserName", {
              name: result.user.displayName,
            })
            this.$store.commit("updateUserImage", {
              image: result.user.photoURL,
            })
            console.log(this.$store.state.user.uid)
            console.log(this.$store.state.name.name)
            console.log(this.$store.state.image.image)
            return result.user.uid
          })
          .then(async (uid) => {
            // {}入れないとデータベースに入る形での登録はできない
            // ※今まではauthの認証で入ってただけ
            await setDoc(doc(db, "users", `${uid}`), {}, { merge: true })
            this.loginName = false
          })
        // this.$router.push({
        //   path: "/aboutView",
        // })
      } else {
        this.loginName = true
      }
    },
  },
}
</script>

<style scoped>
.allContainer {
  /* border: 2px solid red; */
  height: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #c7887fdd;
  display: flex;
  justify-content: flex-end;
  margin: -9px;
}
.baseContainer {
  /* border: 2px solid blue; */
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.navLogo {
  /* border: 2px solid yellow; */
  background-color: rgba(255, 235, 205, 0.747);
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.topPage {
  color: black;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
}
.navItems {
  /* border: 2px solid black; */
  display: flex;
  align-items: center;
  min-width: 40%;
}
.navItem {
  /* border: 2px solid black; */
  width: 100%;
  background-color: rgba(255, 235, 205, 0.747);
  display: flex;
  align-content: center;
  justify-content: center;
}
.container {
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
  padding: 0px 5px;
  text-decoration-line: none;
}
.navLink {
  /* border: 2px solid green; */
  height: 100%;
  border-right: 5px solid #df5f5f;
}
.navLink:hover {
  cursor: pointer;
  background-color: #fccb90;
}
.loginButton {
  border: 2px solid #c7887fdd;
  background-color: rgba(255, 235, 205, 0.747);
  width: 20%;
}
.loginButton:hover {
  cursor: pointer;
  background-color: #fccb90;
}
</style>

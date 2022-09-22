<template>
  <div class="allContainer">
    <header class="baseContainer">
      <div class="LinkContainer">
        <router-link to="/" class="navItem">TopPage </router-link>
        <router-link to="/MyAccount" class="navItem"> MyPage</router-link>
        <router-link to="/ProfilePage" class="navItem">Profile</router-link>
      </div>
      <div class="loginButton" @click="googleLogin">
        <a class="container" v-if="isAuth">Login</a>
        <a class="container" v-else>Logout</a>
      </div>
    </header>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  // deleteUser,
  // updateDoc,
} from "firebase/auth"
import {
  setDoc,
  doc,
  // collection,
  // addDoc,
  // updateDoc,
  // deleteField,
  getDoc,
  // getDocs,
  // query,
  // where,
} from "firebase/firestore"
import { db } from "@/firebase.js"

export default {
  name: "headerNav",
  data() {
    return {
      isAuth: true,
    }
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuth = false
        console.log(user.emailVerified ? "済" : "未")
      } else {
        this.isAuth = true
      }
    })
  },
  methods: {
    googleLogin() {
      if (this.isAuth === true) {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            credential.accessToken
            result.user
            onAuthStateChanged(auth, async (user) => {
              // 初めてログインするとき
              if (user !== null) {
                const user = auth.currentUser
                const displayName = user.displayName
                const email = user.email
                const photoURL = user.photoURL
                const firstTime = user.metadata.creationTime
                const lastTime = user.metadata.lastSignInTime
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                // 初めてアカウントを入れ込んだ時
                if (!docSnap.exists()) {
                  await setDoc(doc(db, "users", user.uid), {
                    userName: displayName,
                    userEmail: email,
                    userImg: photoURL,
                    createTime: firstTime,
                    lastCreateTime: lastTime,
                  })
                  console.log("Header:firebaseに初めてユーザー情報を入れ込んだ")
                  // 過去にログインをしていた場合
                } else {
                  console.log("Header:過去にログインしていた場合の処理")
                  const docRef = doc(db, "users", user.uid)
                  const docSnap = await getDoc(docRef)
                  console.log(docSnap)
                }
                this.isAuth = false
              } else {
                console.log("ユーザーなし")
              }
            })
            this.isAuth = false
            console.log("ログインしました")
            this.$router.push("/ProfilePage")
          })
          .catch((error) => {
            GoogleAuthProvider.credentialFromError(error)
            console.log(error)
          })
      } else {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            this.$router.push("/")
            console.log("ログアウトしました")
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          })
        this.isAuth = true
      }
    },
  },
}
</script>

<style scoped>
/* background-color: rgba(255, 235, 205, 0.747); */
/* background-color: #fccb90; */
/* border-right: 5px solid #df5f5f; */
.allContainer {
  border: 2px solid red;
  height: 60px;
  margin: -9px;
}
.baseContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.LinkContainer {
  list-style-type: none;
}
</style>

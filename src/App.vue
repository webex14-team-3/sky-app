<template>
  <div class="header">
    <div class="allContainer">
      <div class="baseContainer">
        <router-link
          to="/"
          class="navLogo navLink"
          style="text-decoration: none"
          ><a class="container">TopPage</a>
        </router-link>
        <div class="navItems">
          <router-link
            to="/MyAccount"
            class="navItem navLink"
            style="text-decoration: none"
            ><a class="container">MyPage</a>
          </router-link>
          <router-link
            to="/ProfilePage"
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
  </div>
  <div class="contents">
    <router-view />
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import {
  setDoc,
  doc,
  collection,
  // addDoc,
  // updateDoc,
  // deleteField,
  // getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "./firebase"

export default {
  components: {
    // PostedMemo,
  },
  data() {
    return {
      loginName: true,
    }
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = auth.currentUser
        const displayName = user.displayName
        const email = user.email
        const photoURL = user.photoURL
        const course = user.course
        await setDoc(doc(db, "users", user.uid), {
          userName: displayName,
          userEmail: email,
          userImage: photoURL,
          userCourse: course,
        })

        const q = query(
          collection(db, "userComments"),
          where("userEmail", "==", email)
        )
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // this.comments.push({ text: doc.data().text })
          console.log({ text: doc.data().text })
        })
      } else {
        console.log("ユーザーなし")
      }
    })
  },
  methods: {
    googleLogin() {
      if (this.loginName === true) {
        console.log("test")
        const provider = new GoogleAuthProvider()
        provider.addScope("")
        const auth = getAuth()
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            credential.accessToken
            result.user
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                const user = auth.currentUser
                const displayName = user.displayName
                const email = user.email
                const photoURL = user.photoURL
                const course = user.course
                await setDoc(doc(db, "users", user.uid), {
                  userName: displayName,
                  userEmail: email,
                  userImage: photoURL,
                  userCourse: course,
                })
                this.loginName = false

                // const q = query(
                //   collection(db, "userComments"),
                //   where("userEmail", "==", email)
                // )
                // const querySnapshot = await getDocs(q)
                // console.log(querySnapshot)
                // querySnapshot.forEach((doc) => {
                //   this.comments.push({ text: doc.data().text })
                // })
              } else {
                console.log("ユーザーなし")
              }
            })
            this.loginName = false
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
            console.log("ログアウトしました")
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          })
        this.loginName = true
      }
    },
  },
}
</script>

<style scoped>
.contents {
  margin-top: 10px;
}
.header {
  margin: 0px;
  padding: 0px;
}
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
  border: none;
  background-color: rgba(255, 235, 205, 0.747);
  width: 20%;
}

.loginButton:hover {
  cursor: pointer;
  background-color: #fccb90;
}
</style>

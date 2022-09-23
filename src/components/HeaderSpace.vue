<template>
  <div class="allContainer">
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <header class="LinkContainer">
      <div class="TopPageNav" @click="topPageBtn">
        <div class="navItem">
          <p class="navItemName">TopPage</p>
        </div>
      </div>
      <div
        class="MyPageNav"
        @click="MyPageBtn"
        @mouseover="MypageMouseOverAction"
        @mouseleave="MypageMouseLeaveAction"
      >
        <div class="navItem">
          <p class="navItemName" v-if="hoverMypage">{{ message.mypage }}</p>
          <p v-else class="navItemName PleaseLog">Please Login</p>
        </div>
      </div>
      <div
        class="ProfileNav"
        @click="ProfilePageBtn"
        @mouseover="ProfileMouseOverAction"
        @mouseleave="ProfileMouseLeaveAction"
      >
        <div class="navItem">
          <p class="navItemName" v-if="hoverProfile">
            {{ message.profile }}
          </p>
          <p v-else class="navItemName PleaseLog">Please Login</p>
        </div>
      </div>
      <div class="LoginNav" @click="googleLogin">
        <div class="navItem">
          <a class="navItemName" v-if="isAuth">Login</a>
          <a class="navItemName" v-else>Logout</a>
        </div>
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
  name: "HeaderPosition",
  data() {
    return {
      isAuth: true,
      hoverMypage: true,
      hoverProfile: true,
      message: { mypage: "MyPage", profile: "Profile" },
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
                  // const docRef = doc(db, "users", user.uid)
                  // const docSnap = await getDoc(docRef)
                  // console.log(docSnap)
                }
                this.isAuth = false
              }
            })
            this.isAuth = false
            // console.log("ログインしました")
            this.$router.push("/ProfilePage")
          })
          .catch((error) => {
            GoogleAuthProvider.credentialFromError(error)
            console.log(error)
          })
      } else {
        if (window.confirm("ログアウトしますか？")) {
          const auth = getAuth()
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              this.$router.push("/")
              console.log("ログアウトしました")
              this.hoverMypage = true
              this.hoverProfile = true
            })
            .catch((error) => {
              // An error happened.
              console.log(error)
            })
          this.isAuth = true
        }
      }
    },
    topPageBtn() {
      this.$router.push("/")
    },
    MyPageBtn() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push("/MyAccount")
        }
      })
    },
    ProfilePageBtn() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push("/ProfilePage")
        }
      })
    },
    MypageMouseOverAction() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.hoverMypage = false
        }
      })
    },
    MypageMouseLeaveAction() {
      this.hoverMypage = true
    },
    ProfileMouseOverAction() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.hoverProfile = false
        }
      })
    },
    ProfileMouseLeaveAction() {
      this.hoverProfile = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_reset.scss";
$main-bgColor: rgba(255, 235, 205, 0.747);
$hover-color: brightness(90%);
%hoverEffect {
  filter: $hover-color;
  text-decoration: underline;
  text-decoration-color: rgb(255, 123, 0) !important;
  text-decoration-thickness: 5px;
  text-underline-offset: 5px;
}

.allContainer {
  // border: 2px solid blue;
  border-bottom: 4px solid #c7887fdd;
  width: 100%;
  height: 60px;
  user-select: none;

  .LinkContainer {
    /* border: 2px solid red; */
    height: 100%;
    display: flex;
    align-items: center;
    list-style-type: none;

    .TopPageNav {
      // border: 2px solid yellow;
      width: 50%;
      display: flex;
      align-content: center;
      justify-content: center;
      border-right: 4px solid #c7887fdd;
      height: 100%;
      background-color: $main-bgColor;
      cursor: pointer;

      &:hover {
        @extend %hoverEffect;
      }
    }

    .MyPageNav {
      display: flex;
      align-content: center;
      justify-content: center;
      border-right: 4px solid #c7887fdd;
      height: 100%;
      width: 20%;
      background-color: $main-bgColor;
      cursor: pointer;

      &:hover {
        @extend %hoverEffect;
      }
    }

    .ProfileNav {
      /* border: 2px solid red; */
      width: 20%;
      display: flex;
      align-content: center;
      justify-content: center;
      border-right: 4px solid #c7887fdd;
      height: 100%;
      background-color: $main-bgColor;
      cursor: pointer;

      &:hover {
        @extend %hoverEffect;
      }
    }

    .navItem {
      /* border: 2px solid black; */
      display: flex;
      align-items: center;
    }

    .navItemName {
      font-weight: bold;
      font-size: 1.3em;
    }

    .PleaseLog {
      color: rgb(255, 0, 119);
    }
  }
}
.LoginNav {
  /* border: 2px solid red; */
  width: 10%;
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
  background-color: $main-bgColor;
  cursor: pointer;

  &:hover {
    @extend %hoverEffect;
  }
}
</style>

<template>
  <div class="allContainer">
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <header class="linkContainer">
      <div class="topPageNav" @click="topPageBtn">
        <div class="navItem">
          <p class="navItemName">TopPage</p>
        </div>
      </div>
      <div
        class="myPageNav"
        @click="MyPageBtn"
        @mouseover="MypageMouseOverAction"
        @mouseleave="MypageMouseLeaveAction"
      >
        <div class="navItem">
          <p class="navItemName" v-if="hoverMypage">{{ message.mypage }}</p>
          <p v-else class="navItemName pleaseLog">Please Login</p>
        </div>
      </div>
      <div
        class="profileNav"
        @click="ProfilePageBtn"
        @mouseover="ProfileMouseOverAction"
        @mouseleave="ProfileMouseLeaveAction"
      >
        <div class="navItem">
          <p class="navItemName" v-if="hoverProfile">
            {{ message.profile }}
          </p>
          <p v-else class="navItemName pleaseLog">Please Login</p>
        </div>
      </div>
      <div class="loginNav" @click="googleLogin">
        <div class="navItem">
          <a class="navItemName loginName" v-if="isAuth">Login</a>
          <a class="navItemName loginName" v-else>Logout</a>
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
} from "firebase/auth"
import { setDoc, doc, getDoc } from "firebase/firestore"
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
                    likePostCount: 0,
                  })
                  // 過去にログインをしていた場合
                }
                this.isAuth = false
              }
            })
            this.isAuth = false
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
              this.hoverMypage = true
              this.hoverProfile = true
            })
            .catch((error) => {
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
@import "@/assets/styles/_reset.scss";
$main-bgColor: rgba(255, 206, 160, 0.89);
$hover-color: brightness(90%);
%hoverEffect {
  filter: $hover-color;
  text-decoration: underline;
  text-decoration-color: rgb(255, 123, 0) !important;
  text-decoration-thickness: 5px;
  text-underline-offset: 5px;
}

.allContainer {
  border-bottom: 4px solid #c7887fdd;
  width: 100%;
  height: 60px;
  user-select: none;

  .linkContainer {
    height: 100%;
    display: flex;
    align-items: center;
    list-style-type: none;

    .topPageNav {
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

    .myPageNav {
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

    .profileNav {
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
      display: flex;
      align-items: center;
    }

    .navItemName {
      font-weight: bold;
      font-size: 1.3rem;
    }

    .pleaseLog {
      color: rgb(255, 0, 119);
    }
  }

  .loginNav {
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
}
</style>

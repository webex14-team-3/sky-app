<template>
  <header class="container">
    <div class="headerleft">
      <!-- ナビゲーションパート start -->
      <nav class="hamburger-menu">
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn">
          <div class="menu-icon-wide">
            <span class="nav-icon"></span>
          </div>
        </label>
        <!-- 見出し -->
        <ul class="header-menu" v-on:click="liButton">
          <li class="header-munu-one">
            <router-link to="/">
              <span class="menu-text" id="menu-text-one"
                >トップページ</span
              ></router-link
            >
          </li>
          <li>
            <router-link to="myAccount">
              <span class="menu-text" id="menu-text-two"
                >マイページ</span
              ></router-link
            >
          </li>
          <li>
            <router-link to="aboutView">
              <span class="menu-text" id="menu-text-three"
                >プロフィール設定</span
              ></router-link
            >
          </li>
        </ul>
      </nav>
      <!-- ナビゲーションパート end -->

      <!-- テキストパート start -->
      <div class="header-title">GeekSalon</div>
      <!-- テキストパート end -->
    </div>

    <!-- ログインパート start -->
    <button class="login-button" @click="googleLogin"><a>ログイン</a></button>
    <!-- ログインパート end -->
  </header>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  methods: {
    googleLogin() {
      // new"ネームプレート" provider "インスタンス"
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .then((result) => {
          this.$store.commit("updateUserInfo", { uid: result.user.uid })
          console.log(this.$store.state.user.uid)
          return result.user.uid
        })
        .then(async (uid) => {
          // {}入れないとデータベースに入る形での登録はできない
          // ※今まではauthの認証で入ってただけ
          await setDoc(doc(db, "users", `${uid}`), {})
        })
    },
  },
}
</script>

<style scoped>
.container {
  background-color: #c7887fdd;
  display: flex;
  justify-content: space-between;
  margin: -9px;
}
.headerleft {
  display: flex;
}

/* ナビゲーションパート start */

.hamburger-menu {
  /* border: 2px solid red; */

  margin-right: 8px;
}
/* メニューアイコン（三本線）の真ん中の線です */
.hamburger-menu .menu-icon .nav-icon {
  background: #ffc107; /* 色は自由に変更可能です */
  display: block;
  height: 8px; /* 太さ */
  position: relative;
  top: 20px;
  -webkit-transition: background 0.4s ease-out;
  -o-transition: background 0.4s ease-out;
  /* 形が変わる時のアニメーション */
  transition: background 0.4 ease-out;
  margin: 12px 0 0 12px;
  z-index: 20;
}
.menu-icon-wide {
  /* border: 2px solid red; */
  height: 70px;
  width: 80px;
  padding-right: 10px;
  position: fixed;
  z-index: 11;
}
/* メニューアイコン（三本線）の上と下の線を疑似要素で追加 */
.hamburger-menu .menu-icon .nav-icon::before,
.hamburger-menu .menu-icon .nav-icon::after {
  background: #ffc107; /* 色は自由に変更可能です */
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  -webkit-\aboutviewtransition: all 0.4s ease-out;
  -o-transition: all 0.4s ease-out;
  /* 形が変わる時のアニメーション */
  transition: all 0.4s ease-out;
  width: 100%;
  z-index: 20;
}
.hamburger-menu .menu-icon .nav-icon::before {
  top: -20px;
} /* 位置を上にずらしています */
.hamburger-menu .menu-icon .nav-icon::after {
  top: 20px;
} /* 位置を下にずらしています */
/* 表示されるメニューです */
.header-menu {
  z-index: 10;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  max-height: 0; /* ★最初は高さを0にして非表示状態に */
  -webkit-transition: max-height 0.6s;
  -o-transition: max-height 0.6s;
  transition: max-height 0.6s;
  text-align: center;
  list-style: none;
  width: 100%;
  height: 100vh;
  position: fixed;
}
.header-menu span {
  user-select: none;
}
/* メニュー部分のデザインです */

.hamburger-menu .header-menu li a {
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  margin: 50px 0 0 0;
  padding: 40px;
  /* border: 2px solid red; */
}
.hamburger-menu .header-menu li a:hover {
  background-color: #f1f1f1b1;
  filter: brightness(90%);
}
.hamburger-menu .header-menu li:active {
}
/* チェックボックスは常に非表示です */
.hamburger-menu .menu-btn {
  display: none;
}
/* ▼▼▼以下はチェックボックスがONの時の状態です▼▼▼ */
.hamburger-menu .menu-btn:checked ~ .header-menu {
  max-height: 100vh;
  transition: max-height 0.6s;
}
/* メニューボタンの中央の線を非表示に */
.hamburger-menu .menu-btn:checked ~ .menu-icon .nav-icon {
  background: transparent;
  transition: all 300ms linear 0ms;
}

/* メニューボタンの上下の線を45度傾けて✕印を作ります */
.hamburger-menu .menu-btn:checked ~ .menu-icon .nav-icon::before {
  transform: rotate(-45deg);
  top: 30px;
}
.hamburger-menu .menu-btn:checked ~ .menu-icon .nav-icon::after {
  transform: rotate(45deg);
  top: 30px;
}
.menu-text {
  background-image: linear-gradient(135deg, #fccb90 0%, #d57eeb 100%);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 2px solid #d57eeb;
  /* border: 2px solid red; */
}
.header-munu-one {
  /* border: 2px solid red; */
  margin-top: 90px;
}
.hamburger-menu-login:hover {
  cursor: pointer;
}

/* ナビゲーションパート end */

/* テキストパート start */
.header-title {
  font-size: 50px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding: 15px 90px 0;
  user-select: none;
}
/* テキストパート end */

/* ログインパート start */
.login-button {
  border: 2px solid #c7887fdd;
  background-color: rgba(255, 235, 205, 0.747);
  color: black;
  font-weight: bold;
  font-size: 20px;
}
.login-button a {
  user-select: none;
}
.login-button:hover {
  cursor: pointer;
  background-color: #fccb90;
}
/* ログインパート end */
</style>

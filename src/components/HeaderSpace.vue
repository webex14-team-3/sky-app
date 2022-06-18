<template>
  <header class="container">
    <div class="headerleft">
      <!-- ナビゲーションパート start -->
      <nav class="hamburger-menu">
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn">
          <span class="nav-icon"></span>
        </label>
        <!-- 見出し -->
        <ul class="header-menu">
          <li class="hamburger-menu-login" @click="googleLogin">
            <span class="menu-text" id="menu-text-one">ログイン</span>
          </li>
          <li>
            <span class="menu-text" id="menu-text-two">menu2</span>
          </li>
          <li>
            <span class="menu-text" id="menu-text-three">menu3</span>
          </li>
        </ul>
      </nav>
      <!-- ナビゲーションパート end -->

      <!-- テキストパート start -->
      <div class="header-title">GeekSalon</div>
      <!-- テキストパート end -->
    </div>

    <!-- ログインパート start -->
    <button class="login-button" @click="googleLogin">ログイン</button>
    <!-- ログインパート end -->
  </header>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

export default {
  methods: {
    googleLogin() {
      // new"ネームプレート" provider "インスタンス"
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, provider).then((result) => {
        this.$store.commit("updateUserInfo", { uid: result.user.uid })
        console.log(this.$store.state.user.uid)
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
}
.headerleft {
  display: flex;
}

/* ナビゲーションパート start */

/* メニューアイコン（三本線）の真ん中の線です */
.hamburger-menu .menu-icon .nav-icon {
  background: #ffc107; /* 色は自由に変更可能です */
  display: block;
  height: 8px; /* 太さ */
  width: 65px; /* 長さ */
  position: relative;
  transition: background 0.4s ease-out; /* 形が変わる時のアニメーション */
  margin: 12px 0 0 12px;
}
/* メニューアイコン（三本線）の上と下の線を疑似要素で追加 */
.hamburger-menu .menu-icon .nav-icon::before,
.hamburger-menu .menu-icon .nav-icon::after {
  background: #ffc107; /* 色は自由に変更可能です */
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.4s ease-out; /* 形が変わる時のアニメーション */
  width: 100%;
}
.hamburger-menu .menu-icon .nav-icon::before {
  top: 20px;
} /* 位置を上にずらしています */
.hamburger-menu .menu-icon .nav-icon::after {
  top: 40px;
} /* 位置を下にずらしています */
/* 表示されるメニューです */
.header-menu {
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  max-height: 0; /* ★最初は高さを0にして非表示状態に */
  transition: max-height 0.6s; /* 表示されるときのアニメーション */
  text-align: center;
  list-style: none;
  padding: 0;
  margin-left: 80px;
  width: 100%;
}
/* メニュー部分のデザインです */

.hamburger-menu .header-menu li a {
  display: block;
  padding: 24px 20px;
  text-decoration: none;
  text-transform: uppercase;
}
.hamburger-menu .header-menu li a:hover {
  background-color: #f1f1f1b1;
}
/* チェックボックスは常に非表示です */
.hamburger-menu .menu-btn {
  display: none;
}
/* ▼▼▼以下はチェックボックスがONの時の状態です▼▼▼ */
.hamburger-menu .menu-btn:checked ~ .header-menu {
  max-height: 338px; /* ★チェックボックスがオンの時高さを338pxにして表示させます */
  transition: max-height 0.6s;
}
/* メニューボタンの中央の線を非表示に */
.hamburger-menu .menu-btn:checked ~ .menu-icon .nav-icon {
  background: transparent;
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
}

.hamburger-menu-login:hover {
  cursor: pointer;
}
/* ナビゲーションパート end */

/* テキストパート start */
.header-title {
  font-size: 50px;
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
.login-button:hover {
  cursor: pointer;
  background-color: #fccb90;
}
/* ログインパート end */
</style>

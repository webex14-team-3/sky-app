<template>
  <body>
    <header>
      <div class="header-all">
        <!-- ナビゲーションパート 始まり -->
        <section class="nav">
          <nav class="gMenu">
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn">
              <span class="navicon"></span>
            </label>
            <ul class="menu">
              <li id="menu" @click="googleLogin">
                <a>
                  <span class="menu-text" id="menu-text-one">ログイン</span></a
                >
              </li>
              <li>
                <a href="#"
                  ><span class="menu-text" id="menu-text-two">menu2</span></a
                >
              </li>
              <li>
                <a href="#"
                  ><span class="menu-text" id="menu-text-three">menu3</span></a
                >
              </li>
            </ul>
          </nav>
        </section>
        <!-- ナビゲーションパート 終わり -->

        <!-- テキストパート 始まり -->
        <section calass="textStyle">
          <div class="GeekSalon">GeekSalon</div>
        </section>
        <!-- テキストパート終わり -->

        <!-- ログインパート 始まり -->
        <section class="login">
          <button class="login-button" @click="googleLogin">
            <a>
              <span class="login-text">ログイン</span>
            </a>
          </button>
        </section>
        <!-- ログインパート 終わり -->
      </div>
    </header>
    <div class="screen"></div>
  </body>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

export default {
  name: "logIn",
  data() {
    return {
      user: null,
    }
  },
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
* {
  z-index: 10;
}
body {
  /* border: 4px solid black; */
  font-family: "Roboto Slab", serif;
  padding: 0px;
  margin: 0px;
  /* user-select: none; */
}
.header-all {
  background-color: #c7887fdd;
  padding: 10px auto 0;
  width: 100%;
  height: 100px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ナビゲーションパート 始まり */
.gMenu {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
/* メニューアイコンを画面右上に固定しています */
.gMenu .menu-icon {
  cursor: pointer;
  position: absolute;
  left: 45px;
  top: 48px;
  padding-top: 5px;
  height: 12px;
}
/* メニューアイコン（三本線）の真ん中の線です */
.gMenu .menu-icon .navicon {
  background: #ffc107; /* 色は自由に変更可能です */
  display: block;
  height: 8px; /* 太さ */
  width: 65px; /* 長さ */
  position: relative;
  transition: background 0.4s ease-out; /* 形が変わる時のアニメーション */
}
/* メニューアイコン（三本線）の上と下の線を疑似要素で追加 */
.gMenu .menu-icon .navicon::before,
.gMenu .menu-icon .navicon::after {
  background: #ffc107; /* 色は自由に変更可能です */
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.4s ease-out; /* 形が変わる時のアニメーション */
  width: 100%;
}
.gMenu .menu-icon .navicon::before {
  top: 20px;
} /* 位置を上にずらしています */
.gMenu .menu-icon .navicon::after {
  top: -20px;
} /* 位置を下にずらしています */
/* 表示されるメニューです */
.gMenu .menu {
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  max-height: 0; /* ★最初は高さを0にして非表示状態に */
  transition: max-height 0.6s; /* 表示されるときのアニメーション */
  text-align: center;
  list-style: none;
}
/* メニュー部分のデザインです */
.gMenu .menu li:first-of-type {
  padding-top: 25px;
  padding-top: 50px;
}
.gMenu .menu li a {
  display: block;
  padding: 24px 20px;
  text-decoration: none;
  text-transform: uppercase;
}
.gMenu .menu li a:hover {
  background-color: #f1f1f1b1;
}
/* チェックボックスは常に非表示です */
.gMenu .menu-btn {
  display: none;
}
/* ▼▼▼以下はチェックボックスがONの時の状態です▼▼▼ */
.gMenu .menu-btn:checked ~ .menu {
  max-height: 338px; /* ★チェックボックスがオンの時高さを338pxにして表示させます */
  transition: max-height 0.6s;
}
/* メニューボタンの中央の線を非表示に */
.gMenu .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

/* メニューボタンの上下の線を45度傾けて✕印を作ります */
.gMenu .menu-btn:checked ~ .menu-icon .navicon::before {
  transform: rotate(-45deg);
  top: 0;
}
.gMenu .menu-btn:checked ~ .menu-icon .navicon::after {
  transform: rotate(45deg);
  top: 0;
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
/* ナビゲーションパート終わり */

/* テキストパート 始まり */
.textStyle {
  position: absolute;
}
.GeekSalon {
  /* border: 4px solid black; */
  position: absolute;
  bottom: 0;
  left: 150px;
  font-size: 50px;
  text-align: center;
}
/* テキストパート終わり */

/* ログインパート 始まり */
.login-button {
  position: absolute;
  right: 10px;
  top: 0;
  width: 100px;
  height: 100px;
  border: 2px solid #c7887fdd;
  background-color: rgba(255, 235, 205, 0.747);
}
.login-button:hover {
  cursor: pointer;
  background-color: #fccb90;
}
.login-text {
  color: black;
  font-weight: bold;
  font-size: 20px;
}
.login .login-button a {
  text-decoration: none;
}
#menu:hover {
  cursor: pointer;
}
/* ログインパート 終わり */
</style>

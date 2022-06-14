<template>
  <body>
    <div class="homeAll">
      <!-- タイムラインを入れこむ場所 始まり -->
      <section class="timelineSpace">
        <div class="timelineSpace-title-all">
          <div class="timelineSpace-headerTitle-one">
            <span>みんなのメモ一覧</span>
          </div>
          <div class="timelineSpace-headerTitle-two">
            <span>コースごとにメモを選んでね！</span>
            <div class="timelineSpace-button">
              <select class="Couse-Selecter">
                <option value="AllCouse">すべて表示</option>
                <option value="iPhoneAppDevCouse">
                  iPhoneアプリ開発コース
                </option>
                <option value="GameAppDevCouse">Gameアプリ開発コース</option>
                <option value="webServeDevCouse">webサービス開発コース</option>
                <option value="WebExpertCouse">WebExpertコース</option>
                <option value="VideoEditorCouse">VideoEditorコース</option>
                <option value="UI-UTCouse">UI/UXコース</option>
                <option value="AICouse">AIコース</option>
                <option value="PythonCouse">Pythonコース</option>
              </select>
              <button class="timelineSpace-button-serch">検索</button>
            </div>
          </div>
          <!-- <div class="timelineSpace-headerTitle-three">
            <span>他のユーザーが作ったメモを参考にしてみよう！</span>
          </div> -->
        </div>
        <div class="timelineSpace-upload">
          <div class="timelineSpace-upload-headerTitle">
            <span> 更新日:2022/06/10 </span>
          </div>
          <div class="timelineSpace-upload-user">
            <div class="timelineSpace-upload-user-information">
              <router-link to="myAcount">
                <input
                  type="submit"
                  value="icon"
                  class="timelineSpace-upload-user-information-iconButton"
              /></router-link>

              <div class="timelineSpace-upload-user-information-name">
                <span>名前</span>
              </div>
              <div class="timelineSpace-upload-user-information-course">
                <span>コース名</span>
              </div>
            </div>
            <div class="timelineSpace-upload-user-favorite">
              <label>
                <input
                  type="checkbox"
                  class="timelineSpace-upload-user-favorite-input"
                />
                <span>お気に入り</span>
              </label>
            </div>
            <nav>
              <li>
                <a href="#" class="timelineSpace-upload-user-link">
                  <div class="timelineSpace-upload-user-link-titleName">
                    タイトル
                  </div>
                </a>
              </li>
            </nav>
            <!-- タイトルの表示 -->
            <p v-for="memo in memos" :key="memo.id">{{ memo.title }}a</p>
          </div>
        </div>
      </section>
      <!-- タイムラインに入れこむ場所 終わり -->

      <!-- ユーザーのアカウントを一覧させる場所 始まり -->
      <section class="acountSpace">
        <div class="acountSpace-header">
          <div class="acountSpace-header-title">
            <span>みんアカ</span>
          </div>
          <div class="acountSpace-header-button">
            <select class="minaka-Couse-Selecter">
              <option value="minaka-AllCouse">すべて表示</option>
              <option value="minaka-iPhoneAppDevCouse">
                iPhoneアプリ開発コース
              </option>
              <option value="minaka-GameAppDevCouse">
                Gameアプリ開発コース
              </option>
              <option value="minaka-webServeDevCouse">
                webサービス開発コース
              </option>
              <option value="minaka-WebExpertCouse">WebExpertコース</option>
              <option value="minaka-VideoEditorCouse">VideoEditorコース</option>
              <option value="minaka-UI-UTCouse">UI/UXコース</option>
              <option value="minaka-AICouse">AIコース</option>
              <option value="minaka-PythonCouse">Pythonコース</option>
            </select>
            <button class="acountSpace-header-button-serch">検索</button>
          </div>
        </div>
        <div class="acountSpace-user">
          <div class="acountSpace-user-individual">
            <router-link to="myAcount">
              <input
                type="submit"
                value="icon"
                class="acountSpace-user-individual-icon"
                id="acountSpace-user-individual-icon"
            /></router-link>

            <div class="acountSpace-user-individual-course">
              <span class="acountSpace-user-individual-course-userName"
                >あいうえおかきくけこ</span
              >
              <span class="acountSpace-user-individual-course-courseName"
                >Gameアプリ開発コース</span
              >
            </div>
          </div>
        </div>

        <!-- 投稿する場所 始まり -->
        <router-link to="memoFormat">
          <section class="uploadSpace">
            <button class="uploadSpace-button">
              <span class="uploadSpace-button-text">投稿する</span>
            </button>
          </section>
        </router-link>
        <!-- 投稿する場所 終わり -->
      </section>
      <!-- ユーザーのアカウントを一覧させる場所 終わり -->
    </div>
  </body>
  <router-vue />
</template>

<script>
import headerSpace from "./headerSpace.vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      memos: [],
    }
  },
  created() {
    getDocs(collection(db, "memos")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.memos.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
  views: {
    headerSpace,
  },
}
</script>

<style scoped>
template {
  margin: 0px;
  padding: 0px;
}
* {
  z-index: 0;
}
body {
  /* border: 2px solid black; */
  width: 100%;
  height: 700px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px;
  margin: 0px;
}
.homeAll {
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

/* タイムラインを入れこむ場所 始まり */
.timelineSpace {
  /* border: 2px solid blue; */
  width: 75%;
  height: auto;
  text-align: center;
}
.timelineSpace-title-all {
  background-color: #c7887fdd;
  height: 110px;
}
.timelineSpace-title-all span {
  color: white;
}
.timelineSpace-headerTitle-one {
  /* border: 4px solid green; */
  width: 100%;
  font-size: 30px;
  font-weight: bold;
}
.timelineSpace-headerTitle-two {
  /* border: 4px solid green; */
  margin: 5px auto;
}
.Couse-Selecter {
  width: 200px;
}
.timelineSpace-button-serch {
  border-radius: 2px;
  border: 1px solid black;
  font-weight: bold;
  color: black;
}
.timelineSpace-button-serch:hover {
  cursor: pointer;
  background-color: rgb(229, 230, 231);
}
.timelineSpace-button-serch:active {
  transform: scale(0.98);
}
.timelineSpace-upload {
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden scroll;
  background-color: rgba(255, 239, 216, 0.747);
}
.timelineSpace-upload-headerTitle {
  /* border: 2px solid red; */
  width: 90%;
  height: 5%;
  margin: 5px auto;
  display: flex;
  position: relative;
}
.timelineSpace-upload-headerTitle span {
  position: absolute;
  bottom: 0;
}
.timelineSpace-upload-user {
  /* border: 2px solid royalblue; */
  filter: drop-shadow(1px 2px 3px #dddddd);
  width: 90%;
  height: 25%;
  margin: 15px auto;
  background-color: white;
}
.timelineSpace-upload-user-favorite {
  /* border: 2px solid red; */
  display: flex;
  position: relative;
}
.timelineSpace-upload-user-favorite-input {
  position: relative;
  top: 0px;
}
.timelineSpace-upload-user-favorite-input:hover {
  cursor: pointer;
}
.timelineSpace-upload-user-favorite span {
  /* border: 2px solid blue; */
  color: red;
  font-weight: bold;
  position: relative;
  bottom: 0;
}
.timelineSpace-upload-user-information {
  /* border: 2px solid red; */
  display: flex;
  position: relative;
  border-bottom: 3px solid black;
}
.timelineSpace-upload-user-information-iconButton {
  /* border: 2px solid peru; */
  width: 50px;
  height: 50px;
  border-radius: 50% 50%;
  background-color: aqua;
  margin: 3px;
}
.timelineSpace-upload-user-information-iconButton:hover {
  cursor: pointer;
}
.timelineSpace-upload-user-information-iconButton:active {
  transform: scale(0.98);
}
.timelineSpace-upload-user-information-name {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  top: 15px;
}
.timelineSpace-upload-user-information-course {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  top: 15px;
}
nav {
  list-style: none;
}
nav li {
  /* border: 2px solid red; */
  width: 100%;
  height: 85px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.timelineSpace-upload-user-link-titleName {
  position: absolute;
  left: 0px;
}
/* タイムラインを入れこむ場所 終わり */

/* ユーザーのアカウントを一覧させる場所 始まり */
.acountSpace {
  /* border: 2px solid plum; */
  width: 25%;
  height: 100%;
  position: relative;
  right: 0;
  top: 0;
  /* background-color: rgba(255, 239, 216, 0.747); */
}
.acountSpace-header {
  /* border: 2px solid black; */
  width: 100%;
  max-width: 100%;
  height: 110px;
  background-color: #eda99edd;
}
.acountSpace-header-title {
  /* border: 2px solid green; */
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.acountSpace-header-title span {
  /* border: 2px solid red; */
  height: 40px;
  font-size: 30px;
  font-weight: 900;
  color: white;
  padding: 0;
}
.acountSpace-header-button {
  /* border: 2px solid brown; */
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  top: 5px;
}
.minaka-Couse-Selecter {
  margin: auto 5px;
  width: 50%;
}
.acountSpace-header-button-serch {
  border-radius: 2px;
  border: 1px solid black;
  font-weight: bold;
  color: black;
}
.acountSpace-header-button-serch:hover {
  cursor: pointer;
  background-color: rgb(229, 230, 231);
}
.acountSpace-header-button-serch:active {
  transform: scale(0.98);
}
.acountSpace-user {
  /* border: 2px solid red; */
  width: 100%;
  /* heightはautoに変える */
  height: 100%;
  overflow: hidden scroll;
}
.acountSpace-user-individual {
  /* border: 2px solid rgb(87, 87, 87); */
  position: relative;
  width: 100%;
  height: 180px;
  margin: 10px auto;
}
.acountSpace-user-individual-icon {
  /* border: 2px solid blue; */
  width: 150px;
  height: 150px;
  background-color: aqua;
  border-radius: 50% 50%;
  position: absolute;
  top: 15px;
  left: 10px;
}
.acountSpace-user-individual-icon:hover {
  cursor: pointer;
}
.acountSpace-user-individual-icon:active {
  transform: scale(0.99);
}
.acountSpace-user-individual-course {
  /* border: 2px solid brown; */
  width: 45%;
  height: 100%;
  margin: auto 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  right: 0px;
}
.acountSpace-user-individual-course span {
  /* border: 2px solid red; */
  width: 100%;
  height: auto;
}
.acountSpace-user-individual-course-userName {
  /* border: 2px solid orange; */
  width: 100%;
  height: min-content;
  font-size: 13px;
  padding: 0px;
  margin: 0px;
  font-weight: bold;
  text-align: center;
  /* border-bottom: 2px solid black; */
  background-color: rgb(236, 232, 232);
  position: absolute;
  top: 30px;
}
.acountSpace-user-individual-course-courseName {
  width: 50px;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  background-color: gainsboro;
  height: min-content;
  position: absolute;
  top: 80px;
}
/* ユーザーのアカウントを一覧させる場所 終わり */

/* 投稿する場所 始まり */
.uploadSpace {
  /* border: 2px solid black; */
  width: 25%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  right: 0px;
  bottom: 100px;
  z-index: 100;
  padding: 0px;
  margin: 2px;
}
.uploadSpace-button {
  border: 2px solid #ce8d83dd;
  border-radius: 5px;
  padding: 0px;
  width: 80%;
  height: 100%;
  background-color: #dd988edd;
  color: white;
  z-index: 100;
}
.uploadSpace-button:hover {
  cursor: pointer;
  background-color: #be7a70dd;
  color: rgb(232, 227, 227);
}
.uploadSpace-button:active {
  transform: scale(0.99);
}
.uploadSpace-button-text {
  /* border: 2px solid red; */
  font-size: 30px;
  font-family: "Roboto";
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  padding: 0px;
  margin: 0px;
}
/* 投稿する場所 終わり */

/* スマートフォン用 始まり */
@media screen and (max-width: 640px) {
  body {
    /* border: 2px solid black; */
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
  }
  .homeAll {
    /* border: 2px solid gray; */
    width: 100vw;
    height: 100vw;
  }
  /* タイムラインを入れこむ場所 始まり */
  .timelineSpace {
    /* border: 2px solid blue; */
    width: 75vw;
    height: 100vh;
  }
  .timelineSpace-title-all {
  }
  .timelineSpace-title-all span {
  }
  .timelineSpace-headerTitle-one {
    /* border: 2px solid green; */
  }
  .timelineSpace-headerTitle-two {
    /* border: 2px solid green; */
  }
  .timelineSpace-button {
    /* border: 2px solid green; */
  }
  .Couse-Selecter {
  }
  .timelineSpace-button-serch {
  }
  .timelineSpace-button-serch:hover {
  }
  .timelineSpace-button-serch:active {
  }

  .timelineSpace-upload {
    /* border: 2px solid red; */
  }
  /* タイムラインを入れこむ場所 終わり */

  /* ユーザーのアカウントを一覧させる場所 始まり */
  .acountSpace {
    /* border: 2px solid orange; */
  }
  .acountSpace-header {
    /* border: 2px solid black; */
  }
  .acountSpace-header-title span {
    font-size: 20px;
  }
  .acountSpace-header-button {
    /* border: 2px solid red; */
    height: 40px;
    position: relative;
    top: -10px;
    display: block;
  }
  .minaka-Couse-Selecter {
    width: 80px;
  }
  .acountSpace-header-button-serch {
    font-size: 10px;
    padding: 0;
    position: absolute;
    bottom: 0px;
    right: 35px;
  }
  .acountSpace-user-individual {
    height: 200px;
  }
  .acountSpace-user-individual-icon {
    width: 80px;
    height: 80px;
    border-radius: 50% 50%;
    margin: 0px auto;
    top: 0px;
  }
  .acountSpace-user-individual-course {
    /* border: 2px solid green; */
    width: 100%;
    height: 40%;
    margin: 0px;
    position: absolute;
    bottom: 10px;
    text-align: center;
  }
  .acountSpace-user-individual-course-userName {
    /* border: 2px solid black; */
    width: 100%;
    font-size: 15px;
    position: absolute;
    top: -25px;
    margin: auto;
  }
  .acountSpace-user-individual-course-courseName {
    /* border: 2px solid orange; */
    position: absolute;
    top: 25px;
    font-size: 15px;
  }

  /* 投稿するところ 始まり */
  .uploadSpace {
    bottom: 20px;
    height: 100px;
  }
  .uploadSpace-button {
    /* border: 2px solid red; */
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
  .uploadSpace-button-text {
    /* border: 2px solid black; */
    font-size: 20px;
  }
  /* 投稿することろ 終わり */
}
</style>

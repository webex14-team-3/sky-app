<template>
  <div class="all">
    <div class="allScreen">
      <!-- アカウント 始まり -->
      <section class="acount" id="acount">
        <div class="acount-icon"></div>
        <div class="acount-text">
          <div class="acount-text-userName">
            <a class="acount-text-title" id="acount-text-userName-title">
              ユーザー名
            </a>
            <a class="acount-text-userName-name">
              {{ user ? user.userName : "" }}
            </a>
          </div>
          <div class="acount-text-userCourse">
            <a class="acount-text-title" id="acount-text-userCourse-title">
              コース名
            </a>
            <a class="acount-text-userCourse-name">
              {{ user ? user.course : "" }}
            </a>
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
      <!-- アカウント 終わり -->

      <!-- メモ 始まり -->
      <section class="memo">
        <div class="memo-header">
          <div class="memo-header-memoTitle">
            <span class="memo-header-memoTitle-title">マイメモ一覧</span>
          </div>
          <div class="memo-header-inputButton">
            <select class="memo-header-selector">
              <option value="mostRecent">新しい順</option>
              <option value="aiueo">古い順</option>
              <option value="favorite">お気に入り順</option>
            </select>
            <button class="memo-header-selectorButton">決定</button>
          </div>
        </div>
        <div class="memo-space">
          <!-- <div class="memo-space-user">
            <div class="memo-space-user-information">
              <input
                type="submit"
                value="icon"
                class="memo-space-user-information-iconButton"
              />
              <div class="memo-space-user-information-name">
                <span>名前</span>
              </div>
              <div class="memo-space-user-information-course">
                <span>コース</span>
              </div>
              <button class="memo-space-user-information-button">削除</button>
            </div>
            <div class="memo-space-user-favorite">
              <label>
                <input type="checkbox" class="memo-space-user-favorite-input" />
                <span>お気に入り</span>
              </label>
            </div>
            <nav>
              <li>
                <a href="#" class="memo-space-user-link">
                  <div class="memo-space-user-link-titleName">タイトル</div>
                </a>
              </li>
            </nav>
          </div> -->
          <posted-memo
            v-for="memo in memos"
            v-bind:key="memo.id"
            v-bind:memo="memo"
          />
        </div>
      </section>
      <!-- メモ 終わり -->
    </div>
  </div>
</template>

<script>
import PostedMemo from "@/components/PostedMemo.vue"
import { doc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  components: {
    PostedMemo,
  },
  data() {
    return {
      user: null,
      memos: [],
    }
  },
  async created() {
    if (!this.$store.state.user) {
      alert("ログインしてください!")
      // ↓ path:を定義すると画面遷移ができる
      // (ログインしないとプロフィールに行けないようになるコード)
      this.$router.push({ path: "/" })
      // ↓ {}内で処理をとどめるコード
      return
    }
    const docRef = doc(db, "users", `${this.$store.state.user.uid}`) // ここは、バッククオートを使うこと
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      this.user = docSnap.data()
      console.log(this.user)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
    getDocs(collection(db, "testUsersMemos")).then((snapshot) => {
      snapshot.forEach(async (article) => {
        const docRef = doc(db, "users", `${article.data().user}`)
        const user = await getDoc(docRef)
        console.log(user.data())
        this.memos.push({
          id: article.id,
          userName: user.data().userName,
          course: user.data().course,
          ...article.data(),
        })
      })
    })
  },
}
</script>

<style scoped>
.all {
  padding: 0px;
  margin: -10px;
}
.allScreen {
  /* border: 2px solid black; */
  width: 100%;
  height: 650px;
  display: flex;
}

/* アカウント 始まり */
.acount {
  /* border: 2px solid red; */
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  /* background-color: ; */
}
.acount-icon {
  width: 100px;
  height: 100px;
  background-color: aqua;
  border-radius: 50% 50%;
  position: absolute;
  top: 35px;
}
.acount-text {
  /* border: 2px solid green; */
  width: 100%;
  height: auto;
  position: relative;
  top: 150px;
  left: 0px;
  margin: 0 5px;
}
.acount-text-userName {
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.acount-text-title {
  font-size: 30px;
  font-weight: 900;
  /* border: 2px solid green; */
  width: 100%;
  text-align: center;
  user-select: none;
}
.acount-text-userName-name {
  font-size: 20px;
  font-weight: 900;
  text-align: center;
}
.acount-text-userCourse {
  /* border: 2px solid blue; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px auto;
}
.acount-text-userCourse-name {
  font-size: 25px;
  font-weight: 900;
  text-align: center;
}
/* アカウント 終わり */

/* メモ 始まり */
.memo {
  /* border: 1px solid blue; */
  width: 70%;
  height: 100%;
}
.memo-header {
  /* border: 1px solid red; */
  width: 100%;
  height: 15%;
  background-color: #c7887fdd;
}
.memo-header-memoTitle {
  /* border: 2px solid blue; */
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.memo-header-memoTitle-title {
  font-size: 30px;
  font-family: "Roboto";
  font-style: italic;
  font-weight: 1000;
  font-display: swap;
  user-select: none;
}
.memo-header-inputButton {
  /* border: 2px solid black; */
  margin: 12px auto;
  position: relative;
  bottom: 2px;
  display: flex;
  justify-content: center;
}
.memo-header-selector {
  font-size: 20px;
  width: 250px;
}
.memo-header-selectorButton {
  font-size: 15px;
  font-family: "Roboto";
  font-style: italic;
  font-weight: 1000;
  font-display: swap;
  border-radius: 5px;
  padding: 6px 10px;
  margin: 0 5px;
  position: relative;
  top: 0px;
  user-select: none;
}
.memo-header-selectorButton:hover {
  cursor: pointer;
  background-color: rgb(229, 230, 231);
}
.memo-header-selectorButton:active {
  transform: scale(0.98);
}
.memo-space {
  /* border: 2px solid black; */
  width: 100%;
  height: 85%;
  display: block;
  overflow: hidden scroll;
  background-color: rgba(255, 239, 216, 0.747);
}
.memo-space-user {
  /* border: 2px solid royalblue; */
  filter: drop-shadow(1px 2px 3px #dddddd);
  width: 90%;
  height: 25%;
  margin: 15px auto;
  background-color: white;
}
.memo-space-user-information {
  /* border: 2px solid red; */
  display: flex;
  position: relative;
  border-bottom: 3px solid black;
}
.memo-space-user-information-iconButton {
  /* border: 2px solid peru; */
  width: 50px;
  height: 50px;
  border-radius: 50% 50%;
  background-color: aqua;
  margin: 3px;
}
.memo-space-user-information-iconButton:hover {
  cursor: pointer;
}
.memo-space-user-information-iconButton:active {
  transform: scale(0.98);
}
.memo-space-user-information-name {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  top: 15px;
}
.memo-space-user-information-course {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  top: 15px;
}
.memo-space-user-information-button {
  position: absolute;
  right: 3px;
  top: 3px;
  border: 2px solid black;
  border-radius: 5px;
}
.memo-space-user-information-button:hover {
  cursor: pointer;
  background-color: rgb(229, 230, 231);
}
.memo-space-user-information-button:active {
  transform: scale(0.98);
}
.memo-space-user-favorite {
  /* border: 2px solid red; */
  display: flex;
  position: relative;
}
.memo-space-user-favorite-input {
  position: relative;
  top: 0px;
}
.memo-space-user-favorite-input:hover {
  cursor: pointer;
}
.memo-space-user-favorite span {
  /* border: 2px solid blue; */
  color: red;
  font-weight: bold;
  position: relative;
  bottom: 0;
}
nav {
  list-style: none;
}
nav li {
  /* border: 2px solid red; */
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  position: relative;
}
.memo-space-user-link {
  /* border: 2px solid green; */
  width: 100%;
  height: 70%;
  position: relative;
  bottom: 11px;
  display: flex;
  flex-wrap: wrap;
}
.memo-space-user-link-titleName {
  position: absolute;
  left: 0px;
}
/* メモ 終わり */

/* 投稿する場所 始まり */
.uploadSpace {
  /* border: 2px solid black; */
  width: 30%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  left: 0px;
  z-index: 1;
  padding: 0px;
  margin: 0px;
}
.uploadSpace-button {
  border: 2px solid #ce8d83dd;
  border-radius: 5px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: #dd988edd;
  color: white;
  z-index: 0;
}
.uploadSpace-button:hover {
  cursor: pointer;
  filter: brightness(105%);
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
  user-select: none;
}
/* 投稿する場所 終わり */

/* スマートフォン用 始まり */
@media screen and (max-width: 640px) {
  /* アカウント 始まり */
  .acount-icon {
    top: 20px;
  }
  .acount-text {
    top: 125px;
  }
  .acount-text-title {
    font-size: 18px;
  }
  .acount-text-userName-name {
    font-size: 15px;
  }
  .acount-text-userCourse-name {
    font-size: 15px;
  }
  /* アカウント 終わり */

  /* メモ 始まり */
  .memo-header-selector {
    border: 2px solid black;
    height: 25px;
    width: 150px;
  }
  .memo-header-selectorButton {
    top: -8px;
  }
  /* メモ 終わり */

  /* 投稿する場所 始まり */
  .uploadSpace {
    height: 120px;
    left: 0px;
    bottom: 50px;
  }
  .uploadSpace-button-text {
    font-size: 20px;
  }
}
/* 投稿する場所 終わり */

/* スマートフォン用 終わり */
</style>

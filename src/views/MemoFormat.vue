<template>
  <div class="all_Container">
    <div class="format_container">
      <!-- 投稿 始まり -->
      <section class="upload_Area">
        <div v-if="myUserSpace" class="btn_Container">
          <button class="saveBtn uploadBtn" @click="deleteBtn">
            <p>削除</p>
          </button>
          <button class="saveBtn uploadBtn" @click="saveMemo">
            <p>保存</p>
          </button>
          <button class="postBtn uploadBtn" @click="postMemo">
            <p>投稿</p>
          </button>
        </div>
      </section>
      <!-- 投稿 終わり -->

      <!-- タイトル 始まり -->
      <section class="inputTtl_Area">
        <p class="title theme">タイトル</p>
        <input
          type="text"
          maxlength="30"
          class="userInput_title"
          v-model="inputTitle"
        />
      </section>
      <!-- タイトル 終わり -->

      <!-- 本文 始まり -->
      <section class="memo_Area">
        <p class="title memo">本文</p>
        <textarea
          class="userInput_memo"
          name="main"
          v-model="inputMemo"
          placeholder="勉強したことをメモに書いて投稿しよう！"
        ></textarea>
      </section>
      <!-- 本文 終わり -->
    </div>
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../firebase"

export default {
  name: "MemoFormatPage",
  data() {
    return {
      inputMemo: "",
      myUserSpace: true,
      inputTitle: "",
    }
  },
  async created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = auth.currentUser
        const userID = user.uid
        const docRef = doc(db, "saveMemos", userID)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          this.inputTitle = docSnap.data().title
          this.inputMemo = docSnap.data().memo
        }
      }
    })
  },
  methods: {
    async postMemo() {
      // タイトルとテキストの両方が書かれていないと投稿できないようにする
      if (this.inputTitle !== "" && this.inputMemo !== "") {
        if (window.confirm("これで投稿しますか？")) {
          const auth = getAuth()
          const user = auth.currentUser
          const userid = user.uid
          const docRef = doc(db, "users", userid)
          const docSnap = await getDoc(docRef)

          // 投稿時の時間を作る
          const now = new Date()
          const year = now.getFullYear()
          const month = now.getMonth()
          const date = now.getDate()
          const hour = now.getHours()
          const min = now.getMinutes()
          const sec = now.getSeconds()

          const inputTime = `${year}/${month + 1}/${date}/${hour}:${min}:${sec}`

          if (docSnap.exists()) {
            const memo = {
              userID: user.uid,
              userName: docSnap.data().userName,
              userCourse: docSnap.data().userCourse,
              userEmail: docSnap.data().userEmail,
              userImg: docSnap.data().userImg,
              date: inputTime,
              createGetTime: now.getTime(),
              title: [this.inputTitle],
              memo: [this.inputMemo],
              likeCount: 0,
              likeUser: [],
            }
            await addDoc(collection(db, "userMemos"), memo)

            const save = doc(db, "saveMemos", userid)
            const saveDocSnap = await getDoc(save)

            if (saveDocSnap.exists()) {
              const memo = {
                userID: user.uid,
                title: this.inputTitle,
                memo: this.inputMemo,
                email: user.email,
              }
              await deleteDoc(doc(db, "saveMemos", userid), memo)
            }
            alert("投稿が完了しました！")
          }
          this.inputTitle = ""
          this.inputMemo = ""
        }
      } else {
        alert("どっちも書いてください！")
      }
    },
    async saveMemo() {
      if (this.inputTitle !== "" || this.inputMemo !== "") {
        const auth = getAuth()
        const user = auth.currentUser
        const userid = user.uid
        const docRef = doc(db, "users", userid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const memo = {
            userID: user.uid,
            title: this.inputTitle,
            memo: this.inputMemo,
            email: user.email,
          }
          await setDoc(doc(db, "saveMemos", userid), memo)
        }
        alert("保存しました！")
      }
    },
    async deleteBtn() {
      if (this.inputTitle !== "" || this.inputMemo !== "") {
        if (window.confirm("タイトルと本文を真っ白にしますか？")) {
          if (this.inputTitle !== "" || this.inputMemo !== "") {
            const auth = getAuth()
            const user = auth.currentUser
            const userid = user.uid
            const docRef = doc(db, "saveMemos", userid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
              const memo = {
                userID: user.uid,
                title: this.inputTitle,
                memo: this.inputMemo,
                email: user.email,
              }
              await deleteDoc(doc(db, "saveMemos", userid), memo)
            }
            this.inputTitle = ""
            this.inputMemo = ""
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_reset.scss";

.all_Container {
  display: flex;
  justify-content: center;
  background-color: rgba(255, 239, 216, 0.747);
  height: 100vh;

  .format_container {
    border: 2px solid black;
    margin-top: 20px;
    border-radius: 3%;
    width: 90%;
    min-height: 70vh;
    background-color: rgb(247, 247, 247);
    position: relative;

    /* 投稿 始まり */
    .upload_Area {
      width: 40%;
      height: 50px;
      margin-top: 4px;
      position: absolute;
      right: 5%;
      max-width: 50%;

      .btn_Container {
        display: flex;

        .uploadBtn {
          border: 2px solid #ce8d83dd;
          height: 100%;
          width: 100%;
          background-color: #dd988edd;
          border-radius: 10%;
          color: white;
          margin-left: 0.8em;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            cursor: pointer;
            filter: brightness(110%);
          }
          &:active {
            transform: scale(0.98);
          }
          p {
            font-size: 1.7em;
            font-weight: bold;
            color: white;
          }
        }
      }
    }
    /* タイトル 始まり */
    .title {
      font-weight: bold;
      font-size: 1.3em;
    }
    .inputTtl_Area {
      width: 90%;
      height: 14%;
      margin: 0 auto;
      margin-top: 30px;

      .userInput_title {
        border: 2px solid black;
        background-color: white;
        width: 100%;
        height: 50px;
        font-size: large;
        font-weight: bold;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    /* タイトル 終わり */

    /* 本文 始まり */
    .memo_Area {
      margin: 0 auto;
      width: 90%;
      height: 70%;

      .userInput_memo {
        border: 2px solid black;
        background-color: white;
        padding: 7px 5px 10px 5px;
        overflow: scroll;
        word-break: break-word;
        overflow-wrap: break-word;
        font-size: 15px;
        font-weight: 900;
        resize: none;
        overflow: scroll;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        width: 100%;
        height: 100%;
        line-height: 1.3em;
      }
    }
  }
}
</style>

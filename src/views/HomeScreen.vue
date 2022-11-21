<template>
  <div class="all_Container">
    <div class="home_Container">
      <!-- タイムラインを入れこむ場所 始まり -->
      <section class="timeline_Area">
        <div class="header_Container">
          <p class="minnanoMemoItiran">みんなのメモ一覧</p>
          <div class="search_Container">
            <!-- <p>コースごとにメモを選んでね！</p> -->
            <div class="select_Container">
              <div class="select_Area">
                <select @change="optionContainerBtn" v-model="changedSelect">
                  <option value="AllCouse">すべて表示</option>
                  <option value="iPhoneAppDevCouse">
                    iPhoneアプリ開発コース
                  </option>
                  <option value="GameAppDevCouse">Gameアプリ開発コース</option>
                  <option value="webServeDevCouse">
                    webサービス開発コース
                  </option>
                  <option value="WebExpertCouse">WebExpertコース</option>
                  <option value="VideoEditorCouse">VideoEditorコース</option>
                  <option value="UI-UTCouse">UI/UXコース</option>
                  <option value="AICouse">AIコース</option>
                  <option value="PythonCouse">Pythonコース</option>
                </select>
              </div>
              <div class="input_Area">
                <input
                  v-model="inputSearch"
                  placeholder="知りたいことを検索しよう！"
                /><br />
                <button class="search_Btn" @click="Search">検索</button>
                <button class="search_Btn" @click="StopSearch">戻る</button>
              </div>
            </div>
          </div>
          <!-- <div class="timelineSpace-headerTitle-three">
            <span>他のユーザーが作ったメモを参考にしてみよう！</span>
          </div> -->
        </div>
        <div class="timeline_Area">
          <posted-memo
            v-for="memo in memos"
            v-bind:key="memo.id"
            v-bind:memo="memo"
          />
        </div>
      </section>
      <!-- タイムラインに入れこむ場所 終わり -->

      <!-- 投稿する場所 始まり -->
      <section class="memoBtn_Area">
        <MemoBtn />
      </section>
      <!-- 投稿する場所 終わり -->

      <!-- ユーザーのアカウントを一覧させる場所 終わり -->
    </div>
  </div>
</template>

<script>
import PostedMemo from "@/components/PostedMemo.vue"
import MemoBtn from "@/components/MemoBtn.vue"
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase"

export default {
  name: "HomePage",
  components: {
    PostedMemo,
    MemoBtn,
  },
  data() {
    return {
      user: null,
      memos: [],
      inputUserImage: "",
      userCourse: "WebExpert",
      userName: "名無し",
      changedSelect: "AllCouse",
      inputSearch: "",
      titleBoxes: [],
    }
  },
  async created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          this.inputUserImage = docSnap.data()
          this.userName = docSnap.data().userName
          this.userCourse = docSnap.data().userCourse
          this.inputUserImage = docSnap.data().userImg
        }

        const a = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc")
        )
        const querySnapshot = await getDocs(a)

        querySnapshot.forEach((doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      }
    })
  },
  methods: {
    async Search() {
      if (this.inputSearch !== "") {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.memos = []

            let serachtitle = query(
              collection(db, "userMemos"),
              orderBy("createGetTime", "asc"),
              where("title", "array-contains", this.inputSearch)
            )
            let serachMemos = query(
              collection(db, "userMemos"),
              orderBy("createGetTime", "asc"),
              where("memo", "array-contains", this.inputSearch)
            )
            const titleFinalquerySnapshot = await getDocs(serachtitle)
            const MemoFinalquerySnapshot = await getDocs(serachMemos)
            titleFinalquerySnapshot.forEach((doc) => {
              this.memos.unshift({
                userName: doc.data().userName,
                userCourse: doc.data().userCourse,
                title: doc.data().title[0],
                memo: doc.data().memo[0],
                userImg: doc.data().userImg,
                DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
                TimeRemains: doc.data().createGetTime,
              })
            })
            MemoFinalquerySnapshot.forEach((doc) => {
              this.memos.unshift({
                userName: doc.data().userName,
                userCourse: doc.data().userCourse,
                title: doc.data().title[0],
                memo: doc.data().memo[0],
                userImg: doc.data().userImg,
                DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
                TimeRemains: doc.data().createGetTime,
              })
            })
            // console.log(this.memos)

            // 重複したメモにフィルターをかける処理
            const result = this.memos.filter(
              (x, i, array) =>
                array.findIndex((y) => y.TimeRemains === x.TimeRemains) === i
            )

            this.memos = []
            result.forEach((doc) => {
              this.memos.push({
                userName: doc.userName,
                userCourse: doc.userCourse,
                title: doc.title,
                memo: doc.memo,
                userImg: doc.userImg,
                DetailcreateMemoTime: doc.DetailcreateMemoTime,
                TimeRemains: doc.createGetTime,
              })
            })
          }
        })
      } else {
        this.memos = []
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              this.inputUserImage = docSnap.data()
              this.userName = docSnap.data().userName
              this.userCourse = docSnap.data().userCourse
              this.inputUserImage = docSnap.data().userImg
            }

            const a = query(
              collection(db, "userMemos"),
              orderBy("createGetTime", "asc")
            )
            const querySnapshot = await getDocs(a)

            querySnapshot.forEach((doc) => {
              this.memos.unshift({
                userName: doc.data().userName,
                userCourse: doc.data().userCourse,
                title: doc.data().title[0],
                memo: doc.data().memo[0],
                userImg: doc.data().userImg,
                DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
                TimeRemains: doc.data().createGetTime,
              })
            })
          }
        })
      }
    },
    StopSearch() {
      if (this.inputSearch !== "") {
        this.memos = []
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              this.inputUserImage = docSnap.data()
              this.userName = docSnap.data().userName
              this.userCourse = docSnap.data().userCourse
              this.inputUserImage = docSnap.data().userImg
            }

            const a = query(
              collection(db, "userMemos"),
              orderBy("createGetTime", "asc")
            )
            const querySnapshot = await getDocs(a)

            querySnapshot.forEach((doc) => {
              this.memos.unshift({
                userName: doc.data().userName,
                userCourse: doc.data().userCourse,
                title: doc.data().title[0],
                memo: doc.data().memo[0],
                userImg: doc.data().userImg,
                DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
                TimeRemains: doc.data().createGetTime,
              })
            })
          }
        })
        this.inputSearch = ""
      }
    },
    async optionContainerBtn() {
      if (this.changedSelect === "AllCouse") {
        this.memos = []
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              this.inputUserImage = docSnap.data()
              this.userName = docSnap.data().userName
              this.userCourse = docSnap.data().userCourse
              this.inputUserImage = docSnap.data().userImg
            }

            const a = query(
              collection(db, "userMemos"),
              orderBy("createGetTime", "asc")
            )
            const querySnapshot = await getDocs(a)

            querySnapshot.forEach((doc) => {
              this.memos.unshift({
                userName: doc.data().userName,
                userCourse: doc.data().userCourse,
                title: doc.data().title[0],
                memo: doc.data().memo[0],
                userImg: doc.data().userImg,
                DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
                TimeRemains: doc.data().createGetTime,
              })
            })
          }
        })
      } else if (this.changedSelect === "iPhoneAppDevCouse") {
        this.memos = []
        const iphone = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "IPhone")
        )
        const iPhoneSnap = await getDocs(iphone)
        iPhoneSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else if (this.changedSelect === "GameAppDevCouse") {
        console.log("GameAppDevCouse")
        this.memos = []
        const Game = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "Game")
        )
        const GameSnap = await getDocs(Game)
        GameSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else if (this.changedSelect === "webServeDevCouse") {
        console.log("webServeDevCouse")
        this.memos = []
        const Web = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "Web")
        )
        const WebSnap = await getDocs(Web)
        WebSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else if (this.changedSelect === "WebExpertCouse") {
        console.log("WebExpertCouse")
        this.memos = []
        const WebExpert = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "WebExpert")
        )
        const WebExpertSnap = await getDocs(WebExpert)
        WebExpertSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else if (this.changedSelect === "VideoEditorCouse") {
        console.log("VideoEditorCouse")
        this.memos = []
        const VideoEditor = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "VideoEditor")
        )
        const VideoEditorSnap = await getDocs(VideoEditor)
        VideoEditorSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else if (this.changedSelect === "UI-UTCouse") {
        console.log("UI-UTCouse")
        this.memos = []
        const UIUX = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "UIUX")
        )
        const UIUXSnap = await getDocs(UIUX)
        UIUXSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else if (this.changedSelect === "AICouse") {
        console.log("AICouse")
        this.memos = []
        const AI = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "AI")
        )
        const AISnap = await getDocs(AI)
        AISnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      } else {
        console.log("PythonCouse")
        this.memos = []
        const Python = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userCourse", "==", "Python")
        )
        const PythonSnap = await getDocs(Python)
        PythonSnap.forEach(async (doc) => {
          this.memos.unshift({
            userName: doc.data().userName,
            userCourse: doc.data().userCourse,
            title: doc.data().title[0],
            memo: doc.data().memo[0],
            userImg: doc.data().userImg,
            DetailcreateMemoTime: doc.data().DetailcreateMemoTime,
            TimeRemains: doc.data().createGetTime,
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_reset.scss";

.all_Container {
  // border: 2px solid red;
  .home_Container {
    // border: 2px solid blue;
    .timeline_Area {
      // border: 2px solid green;
      text-align: center;

      .header_Container {
        // border: 2px solid blue;
        height: 15vh;
        background-color: #c7887fdd;
        user-select: none;

        .minnanoMemoItiran {
          // border: 2px solid green;
          color: white;
          font-size: 2.3em;
          font-weight: bold;
          font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
            sans-serif;
        }

        .search_Container {
          // border: 2px solid orange;
          font-size: 20px;
          font-weight: bold;

          .select_Container {
            // border: 2px solid red;
            display: flex;
            justify-content: center;

            .select_Area {
              // border: 2px solid pink;
              width: 45%;
              height: 100%;

              select {
                min-width: 60%;
                border: 2px solid black;
                background-color: white;
                -moz-appearance: menulist;
                -webkit-appearance: menulist;
                border-radius: 5px;
              }
            }

            .input_Area {
              // border: 2px solid red;
              width: 45%;

              input {
                min-width: 60%;
                border: 2px solid black;
                background-color: white;
                border-radius: 5px;
              }

              .search_Btn {
                margin-top: 5px;
                border-radius: 5px;
                width: 70px;
                border: 2px solid black;
                background-color: rgb(247, 224, 170);
                font-weight: bold;
                color: black;
                margin-left: 8px;

                &:hover {
                  cursor: pointer;
                  filter: brightness(110%);
                }

                &:active {
                  transform: scale(0.98);
                }
              }
            }
          }
        }
      }

      .timeline_Area {
        border: 2px solid rgba(255, 239, 216, 0.747);
        background-color: rgba(255, 239, 216, 0.747);
        min-height: 100vh;
      }
    }

    .memoBtn_Area {
      width: 30%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 30px;
      right: 0px;
      z-index: 1;
    }
  }
}

/* スマートフォン用 始まり */
// @media screen and (max-width: 640px) {}
</style>

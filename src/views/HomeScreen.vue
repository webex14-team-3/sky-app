<template>
  <div class="all_Container">
    <div class="home_Container">
      <!-- タイムライン表示部分 -->
      <section class="timeline_Area">
        <div class="header_Container">
          <p class="pageTtl">みんなのメモ一覧</p>
          <div class="search_Container">
            <div class="select_Container">
              <div class="select_Area">
                <select @change="optionContainerBtn" v-model="changedSelect">
                  <option value="AllCourse">すべて表示</option>
                  <option value="iPhoneAppDevCourse">
                    iPhoneアプリ開発コース
                  </option>
                  <option value="GameAppDevCourse">Gameアプリ開発コース</option>
                  <option value="webServeDevCourse">
                    webサービス開発コース
                  </option>
                  <option value="WebExpertCourse">WebExpertコース</option>
                  <option value="VideoEditorCourse">VideoEditorコース</option>
                  <option value="UI-UTCourse">UI/UXコース</option>
                  <option value="AICourse">AIコース</option>
                  <option value="PythonCourse">Pythonコース</option>
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
        </div>
        <div class="timeline_Area">
          <PostedMemo
            v-for="memo in memos"
            :key="memo.id"
            :memo="memo"
            :hideLikeBtn="!user"
          />
        </div>
      </section>
      <!-- 投稿する場所 -->
      <section class="memoBtn_Area">
        <MemoBtn />
      </section>
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
import { getAuth } from "firebase/auth"
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
      changedSelect: "AllCourse",
      inputSearch: "",
    }
  },
  async created() {
    const auth = getAuth()
    this.user = auth.currentUser
    if (this.user) {
      const uid = this.user.uid
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        this.inputUserImage = data.userImg
        this.userName = data.userName
        this.userCourse = data.userCourse
      }
    }
    // 全投稿を取得
    const q = query(
      collection(db, "userMemos"),
      orderBy("createGetTime", "asc")
    )
    await this.fetchMemos(q)
  },
  methods: {
    async fetchMemos(q) {
      const snap = await getDocs(q)
      snap.forEach((doc) => {
        this.memos.unshift({
          id: doc.id,
          userName: doc.data().userName,
          userCourse: doc.data().userCourse,
          title: doc.data().title[0],
          memo: doc.data().memo[0],
          userImg: doc.data().userImg,
          date: doc.data().date,
          TimeRemains: doc.data().createGetTime,
          likeCount: doc.data().likeCount ?? 0,
          likeUser: doc.data().likeUser ?? [],
        })
      })
    },
    async Search() {
      if (this.inputSearch !== "") {
        this.memos = []
        const q = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc")
        )
        const snap = await getDocs(q)
        const filtered = []
        snap.forEach((doc) => {
          const data = doc.data()
          const titleStr = (data.title && data.title[0]) || ""
          const memoStr = (data.memo && data.memo[0]) || ""
          if (
            titleStr.includes(this.inputSearch) ||
            memoStr.includes(this.inputSearch)
          ) {
            filtered.push({
              id: doc.id,
              userName: data.userName,
              userCourse: data.userCourse,
              title: titleStr,
              memo: memoStr,
              userImg: data.userImg,
              date: data.date,
              TimeRemains: data.createGetTime,
              likeCount: data.likeCount ?? 0,
              likeUser: data.likeUser ?? [],
            })
          }
        })
        this.memos = filtered.reverse()
      } else {
        this.memos = []
        const q = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc")
        )
        await this.fetchMemos(q)
      }
    },
    async StopSearch() {
      if (this.inputSearch !== "") {
        this.memos = []
        const q = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc")
        )
        await this.fetchMemos(q)
        this.inputSearch = ""
      }
    },
    async optionContainerBtn() {
      this.memos = []
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (currentUser) {
        const uid = currentUser.uid
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          this.inputUserImage = data.userImg
          this.userName = data.userName
          this.userCourse = data.userCourse
        }
      }
      let q
      switch (this.changedSelect) {
        case "AllCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc")
          )
          break
        case "iPhoneAppDevCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "IPhone")
          )
          break
        case "GameAppDevCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "Game")
          )
          break
        case "webServeDevCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "Web")
          )
          break
        case "WebExpertCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "WebExpert")
          )
          break
        case "VideoEditorCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "VideoEditor")
          )
          break
        case "UI-UTCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "UIUX")
          )
          break
        case "AICourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "AI")
          )
          break
        case "PythonCourse":
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc"),
            where("userCourse", "==", "Python")
          )
          break
        default:
          q = query(
            collection(db, "userMemos"),
            orderBy("createGetTime", "asc")
          )
      }
      await this.fetchMemos(q)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_reset.scss";

.all_Container {
  .home_Container {
    .timeline_Area {
      text-align: center;

      .header_Container {
        padding-bottom: 20px;
        background-color: #c7887fdd;
        user-select: none;

        .pageTtl {
          color: white;
          font-size: 2.3em;
          font-weight: bold;
          font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
            sans-serif;
        }

        .search_Container {
          font-size: 20px;
          font-weight: bold;

          .select_Container {
            display: flex;
            justify-content: center;

            .select_Area {
              width: 45%;
              height: 100%;

              select {
                min-width: 60%;
                border: 2px solid black;
                background-color: white;
                -moz-appearance: menulist;
                -webkit-appearance: menulist;
                appearance: menulist;
                border-radius: 5px;
              }
            }

            .input_Area {
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

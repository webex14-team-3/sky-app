<template>
  <div class="allContainer">
    <!-- アカウント 始まり -->
    <section class="acountArea">
      <div class="icon_Container A_container">
        <img class="icon_Image" :src="inputUserImage" />
      </div>
      <div class="acountTxtContainer A_container">
        <div class="A_userNameContainer">
          <p class="A_userTitle userTitle">ユーザー名</p>
          <p class="userName">
            {{ this.userName }}
          </p>
        </div>
        <div class="A_userCourseContainer">
          <p class="A_userTitle">コース名</p>
          <div class="userCourse">
            <p>{{ this.userCourse }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- メモ 始まり -->
    <section class="memoArea">
      <div class="M_header">
        <div class="headerTitle_container">
          <p class="headerTitle">マイメモ一覧</p>
        </div>
        <div class="select_container">
          <select @change="optionContainerBtn" v-model="changedSelect">
            <option value="new">
              <p>新しい順</p>
            </option>
            <option value="old">
              <p>古い順</p>
            </option>
            <!-- <option value="favorite">
              <p>お気に入り順</p>
            </option> -->
          </select>
          <!-- <button class="selectBtn">決定</button> -->
        </div>
      </div>
      <div class="M_container">
        <posted-memo v-for="memo in memos" :key="memo.id" :memo="memo" />
      </div>
    </section>
    <!-- メモ 終わり -->

    <!-- 投稿する場所 始まり -->
    <section class="upload_Area">
      <MemoBtn />
    </section>
    <!-- 投稿する場所 終わり -->
  </div>
</template>

<script>
import PostedMemo from "@/components/PostedMemo.vue"
import MemoBtn from "@/components/MemoBtn.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase"

import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore"

export default {
  name: "MyAcountPage",
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
      changedSelect: "new",
      hiddenDisplay: "",
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
          orderBy("createGetTime", "asc"),
          where("userID", "==", uid)
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
    async optionContainerBtn() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        const uid = user.uid
        const a = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userID", "==", uid)
        )
        const memoContainerSnap = await getDocs(a)
        this.memos = []

        if (this.changedSelect === "new") {
          this.notLiked = ""

          memoContainerSnap.forEach((doc) => {
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
        } else if (this.changedSelect === "old") {
          this.Liked = ""

          memoContainerSnap.forEach((doc) => {
            this.memos.push({
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
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_reset.scss";

%userInfoUnder {
  text-decoration: underline;
  text-decoration-color: rgb(218, 142, 30);
  text-decoration-thickness: 4px;
  text-underline-offset: 7px;
}
.hiddenDisplay {
  display: none;
}
.allContainer {
  // border: 2px solid black;
  width: 100%;
  height: 100vh;
  min-height: 650px;
  display: flex;
  user-select: none;

  // -----------------------------
  /* アカウント 始まり */
  // ---------------------------------

  .acountArea {
    // border: 2px solid red;
    width: 30%;
    height: 100%;

    .A_container {
      // border: 2px solid black;
      margin-top: 40px;
    }

    .icon_Container {
      // border: 2px solid green;
      display: flex;
      justify-content: center;

      .icon_Image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }

    .acountTxtContainer {
      // border: 2px solid red;

      .A_userNameContainer {
        // border: 2px solid black;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 20px;

        .userTitle {
          margin-top: 20px;
          font-size: 1.7em;
          font-weight: 900;
          // border: 2px solid green;
          width: 100%;
          text-align: center;
        }
        .userName {
          // border: 2px solid blue;
          @extend %userInfoUnder;
          font-size: 2em;
          font-weight: 900;
          margin: 10px auto;
        }
      }

      .A_userCourseContainer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 20px;

        .A_userTitle {
          font-size: 1.7em;
          font-weight: 900;
          // border: 2px solid green;
          width: 100%;
          text-align: center;
        }

        .userCourse {
          // border: 2px solid red;
          font-size: 2em;
          font-weight: bold;

          p {
            @extend %userInfoUnder;
          }
        }
      }
    }
  }

  // --------------------------
  /* メモ 始まり */
  // -------------------------
  .memoArea {
    // border: 1px solid blue;
    width: 70%;
    height: 100%;

    .M_header {
      // border: 1px solid red;
      width: 100%;
      height: 15%;
      background-color: #c7887fdd;

      .headerTitle_container {
        // border: 2px solid blue;
        display: flex;
        justify-content: center;
        align-items: center;

        .headerTitle {
          font-size: 30px;
          font-family: "Roboto";
          font-weight: bold;
          color: white;
        }
      }

      .select_container {
        // border: 2px solid black;
        margin: 15px auto 0;
        display: flex;
        justify-content: center;

        select {
          border: 2px solid black;
          background-color: white;
          font-size: 20px;
          font-weight: bold;
          border-radius: 5px;
          width: 50%;
          -moz-appearance: menulist;
          -webkit-appearance: menulist;
          text-align: center;
        }

        .selectBtn {
          font-size: 1.2em;
          font-family: "Roboto";
          font-weight: bold;
          border: 2px solid black;
          background-color: rgb(247, 224, 170);
          border-radius: 5px;
          padding: 6px 10px;
          margin: 0 5px;

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

    .M_container {
      border: 2px solid rgba(255, 239, 216, 0.747);
      background-color: rgba(255, 239, 216, 0.747);
      width: 100%;
      min-height: 100%;
      display: block;
    }
  }

  .upload_Area {
    width: 30%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 30px;
    left: 0px;
    z-index: 1;
  }
}

/* スマートフォン用 始まり */
@media screen and (max-width: 1080px) {
  .allContainer {
    // border: 2px solid black;
    position: relative;

    // -----------------------------
    /* アカウント 始まり */
    // ---------------------------------

    .acountArea {
      // border: 2px solid black;
      width: 100%;
      height: 20%;
      position: absolute;
      display: flex;

      .A_container {
        // border: 2px solid black;
        display: flex;
        width: 30%;
      }

      .icon_Container {
        // border: 2px solid green;
        margin: 0px;
        margin-top: 12px;
        margin-left: 10px;

        .icon_Image {
          width: 170px;
          height: 170px;
          border-radius: 50%;
        }
      }

      .acountTxtContainer {
        // border: 2px solid orange;
        margin: 0px;
        width: 65%;
        margin-top: 10px;

        .A_userNameContainer {
          // border: 2px solid plum;
          display: block;
          height: 100%;
          width: 45%;
          text-align: center;

          .userName {
            // border: 2px solid blue;
            font-size: 2em;
            font-weight: 900;
            text-align: center;
            margin-top: 25px;
          }
        }

        .A_userCourseContainer {
          .A_userTitle {
            font-size: 1.7em;
            font-weight: 900;
            // border: 2px solid green;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 8px;
          }

          .userCourse {
            // border: 2px solid red;
            font-size: 2em;
            font-weight: bold;
            padding-top: 10px;
          }
        }
      }
    }

    // --------------------------
    /* メモ 始まり */
    // -------------------------
    .memoArea {
      // border: 1px solid blue;
      width: 100%;
      height: 50%;
      margin-top: 200px;

      .M_header {
        // border: 1px solid red;
        width: 100%;
        height: 25%;
        background-color: #c7887fdd;
      }
    }
  }
}
</style>

<template>
  <div class="allContainer">
    <!-- アカウント情報 -->
    <section class="accountArea">
      <div class="icon_Container a_container">
        <img class="icon_Image" :src="inputUserImage" />
      </div>
      <div class="accountTxtContainer a_container">
        <div class="a_userNameContainer">
          <p class="a_userTitle userTitle">ユーザー名</p>
          <p class="userName">{{ userName }}</p>
        </div>
        <div class="a_userCourseContainer">
          <p class="a_userTitle">コース名</p>
          <div class="userCourse">
            <p>{{ userCourse }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 投稿一覧 -->
    <section class="memoArea">
      <div class="m_header">
        <div class="headerTitle_container">
          <p class="headerTitle">マイメモ一覧</p>
        </div>
        <div class="select_container">
          <select @change="optionContainerBtn" v-model="changedSelect">
            <option value="new"><p>新しい順</p></option>
            <option value="old"><p>古い順</p></option>
          </select>
        </div>
      </div>
      <div class="m_container">
        <PostedMemo
          v-for="memo in memos"
          :key="memo.id"
          :memo="memo"
          :hideLikeBtn="true"
        />
      </div>
    </section>
    <!-- 投稿ボタン -->
    <section class="upload_Area">
      <MemoBtn />
    </section>
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
  orderBy,
  where,
} from "firebase/firestore"

export default {
  name: "MyAccountPage",
  components: { PostedMemo, MemoBtn },
  data() {
    return {
      user: null,
      memos: [],
      inputUserImage: "",
      userCourse: "WebExpert",
      userName: "名無し",
      changedSelect: "new",
    }
  },
  async created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user
        const uid = user.uid
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          this.inputUserImage = data.userImg
          this.userName = data.userName
          this.userCourse = data.userCourse
        }
        const q = query(
          collection(db, "userMemos"),
          orderBy("createGetTime", "asc"),
          where("userID", "==", uid)
        )
        await this.fetchMemos(q)
      }
    })
  },
  methods: {
    async fetchMemos(q) {
      const snap = await getDocs(q)
      snap.forEach((doc) => {
        const data = doc.data()
        const memoObj = {
          id: doc.id,
          userName: data.userName,
          userCourse: data.userCourse,
          title: data.title[0],
          memo: data.memo[0],
          userImg: data.userImg,
          date: data.date,
          TimeRemains: data.createGetTime,
        }
        if (this.changedSelect === "new") {
          this.memos.unshift(memoObj)
        } else {
          this.memos.push(memoObj)
        }
      })
    },
    async optionContainerBtn() {
      this.memos = []
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) return
      const uid = user.uid
      const q = query(
        collection(db, "userMemos"),
        orderBy("createGetTime", "asc"),
        where("userID", "==", uid)
      )
      await this.fetchMemos(q)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_reset.scss";

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
  width: 100%;
  height: 100vh;
  min-height: 650px;
  display: flex;
  user-select: none;

  .accountArea {
    width: 30%;
    height: 100%;

    .a_container {
      margin-top: 40px;
    }

    .icon_Container {
      display: flex;
      justify-content: center;

      .icon_Image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }

    .accountTxtContainer {
      display: flex;
      flex-direction: column;
      row-gap: 16px;

      .a_userNameContainer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .userTitle {
          font-size: 1.7em;
          font-weight: 900;
          width: 100%;
          text-align: center;
        }
        .userName {
          @extend %userInfoUnder;
          font-size: 2em;
          font-weight: 900;
        }
      }

      .a_userCourseContainer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .a_userTitle {
          font-size: 1.7em;
          font-weight: 900;
          width: 100%;
          text-align: center;
        }

        .userCourse {
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
    width: 70%;
    height: 100%;

    .m_header {
      width: 100%;
      height: 15%;
      background-color: #c7887fdd;

      .headerTitle_container {
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
          appearance: menulist;
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

    .m_container {
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
    position: relative;

    .accountArea {
      width: 100%;
      height: 25%;
      position: absolute;
      display: flex;

      .a_container {
        display: flex;
        width: 30%;
        margin-top: 0;
      }

      .icon_Container {
        margin: 0px;
        margin-top: 12px;
        margin-left: 10px;

        .icon_Image {
          width: 170px;
          height: 170px;
          border-radius: 50%;
        }
      }

      .accountTxtContainer {
        width: 80%;
        height: 100%;
        flex-direction: row;
        row-gap: 0;
        column-gap: 16px;
        align-items: center;
        justify-content: center;

        .a_userNameContainer {
          .userName {
            font-size: 2em;
            font-weight: 900;
          }
        }

        .a_userCourseContainer {
          .a_userTitle {
            font-size: 1.7em;
            font-weight: 900;
          }

          .userCourse {
            font-size: 2em;
            font-weight: bold;
          }
        }
      }
    }

    // --------------------------
    /* メモ 始まり */
    // -------------------------
    .memoArea {
      width: 100%;
      height: 50%;
      margin-top: 200px;

      .m_header {
        width: 100%;
        height: 25%;
        background-color: #c7887fdd;
      }
    }
  }
}
</style>

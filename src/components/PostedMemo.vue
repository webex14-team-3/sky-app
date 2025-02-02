<template>
  <div class="all_Container">
    <section class="header_Area">
      <img class="icon" :src="memo.userImg" />
      <div class="user_container">
        <div class="userName userTitle">
          <p>{{ memo.userName }}</p>
        </div>
        <div class="userCourse userTitle">
          <p>{{ memo.userCourse }}</p>
        </div>
      </div>
      <div class="memoTitle">
        <p>{{ memo.title }}</p>
      </div>
    </section>
    <section class="bottom_Area">
      <div class="favorite_Container">
        <div class="box" v-if="!hideLikeBtn">
          <button
            class="bubbly-button"
            @click="toggleLike"
            :class="{ change: likeBtn }"
          >
            <font-awesome-icon icon="fa-heart" class="fa-solid fa-heart" />
          </button>
        </div>
        <p class="countMsg" v-if="!hideLikeBtn">{{ localMemo.likeCount }}</p>
        <div class="memoDate">
          <p>{{ memo.date }}</p>
        </div>
      </div>
      <div class="memoContainer">
        <p>{{ memo.memo }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"
import { db } from "@/firebase"
import { getAuth } from "firebase/auth"

export default {
  name: "PostedMemoContainer",
  props: {
    memo: {
      type: Object,
      required: true,
    },
    hideLikeBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      likeBtn: false,
      currentUserId: null,
      localMemo: { ...this.memo },
    }
  },
  created() {
    // 現在ログイン中のユーザーIDを取得
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      this.currentUserId = user.uid
    }

    // ログインユーザーが「いいね」しているかどうかを判定
    if (
      this.currentUserId &&
      this.localMemo.likeUser &&
      this.localMemo.likeUser.includes(this.currentUserId)
    ) {
      this.likeBtn = true
    } else {
      this.likeBtn = false
    }
  },
  methods: {
    async toggleLike() {
      if (!this.currentUserId) return

      try {
        const memoRef = doc(db, "userMemos", this.localMemo.id)

        // いいね追加
        if (!this.likeBtn) {
          await updateDoc(memoRef, {
            likeCount: increment(1),
            likeUser: arrayUnion(this.currentUserId),
          })
          this.localMemo.likeCount++
          this.localMemo.likeUser.push(this.currentUserId)
          this.likeBtn = true

          // いいね解除
        } else {
          await updateDoc(memoRef, {
            likeCount: increment(-1),
            likeUser: arrayRemove(this.currentUserId),
          })
          this.localMemo.likeCount--
          this.localMemo.likeUser = this.localMemo.likeUser.filter(
            (uid) => uid !== this.currentUserId
          )
          this.likeBtn = false
        }
      } catch (e) {
        console.error("likeCount の更新に失敗しました", e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/likeIcon.scss";

%userInfoUnder {
  text-decoration: underline;
  text-decoration-color: rgb(218, 142, 30);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.all_Container {
  width: 90%;
  margin: 40px auto;
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(2px 6px 8px #dddddd);

  .header_Area {
    border-bottom: 2px solid black;
    display: flex;
    height: 70px;

    .icon {
      margin: 5px;
      width: 60px;
      height: 60px;
      border-radius: 50% 50%;
      user-select: none;
    }

    .user_container {
      min-width: 25%;
      max-width: 30%;

      .userName {
        font-weight: 900;
        padding: 5px 10px 0;
        @extend %userInfoUnder;
      }

      .userCourse {
        padding: 10px 10px 0;
        font-weight: bold;
        @extend %userInfoUnder;
      }
    }

    .memoTitle {
      width: 100%;
      display: flex;
      align-items: center;

      p {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }

  .bottom_Area {
    word-break: break-word;
    white-space: pre-wrap;
    max-width: 100%;
    height: 100%;
    overflow: auto;

    .favorite_Container {
      display: flex;
      padding: 4px 0 0 8px;

      .countMsg {
        font-weight: bold;
        margin: 5px 0 0 40px;
      }

      .memoDate {
        position: absolute;
        right: 20px;
        top: -23px;
      }
    }

    .memoContainer {
      margin-top: 10px;
      margin-left: 10px;
      margin-bottom: 5px;
      text-align: left;
      user-select: contain;
      font-weight: bold;
    }
  }
}

// ----------------------------
// スマホ版
// ------------------------------

@media screen and (max-width: 690px) {
  .memoTitle {
    width: 100%;
    display: flex;
    align-items: center;

    p {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .userTitle {
    font-size: 15px;
  }
}
</style>

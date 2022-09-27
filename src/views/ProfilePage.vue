<template>
  <div class="allContainer">
    <!-- アイコン 始まり -->
    <section class="icon">
      <h1 class="profileTitle">アイコン</h1>
      <div class="icon_Container">
        <img class="icon_Container_user" :src="inputUserImage" />
      </div>
    </section>
    <!-- アイコン 終わり -->

    <!-- ユーザーネーム 始まり -->
    <section class="userName">
      <h1 class="profileTitle">ユーザーネーム(10文字まで)</h1>
      <div class="userName_Container">
        <input
          class="inputContainer"
          type="text"
          maxlength="10"
          v-model="inputUserName"
          :placeholder="inputPlaceholder"
        />
      </div>
      <div class="transparentCode">{{ getuserName }}</div>
    </section>
    <!-- ユーザーネーム 終わり -->

    <!-- コース 始まり -->
    <section class="courseArea">
      <h1 class="profileTitle">コース</h1>
      <div class="courseContainer">
        <select class="courseSelect" v-model="inputUserCourse">
          <option value="IPhone">iPhoneアプリ開発コース</option>
          <option value="Game">Gameアプリ開発コース</option>
          <option value="Web">webサービス開発コース</option>
          <option value="WebExpert">WebExpertコース</option>
          <option value="VideoEditor">VideoEditorコース</option>
          <option value="UIUX">UI/UXコース</option>
          <option value="AI">AIコース</option>
          <option value="Python">Pythonコース</option>
        </select>
      </div>
    </section>
    <!-- コース 終わり -->

    <!-- ボタン 始まり -->
    <section class="Savebutton">
      <button class="Savebutton_button" @click="allSave">
        <span>決定</span>
      </button>
    </section>
    <!-- ボタン 終わり -->
  </div>
</template>

<script>
import {
  getAuth,
  // signInWithPopup,
  // GoogleAuthProvider,
  onAuthStateChanged,
  // signOut,
} from "firebase/auth"
import {
  // setDoc,
  doc,
  updateDoc,
  collection,
  // addDoc,
  // deleteField,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/firebase"

export default {
  name: "ProfilePage",
  data() {
    return {
      inputUserCourse: "",
      getuserName: "",
      geetusercourse: "",
      inputPlaceholder: "名無し",
      inputUserName: "",
      inputUserImage: "",
    }
  },
  created() {
    const auth = getAuth()
    // ログイン後のユーザー情報を取得するには,onAuthStateChangedが最初に必要
    onAuthStateChanged(auth, async (user) => {
      // プロフィール設定している場合
      if (user) {
        const user = auth.currentUser
        const userID = user.uid
        const docRef = doc(db, "users", userID)
        const docSnap = await getDoc(docRef)
        // console.log("Profile => docSnap" + ":" + docSnap.data())
        if (docSnap.exists()) {
          this.inputUserName = docSnap.data().userName
          this.inputUserCourse = docSnap.data().userCourse
          this.inputUserImage = docSnap.data().userImg
        } else {
          // console.log("Profile => ユーザー情報がないよ！")
        }
      }
    })
  },
  methods: {
    async allSave() {
      if (this.inputUserName !== "" && this.inputUserCourse !== "") {
        const auth = getAuth()
        const user = auth.currentUser
        await updateDoc(doc(db, "users", user.uid), {
          userName: this.inputUserName,
          userCourse: this.inputUserCourse,
        })

        // --------------------------------------------------------
        // 更新したとき、過去に投稿したメモのユーザー名も更新するコード
        // ------------------------------------------------------------
        const a = query(
          collection(db, "userMemos"),
          where("userID", "==", user.uid)
        )
        const querySnapshot = await getDocs(a)

        let idBoxes = []
        querySnapshot.forEach(async (doc) => {
          idBoxes.push(doc.id)
        })
        for (let i = 0; i < idBoxes.length; i++) {
          const userMemosRef = doc(db, "userMemos", idBoxes[i])
          updateDoc(userMemosRef, {
            userName: this.inputUserName,
          })
        }

        // 初めてアカウントを作った場合、リロードすることで画像が表示される仕組みにする
        const firstCreateData = user.metadata.creationTime
        const lastCreateData = user.metadata.lastSignInTime
        if (firstCreateData === lastCreateData) {
          location.reload()
        }
        alert("変更しました！")
      } else {
        alert("どっちも入力してね!")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_reset.scss";

$containerMargin-top: 40px;

.allContainer {
  // border: 2px solid red;
  height: 100vh;
  padding-top: 30px;
  background-color: rgba(253, 244, 232, 0.747);
  user-select: none;

  section {
    // border: 2px solid red;
    margin: 30px auto;
  }

  .profileTitle {
    // border: 2px solid green;
    text-align: center;
    font-weight: bold;
    font-size: 1.3em;
    border-bottom: 2px solid #000;
  }

  /* アイコン 始まり */
  .icon {
    // border: 2px solid indianred;
    max-width: 80%;

    .icon_Container {
      // border: 2px solid greenyellow;
      display: flex;
      justify-content: center;
    }

    .icon_Container_user {
      // border: 2px solid red;
      margin: auto;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      color: black;
      margin: 20px auto 0px;
    }
  }

  // -------------------------
  /* ユーザーネーム 始まり */
  // ---------------------------

  .userName {
    /* border: 2px solid blue; */
    max-width: 80%;
  }

  .userName_Container {
    /* border: 2px solid red; */
    margin: 0 auto;
    display: flex;
    justify-content: center;

    input {
      text-align: center;
      width: 60%;
      height: 40px;
      border: 2px solid rgb(73, 72, 72);
      background-color: white;
      font-size: 30px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      margin-top: $containerMargin-top;
    }
  }

  // -----------------------------
  /* コース 始まり */
  // -------------------------------

  .courseArea {
    // border: 2px solid brown;
    max-width: 80%;
  }

  .courseContainer {
    // border: 2px solid red;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .courseSelect {
    margin-top: $containerMargin-top;
    height: 40px;
    width: 60%;
    border: 2px solid rgb(73, 72, 72);
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid black;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    letter-spacing: 2px;
    -moz-appearance: menulist;
    -webkit-appearance: menulist;

    option {
      text-align: center;
    }
  }

  // -------------------------------
  /* 決定ボタン 始まり */
  // --------------------------------

  .Savebutton {
    // border: 2px solid red;
    text-align: center;

    .Savebutton_button {
      background-color: #c7887fdd;
      border: 2px solid #645856dd;
      border-radius: 10px;
      font-size: 40px;
      font-weight: 900;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      padding: 7px 20px;
      margin-top: 40px;

      &:hover {
        cursor: pointer;
        filter: brightness(115%);
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
}
</style>

<template>
  <div class="allScreen">
    <!-- アイコン 始まり -->
    <section class="icon">
      <h1 class="icon-title">アイコン</h1>
      <div class="icon-Container">
        <img class="icon-Container-user" v-bind:src="inputUserImage" />
      </div>
    </section>
    <!-- アイコン 終わり -->

    <!-- ユーザーネーム 始まり -->
    <section class="userName">
      <h1 class="userName-title">ユーザーネーム(10文字まで)</h1>
      <div class="userName-Container">
        <br />
        <input type="text" maxlength="10" v-model="inputUserName" />
      </div>
      <div class="transparentCode">{{ getuserName }}</div>
    </section>
    <!-- ユーザーネーム 終わり -->

    <!-- コース 始まり -->
    <section class="courseName">
      <h1 class="courseName-title">コース</h1>
      <div class="courseName-Container">
        <div class="courseName-Container-icon"></div>
        <!-- <input type="text" v-model="name" /> -->
        <select class="courseName-Container-select" v-model="inputUserCourse">
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
      <button class="Savebutton-button" @click="allSave">
        <span>決定</span>
      </button>
      <div class="transparentCode">{{ getuserName }}</div>
      <div class="transparentCode">{{ geetusercourse }}</div>
    </section>
    <!-- ボタン 終わり -->
  </div>
</template>

<script>
import {
  getAuth,
  // signInWithPopup,
  // GoogleAuthProvider,
  // onAuthStateChanged,
  // signOut,
} from "firebase/auth"
import {
  // setDoc,
  // doc,
  updateDoc,
  // collection,
  // addDoc,
  // updateDoc,
  // deleteField,
  // getDoc,
  // getDocs,
  // query,
  // where,
} from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      inputUserName: "",
      inputUserCourse: "",
      // inputUserImage:
      // "https://images.en-courage.com/3wM0O9FT06N8UJHTDFDOvJyOst9AdBqKUZIbc1LlUqYsor6mc2XP2Ue7VgW3E5EO.jpg",
      getuserName: "",
      geetusercourse: "",
    }
  },
  computed: {
    inputUserImage() {
      const auth = getAuth()
      const user = auth.currentUser.photoURL
      return user
    },
  },
  methods: {
    async allSave() {
      console.log(this.inputUserName)
      console.log(this.inputUserCourse)
      if (this.inputUserName !== "" && this.inputUserCourse !== "") {
        this.getuserName = this.inputUserName
        const auth = getAuth()
        const user = auth.currentUser
        const washingtonRef = db.collection("users").doc(user.uid)
        await updateDoc(washingtonRef, {
          inputUserName: "",
        })
        // await setDoc(doc(db, "users", user.uid), {
        //   userName: this.inputUserName,
        //   userEmail: user.email,
        //   userImage: this.userImage,
        //   userCourse: this.inputUserCourse,
        // })
        // location.reload()
        alert("変更しました！")
      } else {
        alert("どっちも入力してね!")
      }
    },
  },
}
</script>

<style scoped>
.allScreen {
  border: 2px solid rgba(253, 244, 232, 0.747);
  height: 100vh;
  padding: 0px;
  margin: -10px;
  color: #ac4949;
  background-color: rgba(253, 244, 232, 0.747);
}

.allScreen section {
  /* border: 2px solid red; */
  margin: 15px auto;
}

/* アイコン 始まり */
.icon {
  /* border: 2px solid indianred; */
  max-width: 80%;
}

.icon-title {
  /* border: 2px solid green; */
  text-align: center;
  margin: 0 auto;
  border-bottom: 2px solid #000;
  user-select: none;
}

.icon-Container {
  /* border: 2px solid greenyellow; */
  display: flex;
  justify-content: center;
}

.icon-Container-user {
  margin: auto;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  color: black;
  margin: 15px auto 0px;
}

.icon-Container-user:hover {
  cursor: pointer;
  filter: brightness(90%);
}

.icon-Container-user:active {
  transform: scale(0.98);
}

/* アイコン 終わり */

/* ユーザーネーム 始まり */
.userName {
  /* border: 2px solid blue; */
  max-width: 80%;
}

.userName-title {
  text-align: center;
  width: 100%;
  border-bottom: 2px solid #000;
  user-select: none;
}

.userName-Container {
  /* border: 2px solid red; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.userName-Container input {
  text-align: center;
  width: 50%;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

/* ユーザーネーム 終わり */

/* コース 始まり */
.courseName {
  /* border: 2px solid brown; */
  max-width: 80%;
}

.courseName-title {
  text-align: center;
  width: 100%;
  border-bottom: 2px solid #000;
  user-select: none;
}

.courseName-Container {
  /* border: 2px solid red; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.courseName-Container select {
  width: 50%;
  height: 30px;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

/* コース 終わり */

/* 決定ボタン 始まり */
.Savebutton {
  /* border: 2px solid red; */
  text-align: center;
}

.Savebutton-button {
  background-color: #c7887fdd;
  border: 2px solid #645856dd;
  border-radius: 10px;
  font-size: 35px;
  font-weight: 900;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding: 5px 15px;
  margin-top: 20px;
  user-select: none;
}

.Savebutton-button:hover {
  cursor: pointer;
  filter: brightness(90%);
}

.Savebutton-button:active {
  transform: scale(0.98);
}

/* 決定ボタン 終わり */
.transparentCode {
  /* color: transparent; */
  user-select: none;
  position: absolute;
}
</style>

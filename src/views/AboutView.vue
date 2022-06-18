<template>
  <div class="allScreen">
    <!-- アイコン 始まり -->
    <section class="icon">
      <h1 class="icon-title">アイコン</h1>
      <div class="icon-Container">
        <button class="icon-Container-user"></button>
      </div>
    </section>
    <!-- アイコン 終わり -->

    <!-- ユーザーネーム 始まり -->
    <section class="userName">
      <h1 class="userName-title">ユーザーネーム(10文字まで)</h1>
      <div class="userName-Container">
        <input type="text" maxlength="10" v-model="name" />
        <div>{{ name }}</div>
      </div>
    </section>
    <!-- ユーザーネーム 終わり -->

    <!-- コース 始まり -->
    <section class="courseName">
      <h1 class="courseName-title">コース</h1>
      <div class="courseName-Container">
        <div class="courseName-Container-icon"></div>
        <!-- <input type="text" v-model="name" /> -->
        <select class="courseName-Container-select" v-model="course">
          <option value="IPhone">iPhoneアプリ開発コース</option>
          <option value="Game">Gameアプリ開発コース</option>
          <option value="Web">webサービス開発コース</option>
          <option value="WebExpert">WebExpertコース</option>
          <option value="VideoEditor">VideoEditorコース</option>
          <option value="UIUX">UI/UXコース</option>
          <option value="AI">AIコース</option>
          <option value="Python">Pythonコース</option>
        </select>
        <div>{{ course }}</div>
      </div>
    </section>
    <!-- コース 終わり -->

    <!-- ボタン 始まり -->
    <section class="Savebutton">
      <button class="Savebutton-button" v-on:click="allSave">
        <span>決定</span>
      </button>
      <div>{{ name }}</div>
      <div>{{ course }}</div>
    </section>
    <!-- ボタン 終わり -->
  </div>
</template>

<script>
import { getDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      name: "",
      course: "",
    }
  },
  methods: {
    async allSave() {
      console.log(this.name)
      console.log(this.course)
      if (this.name !== "" && this.course !== "") {
        await setDoc(doc(db, "users", `${this.$store.state.user.uid}`), {
          userName: this.name,
          course: this.course,
        })
        // location.reload()
      } else {
        alert("どっちも入力してね!")
      }
    },
  },
  //ページが読み込まれたときに実行される関数
  async created() {
    if (!this.$store.state.user) {
      alert("ログインしてください")
      // ↓ path:を定義すると画面遷移ができる
      // (ログインしないとプロフィールに行けないようになるコード)
      this.$router.push({ path: "/" })
      // ↓ {}内で処理をとどめるコード
      return
    }
    const docRef = doc(db, "users", `${this.$store.state.user.uid}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      this.user = { ...docSnap.data() }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  },
}
</script>

<style scoped>
.allScreen {
  /* border: 2px solid red; */
  padding: 0px;
  margin: 0px;
  color: #ac4949;
  background-color: rgba(253, 244, 232, 0.747);
}
.allScreen section {
  /* border: 2px solid red; */
  margin: 40px auto;
}
/* アイコン 始まり */
.icon {
  /* border: 2px solid indianred; */
  max-width: 80%;
}
.icon-title {
  /* border: 2px solid green; */
  text-align: center;
  border-bottom: 2px solid #000;
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
}

.userName-Container {
  /* border: 2px solid red; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.userName-Container input {
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
}
.courseName-Container {
  /* border: 2px solid red; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.courseName-Container select {
  width: 50%;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
/* コース 終わり */

/* 決定ボタン 始まり */
.Savebutton {
  /* border: 2px solid red; */
  text-align: center;
  margin: 70px auto;
}

.Savebutton-button {
  background-color: #c7887fdd;
  border: 2px solid #645856dd;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 900;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding: 5px 10px;
}
.Savebutton-button:hover {
  cursor: pointer;
  filter: brightness(90%);
}
.Savebutton-button:active {
  transform: scale(0.98);
}
/* 決定ボタン 終わり */
</style>

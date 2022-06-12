<template>
  <div class="about">
    <h1 class="profile">プロフィール</h1>
    <div class="profile-container">
      <div class="icon"></div>
      <input type="text" v-model="name" />
      <button v-on:click="insertUserInfo">保存</button>
      <div>{{ user.name }}</div>
    </div>
  </div>
</template>

<script>
import { getDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      user: null,
      name: "",
    }
  },
  methods: {
    async insertUserInfo() {
      if (this.name !== "") {
        await setDoc(doc(db, "users", "LA"), {
          name: this.name,
        })
        location.reload()
      }
    },
  },

  //ページが読み込まれたときに実行される関数
  async created() {
    const docRef = doc(db, "users", "LA")
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
.about {
  padding: 10px;
  color: #ac4949;
}
.profile {
  text-align: center;
  width: 100%;
  border-bottom: 2px solid #000;
}
.icon {
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: black;
}

.profile-container {
  margin: 0 auto;
  width: max-content;
}
</style>

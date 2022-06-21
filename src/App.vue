<template>
  <div class="app">
    <!-- router-linkでいれたものを、<router-view>で呼び出せる。 -->
    <!-- コンポーネントの書き方を変えられる  -->
    <!-- どちらも必要 -->
    <div class="header">
      <HeaderSpace />
    </div>
    <div class="contents">
      <router-view />
      <!-- <posted-memo
        v-for="memo in memos"
        v-bind:key="memo.id"
        v-bind:memo="memo"
      /> -->
    </div>
  </div>
</template>

<script>
import HeaderSpace from "@/components/HeaderSpace.vue"
// import PostedMemo from "@/components/PostedMemo.vue"

// import { collection, getDocs } from "firebase/firestore"
// import { db } from "./firebase"

export default {
  components: {
    HeaderSpace,
    // PostedMemo,
  },
  // data() {
  //   return {
  //     memos: [],
  //   }
  // },
  // created() {
  //   getDocs(collection(db, "testMemos")).then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       this.memos.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       })
  //     })
  //   })
  // },
}
</script>

<style scoped>
.contents {
  margin-top: 10px;
}
.header {
  margin: 0px;
  padding: 0px;
}
</style>

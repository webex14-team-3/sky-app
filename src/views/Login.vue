<template>
  <button @click="googleLogin">ログイン</button>
  <p>{{ user }}</p>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

export default {
  name: "logIn",
  data() {
    return {
      user: null,
    }
  },
  methods: {
    googleLogin() {
      // new"ネームプレート" provider "インスタンス"
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, provider).then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // const token = credential.accessToken
        this.user = result.user
      })
    },
  },
}
</script>

<style scoped>
/* template {
  text-align: center;
} */
</style>

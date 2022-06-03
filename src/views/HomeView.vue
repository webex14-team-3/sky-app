<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
}
</script> -->

<!-- test -->
<template>
  <v-container>
    <div v-if="currentUser == null">
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-actions>
          <v-col>
            <v-text-field v-model="emailText" label="E-MAIL"> </v-text-field>
            <v-text-field
              v-model="passwordText"
              label="PASSWORD"
              type="password"
            >
            </v-text-field>
            <v-btn @click="signin" color="primary"> E-Mail SIgn In </v-btn>
            <v-btn color="primary" @click="createAccount"> Sign Up </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <h2>Success to sign in with firebase auth!</h2>
      <v-btn @click="signout"> Sign Out </v-btn>
    </div>
  </v-container>
</template>
<script>
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"

export default {
  name: "loginPage",
  data: () => ({
    emailText: "",
    passwordText: "",
    currentUser: null,
  }),
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        this.currentUser = user
      } else {
        this.currentUser = null
      }
    })
  },
  methods: {
    signin() {
      if (this.emailText == "" || this.passwordText == "") return
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.emailText, this.passwordText)
        .then((userCredential) => {
          // Sign In
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    },
    createAccount() {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.emailText, this.passwordText)
        .then((userCredential) => {
          // Create Account
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    },
    signout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.currentUser = null
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

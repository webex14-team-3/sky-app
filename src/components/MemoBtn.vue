<template>
  <div class="uploadArea">
    <div class="uploadBtn" @click="uploadBtn">
      <p class="uploadTxt">投稿する</p>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  methods: {
    uploadBtn() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push("/MemoFormat")
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_reset.scss";

.uploadArea {
  width: 30%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 0px;
  z-index: 1;

  .uploadBtn {
    border: 2px solid #ce8d83dd;
    border-radius: 5px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    min-height: 70%;
    max-height: 70%;
    background-color: #dd988edd;
    color: white;
    z-index: 0;

    &:hover {
      cursor: pointer;
      filter: brightness(105%);
    }

    &:active {
      transform: scale(0.99);
    }
  }

  .uploadTxt {
    /* border: 2px solid red; */
    font-size: 30px;
    font-family: "Roboto";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    padding: 0px;
    margin: 0px;
    user-select: none;
  }
}
</style>

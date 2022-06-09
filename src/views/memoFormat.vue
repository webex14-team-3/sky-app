<template>
  <body>
    <div class="container">
      <span class="title">タイトル</span>
      <!-- タイトル 始まり -->
      <section class="container-title">
        <input type="text" class="contaner-title-input" />
      </section>
      <!-- タイトル 終わり -->

      <span class="main">本文</span>
      <!-- 本文 始まり -->
      <section class="container-main">
        <textarea
          class="container-main-input"
          id="container-main-input"
          name="main"
        ></textarea>
      </section>
      <!-- 本文 終わり -->

      <span class="function">機能</span>
      <!-- 機能 始まり -->
      <section class="container-function">
        <button class="container-function-colorChangeButton">
          <span>C</span>
        </button>
        <button class="container-function-fontSizeUpChangeButton">
          <span>A↑</span>
        </button>
        <button class="container-function-fontSizeDownChangeButton">
          <span>A↓</span>
        </button>
        <div class="container-function-underbar">
          <button class="container-function-underbarButton">
            <span>＿</span>
          </button>
          <input
            type="submit"
            class="container-function-underbarButton-option"
            value="C"
          />
        </div>
        <button class="container-function-bold">
          <span>B</span>
        </button>
        <button class="container-function-VScode">
          <span>VScode</span>
        </button>
        <button class="container-function-img">
          <span>Img</span>
        </button>
        <button class="container-function-fail">
          <span>File</span>
        </button>
      </section>
      <!-- 機能 終わり -->

      <!-- 投稿 始まり -->
      <section class="container-upload">
        <button class="container-upload-button">
          <span>投稿</span>
        </button>
      </section>
      <!-- 投稿 終わり -->
    </div>
  </body>
</template>

<script></script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  position: relative;
}
.container {
  border: 4px solid black;
  width: 80%;
  height: 650px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: rgb(247, 247, 247);
}
.container span {
  color: black;
  font-size: 20px;
  font-weight: 900;
}
.container .title {
  position: absolute;
  left: 25px;
  top: 7px;
}
.container .main {
  position: absolute;
  left: 25px;
  top: 90px;
}
.container .function {
  position: absolute;
  left: 25px;
  bottom: 115px;
}

/* タイトル 始まり */
.container-title {
  /* border: 2px solid red; */
  width: 90%;
  height: 50px;
  position: absolute;
  bottom: auto;
  top: 35px;
  display: flex;
  justify-content: center;
}
.contaner-title-input {
  width: 100%;
  height: 80%;
  font-size: large;
  font-weight: 900;
  position: absolute;
  bottom: 0px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/* タイトル 終わり */

/* 本文 始まり */
.container-main {
  border: 2px solid green;
  width: 90%;
  height: 100px;
  position: absolute;
  top: 120px;
  display: flex;
  flex-wrap: wrap;
}
.container-main-input {
  width: 100%;
  height: 100px;
  font-size: 15px;
  font-weight: 900;
  padding: 7px 5px 10px 5px;
  /* overflow: scroll; */
}
/* 本文 終わり */

/* 機能 始まり */
.container-function {
  border: 4px solid #f5a194dd;
  width: 90%;
  height: 45px;
  position: absolute;
  bottom: 70px;
  display: flex;
  justify-content: space-around;
  background-color: white;
}
.container-function-underbar {
  /* border: 2px solid red; */
  width: auto;
  height: 100%;
  display: flex;
}
.container-function-underbarButton-option {
  width: 20px;
  display: block;
  font-size: 20px;
  font-weight: bold;
  padding: 0;
  background-color: rgb(247, 239, 227);
  border: 2px solid #c7887fdd;
}
.container-function-underbarButton-option:hover {
  cursor: pointer;
  background-color: rgb(239, 231, 219);
}
.container-function-underbarButton-option:active {
  transform: scale(0.98);
}
.container-function button {
  border: 2px solid #c7887fdd;
  background-color: rgb(247, 239, 227);
}
.container-function button:hover {
  cursor: pointer;
  background-color: rgb(239, 231, 219);
}
.container-function button:active {
  transform: scale(0.98);
}

/* 機能 終わり */

/* 投稿 始まり */
.container-upload {
  border: 2px solid red;
  width: 90%;
  height: 50px;
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: center;
}
.container-upload-button {
  border: 2px solid green;
  width: 30%;
  height: 100%;
  background-color: #c7887fdd;
}
.container-upload-button:hover {
  cursor: pointer;
  background-color: #be7a70dd;
  color: rgb(232, 227, 227);
}
.container-upload-button:active {
  transform: scale(0.98);
}
.container-upload-button span {
  font-size: 30px;
  font-weight: 900;
  color: white;
}
/* 投稿 終わり */
</style>

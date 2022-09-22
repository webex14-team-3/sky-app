<template>
  <div class="posted-memo">
    <div class="timelineSpace-upload-user" v-bind:class="memoClass">
      <div class="timelineSpace-upload-user-information">
        <div class="header">
          <!-- <router-link to="myAcount"> -->
          <img class="account-icon" :src="memo.userImg" />
          <!-- </router-link> -->
          <div class="timelineSpace-upload-user-information-name">
            <span>{{ memo.userName }}</span>
          </div>
          <div class="timelineSpace-upload-user-information-course">
            <span>{{ memo.userCourse }}</span>
          </div>
          <div class="timelineSpace-upload-user-information-title">
            <span>{{ memo.title }}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="timelineSpace-upload-user-favorite">
            <label>
              <input
                type="checkbox"
                class="timelineSpace-upload-user-favorite-input"
              />
              <span>お気に入り</span>
            </label>
          </div>
          <hr />
          <!-- <nav> -->
          <!-- <li> -->
          <a class="timelineSpace-upload-user-link">
            <div class="timelineSpace-upload-user-text">
              <span>{{ memo.memo }}</span>
            </div>
          </a>
          <!-- </li> -->
          <!-- </nav> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    memo: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.posted-memo {
  width: 100%;
}

.account-icon {
  margin: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50% 50%;
  background-color: aquamarine;
}
.header {
  /* border: 2px solid blue; */
  border-bottom: 2px solid black;
  display: flex;
  height: 60px;
}
.bottom {
  /* border: 2px solid green; */
  resize: none;
  overflow: auto;
  max-width: 100%;
  max-height: 150px;
  min-width: 100%;
  min-height: 100%;
}

.timelineSpace-upload-user {
  /* border: 2px solid royalblue; */
  box-shadow: 5px 5px 5px #dddddd;
  width: 90%;
  height: auto;
  margin: 15px auto;
  border-radius: 10px;
  background-color: white;
}
.timelineSpace-upload-user-favorite {
  /* border: 2px solid red; */
  display: flex;
  position: relative;
}
.timelineSpace-upload-user-favorite-input {
  position: relative;
  top: 0px;
}
.timelineSpace-upload-user-favorite-input:hover {
  cursor: pointer;
}
.timelineSpace-upload-user-favorite span {
  /* border: 2px solid blue; */
  color: red;
  font-weight: bold;
  position: relative;
  bottom: 0;
}
.timelineSpace-upload-user-information {
  /* border: 2px solid red; */
  /* display: flex; */
  position: relative;
  border-bottom: 1px solid black;
}
/* .timelineSpace-upload-user-information-iconButton {
  border: 2px solid peru;
  width: 50px;
  height: 50px;
  border-radius: 50% 50%;
  background-color: black;
  margin: 5px;
} */
.timelineSpace-upload-user-information-iconButton:hover {
  cursor: pointer;
}
.timelineSpace-upload-user-information-iconButton:active {
  transform: scale(0.98);
}
.timelineSpace-upload-user-information-name {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  top: 15px;
  font-weight: 900;
}
.timelineSpace-upload-user-information-course {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  font-weight: bold;
  top: 15px;
}
.timelineSpace-upload-user-information-title {
  /* border: 2px solid blue; */
  font-size: 20px;
  font-weight: bold;
  margin: auto 10px;
  position: relative;
  top: 15px;
}
nav {
  list-style: none;
}
nav li {
  /* border: 2px solid red; */
  width: 100%;
  height: 85px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.timelineSpace-upload-user-text {
  /* border: 2px solid red; */
  word-break: break-word;
  white-space: pre-wrap;
  text-align: left;
}
.memo-text {
  /* border: 2px solid red; */
  max-width: 100%;
  max-height: 300px;
  height: 100%;
  margin-top: 10px;
  margin-left: 10px;
  /* font-size: 20px; */
  position: relative;
  top: 0px;
}

/* スマートフォン用 始まり */
@media screen and (max-width: 640px) {
  .timelineSpace-upload-user-information-name {
    /* border: 2px solid green; */
    position: relative;
    top: -10px;
    left: -7px;
    /* margin: 0px; */
    /* padding: 0px; */
  }
  .timelineSpace-upload-user-information-course {
    /* border: 2px solid green; */
    position: relative;
    top: -10px;
    left: 0px;
  }
  .timelineSpace-upload-user-information-title {
    /* border: 2px solid green; */
    font-size: 15px;
    position: absolute;
    top: 33px;
    left: 50px;
  }
}
</style>

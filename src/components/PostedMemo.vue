<template>
  <div class="timelineSpace-upload-user" v-bind:class="memoClass">
    <div class="timelineSpace-upload-user-information">
      <!-- <router-link to="myAcount"> -->
      <img class="account-icon" v-bind:src="memo.img" />
      <!-- </router-link> -->
      <div class="timelineSpace-upload-user-information-name">
        <span>{{ memo.userName }}</span>
      </div>
      <div class="timelineSpace-upload-user-information-course">
        <span>{{ memo.course }}</span>
      </div>
      <div class="timelineSpace-upload-user-information-title">
        <span>{{ memo.title }}</span>
      </div>
    </div>
    <!-- <div class="timelineSpace-upload-user-favorite">
      <label>
        <input
          type="checkbox"
          class="timelineSpace-upload-user-favorite-input"
        />
        <span>お気に入り</span>
      </label>
    </div> -->
    <nav>
      <li>
        <a class="timelineSpace-upload-user-link">
          <div class="timelineSpace-upload-user-text">
            {{ memo.text }}
          </div>
        </a>
      </li>
    </nav>
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
  width: 50%;
}

.account-icon {
  margin: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50% 50%;
}

.timelineSpace-upload-user {
  /* border: 2px solid royalblue; */
  box-shadow: 5px 5px 5px #dddddd;
  width: 70%;
  height: 25%;
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
  display: flex;
  position: relative;
  border-bottom: 1px solid black;
}
.timelineSpace-upload-user-information-iconButton {
  /* border: 2px solid peru; */
  width: 50px;
  height: 50px;
  border-radius: 50% 50%;
  background-color: aqua;
  margin: 3px;
}
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
}
.timelineSpace-upload-user-information-course {
  /* border: 2px solid blue; */
  margin: auto 10px;
  position: relative;
  top: 15px;
}
.timelineSpace-upload-user-information-title {
  /* border: 2px solid blue; */
  font-size: 25px;
  font-weight: bold;
  margin: auto 10px;
  /* position: relative; */
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
  margin-top: 10px;
  margin-left: 10px;
  /* font-size: 20px; */
  position: absolute;
  left: 0px;
}
</style>

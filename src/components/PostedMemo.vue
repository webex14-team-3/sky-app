<template>
  <div class="posted-memo" v-bind:class="memoClass">
    <!-- <div class="timelineSpace-upload-headerTitle">
      <span> 更新日:2022/06/10 </span>
    </div>
    <div class="timelineSpace-upload-user">
      <div class="timelineSpace-upload-user-information">
        <router-link to="myAcount">
          <input
            type="submit"
            value="icon"
            class="timelineSpace-upload-user-information-iconButton"
        /></router-link>

        <div class="timelineSpace-upload-user-information-name">
          <span>名前</span>
        </div>
        <div class="timelineSpace-upload-user-information-course">
          <span>コース名</span>
        </div>
      </div>
      <div class="timelineSpace-upload-user-favorite">
        <label>
          <input
            type="checkbox"
            class="timelineSpace-upload-user-favorite-input"
          />
          <span>お気に入り</span>
        </label>
      </div>
      <nav>
        <li>
          <a href="#" class="timelineSpace-upload-user-link">
            <div class="timelineSpace-upload-user-link-titleName">タイトル</div>
          </a>
        </li>
      </nav>
    </div> -->
    <p>{{ memo.title }}</p>
    <p>{{ memo.text }}</p>
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
  width: 90%;
  margin: 10px auto;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: yellow;
  color: black;
}
</style>

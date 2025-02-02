<template>
  <div class="App">
    <div class="HeaderContainer">
      <HeaderSpace />
    </div>
    <div class="Contents">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderSpace from "@/components/HeaderSpace.vue"
export default {
  components: {
    HeaderSpace,
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_reset.scss";

@media screen and (max-width: 700px) {
  .App {
    height: 1080px;
    width: 700px;
    position: absolute;
    transform-origin: 0% 0%;
  }
}
</style>

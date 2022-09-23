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
@import "@/assets/css/_reset.scss";
</style>

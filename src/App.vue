<template>
  <!-- router-linkでいれたものを、<router-view>で呼び出せる。 -->
  <!-- コンポーネントの書き方を変えられる  -->
  <!-- どちらも必要 -->
  <headerSpace />
  <div class="container"><router-view /></div>
  <router-link to="/"></router-link>
</template>

<script>
import headerSpace from "@/views/headerSpace.vue"
export default {
  components: { headerSpace },
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}
</style>

<template>
  <div class="app">
    <!-- router-linkでいれたものを、<router-view>で呼び出せる。 -->
    <!-- コンポーネントの書き方を変えられる  -->
    <!-- どちらも必要 -->
    <HeaderSpace />
    <div class="contents">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderSpace from "@/components/HeaderSpace.vue"
export default {
  components: { HeaderSpace },
}
</script>

<style scoped>
.contents {
  margin-top: 16px;
}
</style>

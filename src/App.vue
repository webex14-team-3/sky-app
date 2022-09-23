<template>
  <div class="header">
    <HeaderSpace />
  </div>
  <div class="contents">
    <router-view />
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

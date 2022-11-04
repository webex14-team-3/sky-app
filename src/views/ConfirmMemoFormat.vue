<template>
  <div class="allContainer">
    <!-- <posted-memo
      v-for="memo in memos"
      v-bind:key="memo.id"
      v-bind:memo="memo"
    /> -->
  </div>
  <slot name="titleValue"></slot>
  <slot name="memoValue"></slot>
</template>

<script>
// import PostedMemo from "@/components/PostedMemo.vue"

export default {
  components: {
    // PostedMemo,
  },
  data() {
    return {
      memos: [],
    }
  },
}
</script>

<script setup lang="ts">
  const props = defineProps({
    urlAvatar: {type: String, default: ""},
    isShow: {type: Boolean, default: false}
  })
  console.log("IS SHOW",props.isShow); // In giá trị của isShow
</script>

<template>
  <button class="avatar-button" v-if="isShow">
    <img :src="urlAvatar" alt="avatar"/>
  </button>
</template>

<style scoped>
  .avatar-button {
    width: 50px;
    height: 50px;
  }
  .avatar-button img {
    border-radius: 100%;
  }
</style>
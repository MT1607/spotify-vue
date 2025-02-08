<script setup lang="ts">

import {onMounted, ref} from "vue";

import Navbar from "../components/shared/Navbar.vue";
import LeftSideBar from "../components/shared/LeftSideBar.vue";
import MainView from "../components/shared/MainView.vue";
import {useUserStore} from "../store/user.js";
import {storeToRefs} from "pinia";

const userStore  = useUserStore();
const {isAuthenticated, profile} = storeToRefs(userStore);

onMounted(async () => {
  await userStore.getUserProfileStorage();
})

</script>

<template>
  <div class="container">
    <Navbar :is-authenticated="isAuthenticated" :profile="profile" />
    <div class="main-view">
      <LeftSideBar :is-authenticated="isAuthenticated" />
      <MainView/>
    </div>
  </div>
</template>



<style>
.container {
  height: 100vh;
}

.main-view {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 5px;
}
</style>
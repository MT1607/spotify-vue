<script setup>


import {onMounted} from "vue";
import Navbar from "./components/Navbar.vue";
import LeftSideBar from "./components/LeftSideBar.vue";
import MainView from "./components/MainView.vue";
import {useProfileStore} from "./store/profile.js";

const profileData = useProfileStore();

onMounted(() => {
  if (profileData.isLoggedIn) {
    const profile = profileData.profile;
    console.log(profile);
  }
});

</script>

<template>
  <div class="container">
    <Navbar />
    <div class="main-view">
      <LeftSideBar/>
      <MainView/>
    </div>
    <router-view></router-view>
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
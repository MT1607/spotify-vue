<script setup>


import {onMounted} from "vue";
import Navbar from "./components/shared/Navbar.vue";
import LeftSideBar from "./components/shared/LeftSideBar.vue";
import MainView from "./components/shared/MainView.vue";
import {useProfileStore} from "./store/profile.ts";

const profileData = useProfileStore();

onMounted(() => {
  if (profileData.isLoggedIn) {
    const profile = profileData.profile;
    console.log(profile);
  }
});

</script>

<template>
  <router-view></router-view>
</template>



<style>

</style>
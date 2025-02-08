<script setup lang="ts">
import {UserProfile} from "../../utils/types";
import {handleSpotifyLogin} from "../../utils/script";
import AvatarDropdownButton from "./AvatarDropdownButton.vue";

const props = defineProps({
  profile: Object as () => UserProfile,
  isAuthenticated: Boolean as () => false,
})

</script>

<template>
  <div id="global-navbar">
    <div class="logo">
      <a>
        <img src="../../assets/spotify-white-icon.svg" width="32" height="32" alt="spotify-logo">
      </a>
    </div>
    <div class="home-and-search">
      <button class="home">
        <img src="../../assets/icon/house-door.svg" alt="icon-house" width="24" height="24">
      </button>
      <div class="search-wrapper">
        <form>
          <img class="icon-search" src="../../assets/icon/search.svg" alt="icon-search" width="24" height="24"/>
          <input class="search-input" type="search" placeholder="Bạn muốn phát nội dung gì ?">
          <v-divider class="search-divider" vertical color="white" length="32px" opacity="1"/>
          <img class="icon-archive" src="../../assets/icon/archive.svg" alt="icon-archive" width="24" height="24"/>
        </form>
      </div>
    </div>
    <div class="authentication">
      <button class="sign-up" v-if="!props.isAuthenticated">Đăng ký</button>
      <button class="sign-in" @click="handleSpotifyLogin" v-if="!props.isAuthenticated">Đăng nhập</button>
      <AvatarDropdownButton :is-show="props.isAuthenticated" :url-avatar="props.profile?.images[1].url" />
    </div>
  </div>
</template>

<style scoped>
  #global-navbar {
    height: 48px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo a {
    height: 32px;
    margin: 20px;
  }

  .home-and-search {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home {
    padding: 12px;
    border: 0;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .1);
    margin-left: 18px;
  }

  .home:hover {
    transform: scale(1.05);
  }

  .search-wrapper {
    position: relative;
    width: 474px;
    height: 48px;
    margin-left: 10px
  }

  .search-wrapper .icon-search {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }

  .search-wrapper .icon-archive {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .search-input {
    width: 100%;
    height: 48px;
    padding: 12px 64px 12px 48px;
    border-radius: 50px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .1);
  }

  .search-divider {
    position: absolute;
    top:8px;
    right: 60px
  }

  .authentication {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .sign-up, .sign-in {
    font-weight: 700;
  }

  .sign-up {
    padding: 8px 32px 8px 8px;
    color: #7c7c7c;
  }

  .sign-up:hover {
    transform: scale(1.05);
    color: white;
  }

  .sign-in {
    border: 1px solid white;
    height: 48px;
    padding:0 20px;
    background-color: white;
    color: black;
    border-radius: 50px;
  }

  .sign-in:hover {
    transform: scale(1.05);
  }


</style>
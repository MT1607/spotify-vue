<script setup lang="ts">

import NowPlayingCard from "../card/NowPlayingCard.vue";
import {handleSpotifyLogin} from "../../utils/script.ts";

const props = defineProps({
  isAuthenticated: Boolean as () => false,
})
</script>

<template>
  <div id="left-side-bar">
    <div class="top-side">
      <div class="top-nav-bar" >
        <header>
          <div class="library">
            <button class="library-btn">
              <img src="../../assets/icon/collection-fill.svg" alt="library-icon" width="24" height="24"/>
              Thư Viện
            </button>
            <button class="plus-btn">
              <img src="../../assets/icon/plus.svg" alt="plus-icon" width="24" height="24"/>
            </button>
          </div>
          <NowPlayingCard v-if="!props.isAuthenticated" title="Tạo danh sách phát" extra="Hãy đăng nhập để tạo danh sách phát cuả bạn">
            <button class="sign-in" @click="handleSpotifyLogin">Đăng nhập</button>
          </NowPlayingCard>
        </header>
      </div>
    </div>
    <div class="bottom-side"></div>
  </div>
</template>

<style scoped>
  #left-side-bar {
    width: 420px;
    height: 100vh;
    border-radius: 10px;
    background-color: #121212;
  }

  .top-nav-bar {
    height: 76px
  }

  .top-nav-bar header {
    padding: 12px 16px 8px 16px;

  }

  .library {
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
  }
  .library button{
    display: flex;
    flex-direction: row;
    font-weight: 700;
    font-size: 1rem;
  }

  .library-btn img {
    margin-right: 8px;
  }

  .plus-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 20px;
  }

  .plus-btn:hover {
    transform: scale(1.05);
    background-color: #7c7c7c;
  }

  .library-btn:hover {
    color: white;
  }

  .sign-in {
    border: 1px solid white;
    height: 35px;
    padding:0 20px;
    background-color: white;
    color: black;
    border-radius: 50px;
    width: fit-content;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .sign-in:hover {
    transform: scale(1.05);
  }

</style>
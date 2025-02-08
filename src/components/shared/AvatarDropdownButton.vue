<script setup lang="ts">
import {onMounted, onUnmounted, ref } from 'vue';
import {handleSpotifyLogout} from "../../utils/script";

const props = defineProps({
  urlAvatar: { type: String, default: "" },
  isShow: { type: Boolean, default: false }
});

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.avatar-dropdown')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div class="avatar-dropdown" v-if="props.isShow">
    <button
        class="avatar-button"
        @click="toggleDropdown"
        :class="{ 'active': isOpen }"
    >
      <img :src="props.urlAvatar" alt="avatar"/>
    </button>

    <div
        v-show="isOpen"
        class="dropdown-menu"
    >
      <slot>
        <div class="dropdown-item">
          Profile
          <img src="../../assets/icon/box-arrow-up-right.svg" alt="profile-menu"/>
        </div>
        <hr/>
        <div class="dropdown-item" @click="handleSpotifyLogout">
          Logout
          <img src="../../assets/icon/box-arrow-up-right.svg" alt="profile-menu"/>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.avatar-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.avatar-button {
  width: 50px;
  height: 50px;
  padding: 2px;
  background: none;
  border: 2px solid transparent;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.avatar-button:hover {
  border-color: #e2e8f0;
}

.avatar-button.active {
  border-color: #4a90e2;
}

.avatar-button img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background-color: rgba(255, 255, 255, .1);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(1, 1, 1, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 50;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dropdown-item:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
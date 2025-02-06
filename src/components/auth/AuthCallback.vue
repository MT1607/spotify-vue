<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../../store/user.ts';
import {useProfileStore} from "../../store/profile.ts";

export default defineComponent({
  name: 'AuthCallback',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const profileStore = useProfileStore();

    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.get('http://localhost:3000/callback', {
            params: { code },
          });

          const { access_token, user, refresh_token } = response.data;

          localStorage.setItem('spotify_access_token', access_token);
          localStorage.setItem('spotify_refresh_token', refresh_token);
          userStore.setUser(user);
          fetchProfile(access_token);
          const returnPath = localStorage.getItem('returnPath') || '/';
          localStorage.removeItem('returnPath');

          // Redirect to main app
          router.push(returnPath);
        } catch (error) {
          console.error('Authentication failed:', error);
          router.push('/');
        }
      }
    };

    const fetchProfile = async (access_token) => {
      try {
        const response = await axios.get(`http://localhost:3000/profile?access_token=${access_token}`);
        if (response.status === 200) {
          profileStore.setProfile(response.data);
        }
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      handleCallback();
    });

    return {};
  },
});
</script>
<template>
  <div class="callback-container">
    <div class="loading-spinner"></div>
    <p>Logging you in...</p>
  </div>
</template>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1DB954;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
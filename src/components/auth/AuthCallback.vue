<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../../store/user';
  import { spotifyService } from '../../services/api/spotify-service';
  import { useAsync } from '../../composables/useAsync';
  import { notify } from '../../plugin/notification';

  const router = useRouter();
  const userStore = useUserStore();

  async function handleAuthentication() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (!code) {
        console.error("No code found in URL");
        return;
      }

      const data = await spotifyService.handleCallback(code);

      if (!data || !data.access_token || !data.refresh_token) {
        console.error("Invalid token response:", data);
        return;
      }

      userStore.setTokens(data.access_token, data.refresh_token);
      await userStore.fetchUserProfile();
      await router.push('/');
    } catch (error) {
      console.error("Authentication failed:", error);
      notify.error("Failed to log in. Please try again.");
    }
  }
  const { loading, execute } = useAsync(handleAuthentication);

  onMounted(() => {
    execute();
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
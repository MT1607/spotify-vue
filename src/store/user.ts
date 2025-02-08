import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { spotifyService } from '../services/api/spotify-service';
import { notify } from '../plugin/notification';
import {UserProfile} from "../utils/types";

export const useUserStore = defineStore('user', {
    state: () => ({
        profile: null as UserProfile,
        isAuthenticated: false,
        accessToken: null as string | null,
        refreshToken: null as string | null,
    }),

    actions: {
        setTokens(accessToken: string, refreshToken: string) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('spotify_access_token', accessToken);
            localStorage.setItem('spotify_refresh_token', refreshToken);
        },

        async setUserAndProfile(userData: any) {
            this.profile = userData;
            this.isAuthenticated = true;
            localStorage.setItem('spotify_user', JSON.stringify(userData));
        },

        async fetchUserProfile() {
            const token = localStorage.getItem('spotify_access_token');
            if (!token) return null;

            const profile = await spotifyService.getUserProfile(token);
            await this.setUserAndProfile(profile);
            return profile;
        },

        async getUserProfileStorage(){
            const userData = JSON.parse(localStorage.getItem('spotify_user'));
            if (!userData) return null;

            if (this.isAuthenticated) {
                return userData.profile;
            }
        },

        logout() {
            this.profile = null;
            this.isAuthenticated = false;
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem('spotify_access_token');
            localStorage.removeItem('spotify_refresh_token');
            localStorage.removeItem('spotify_user');
            const router = useRouter();
            router.push('/');
            notify.info('You have been logged out');
        }
    },

    persist: true,
});
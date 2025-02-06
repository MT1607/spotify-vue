import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
    }),

    actions: {
        setUser(userData) {
            this.user = userData;
            this.isAuthenticated = true;
        },

        getUser() {
            return this.user;
        },

        clearUser() {
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('spotifyToken');
        },

        logout() {

        }
    },

    persist: true,
});
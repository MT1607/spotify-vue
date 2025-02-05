import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
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
    },

    persist: true,
});
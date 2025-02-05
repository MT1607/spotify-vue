import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null,
        isLoggedIn: false,
    }),

    actions: {
        setProfile(profileData) {
            this.profile = profileData;
            this.isLoggedIn = true;
        },

        getProfile() {
            return this.profile;
        },

        clearProfile() {
            this.profile = null;
            this.isLoggedIn = false;
            localStorage.removeItem('user_profile');
        },
    },

    persist: true,
});
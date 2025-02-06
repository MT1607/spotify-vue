import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user.ts';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'App',
            component: () => import('../App.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/callback',
            name: 'AuthCallback',
            component: () => import('../components/auth/AuthCallback.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const isAuthenticated = userStore.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
import axios from 'axios';
import {useUserStore} from "../../store/user";
import {notify} from "../../plugin/notification";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const userStore = useUserStore();
        const token = userStore.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const userStore = useUserStore();

        if (error.response?.status === 401) {
            notify.error('Your session has expired. Please log in again.');
            userStore.logout();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
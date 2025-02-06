import axios from "axios";
import {useUserStore} from "../../store/user";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        if(userStore.accessToken) {
            config.headers.Authorization = `Bearer ${userStore.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Interceptor cho responses
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const userStore = useUserStore();

        if (error.response?.status === 401) {
            // Token hết hạn
            try {
                await userStore.refreshToken();
                // Thử lại request ban đầu
                const originalRequest = error.config;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Nếu refresh token cũng fail
                userStore.logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../store/AuthStore';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:1234', 
    withCredentials: true 
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        const errorMessage = (error.response?.data as any)?.error || error.message;

        if (error.response?.status === 401 && originalRequest) {
            if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
                return Promise.reject(error);
            }

            if (!originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                    .then(() => {
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    await api.post('/auth/refresh');
                    processQueue(null);
                    
                    return api(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);
                    
                    useAuthStore.setState({ user: null, isAuthenticated: false, errors: [] });
                    
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:1234', 
    withCredentials: true 
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
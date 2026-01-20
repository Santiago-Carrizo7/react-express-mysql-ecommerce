import { create } from "zustand";
import api from "../config/api.js"

export const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    errors: [],
    loading: false,

    signup: async (user) => {
        set({ errors: [], loading: true });

        try {
            const res = await api.post('/auth/register', user);
            if (res.status === 201){
                set({
                    user: res.data.user,
                    loading: false
                });
                
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            set({
                loading: false, 
                errors: error.response?.data?.error ? [error.response.data.error] : ['Error de conexión']
            });
            
            return false;
        }
    },

    signin: async (credentials) => {
        set({ errors: [], loading: true });

        try {
            const res = await api.post('/auth/login', credentials);

            set({ 
                user: res.data.user, 
                isAuthenticated: true, 
                loading: false 
            });
            
            return true; 
        } catch (error) {
            console.error(error);
            set({ 
                loading: false, 
                isAuthenticated: false,
                errors: error.response?.data?.error ? [error.response.data.error] : ['Error de conexión']
            });

            return false;
        }
    },
    
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error(error);
        }

        set({ user: null, isAuthenticated: false, errors: [] });
    },

    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await api.get('/auth/verify');
            set({ user: res.data.user, isAuthenticated: true, loading: false });
        } catch (error) {
            try {
                const refreshRes = await api.post('/auth/refresh');
                
                if (refreshRes.status === 200) {
                    const retryRes = await api.get('/auth/verify');
                    set({ user: retryRes.data.user, isAuthenticated: true, loading: false });
                    return; 
                }
            } catch (refreshError) {
                set({ user: null, isAuthenticated: false, loading: false });
            }
        }
    }
}));
    

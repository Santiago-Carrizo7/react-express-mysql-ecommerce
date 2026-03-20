import { create } from "zustand";
import api from "../config/api.js"
import type { User } from "../types/index.js"
import { isAxiosError } from "axios";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    errors: string[];
    loading: boolean;
    signup: (user: User) => Promise<boolean>;
    signin: (credentials: Pick<User, 'email' | 'password'>) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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
                    isAuthenticated: true,
                    loading: false
                });
                
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);

            if ( isAxiosError(error) ) {
                set({
                    loading: false, 
                    errors: error.response?.data?.error ? [error.response.data.error] : ['Error de conexión']
                });
            } else {
                set({
                    loading: false,
                    isAuthenticated: false,
                    errors: ['Ocurrió un error inesperado']
                });
            }
            
            
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

            if ( isAxiosError(error) ) {
                set({ 
                    loading: false, 
                    isAuthenticated: false,
                    errors: error.response?.data?.error ? [error.response.data.error] : ['Error de conexión']
                });
            } else {
                set({
                    loading: false,
                    isAuthenticated: false,
                    errors: ['Ocurrió un error inesperado']
                });
            }
           

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
    

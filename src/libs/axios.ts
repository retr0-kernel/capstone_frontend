// src/libs/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true
});

// Add auth header interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor for handling 401 errors
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8089',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')?.trim();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;
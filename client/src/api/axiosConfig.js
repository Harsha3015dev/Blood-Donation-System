import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api"
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default apiClient;


import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default instance;
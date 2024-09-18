// utils/axiosInstance.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Set Authorization header
export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => {
        // Return the response if it's successful
        return response;
    },
    (error) => {
        // Check if the error is due to an expired token (401 status code)
        if (error.response && error.response.status === 401) {
            // Clear the stored token
            localStorage.removeItem('token');
            setAuthToken(null);

            // Get the navigate function using a workaround since this is not inside a React component
            const navigate = useNavigate();
            
            // Redirect to the login page
            navigate('/login');

            // Optionally show a message to the user
            console.error('Session expired. Please log in again.');
        }

        // Reject the promise with the error
        return Promise.reject(error);
    }
);

export default axiosInstance;

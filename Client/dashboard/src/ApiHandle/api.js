import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

// Request Interceptor: Attach User or Admin Token
api.interceptors.request.use(
  (config) => {
    const userToken = JSON.parse(localStorage.getItem('token'));

    if (!config.skipAuth) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Update
api.interceptors.response.use(
  (response) => {
    const newUserToken = response.headers['x-new-user-access-token'];

    if (newUserToken) {
      localStorage.setItem('token', newUserToken);
    }

    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);

export default api;

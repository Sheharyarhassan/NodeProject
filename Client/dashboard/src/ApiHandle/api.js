import axios from 'axios';

// Create an Axios instance
const api = axios.create({
   baseURL: 'https://localhost:5000/api/',
   withCredentials: true
});

// Request Interceptor: Attach User or Admin Token
api.interceptors.request.use(
   (config) => {
      const userToken = JSON.parse(localStorage.getItem('token'));
      const adminToken = JSON.parse(localStorage.getItem('adminToken'));

      if (!config.skipAuth) {
         if (config.isAdmin && adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
         } else if (!config.isAdmin && userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
         }
      }

      return config;
   },
   (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Update
api.interceptors.response.use(
   (response) => {
      const newUserToken = response.headers['x-new-user-access-token'];
      const newAdminToken = response.headers['x-new-admin-access-token'];

      if (newUserToken) {
         localStorage.setItem('userAccessToken', newUserToken);
      }
      if (newAdminToken) {
         localStorage.setItem('adminAccessToken', newAdminToken);
      }

      return response;
   },
   (error) => {
      if (error.response.status === 401) {
         if (error.config.isAdmin) {
            localStorage.removeItem('adminAccessToken');
         } else {
            localStorage.removeItem('userAccessToken');
         }
         window.location.href = error.config.isAdmin ? '/adminlogin' : '/login';
      }

      return Promise.reject(error);
   }
);

export default api;

import axios from "axios";

const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

// Interceptor to handle session expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

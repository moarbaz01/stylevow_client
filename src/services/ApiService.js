import axios from "axios";

// Function to get token from localStorage
const getToken = () => localStorage.getItem("stylevow_token");

// Create an Axios instance
export const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add a request interceptor to include the token in headers
apiRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optionally, you can add a response interceptor
apiRequest.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle response errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);


import axios from "axios";

const BASE_API_URL = "http://localhost:3003/api/v1";

const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1000,
});

axiosClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

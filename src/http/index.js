import axios from "axios";
import { URL } from "src/constants"

const $api = axios.create({
  withCredentials: true,
  baseURL: URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401
      && originalRequest
      && !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        return error.response?.data?.message;
      }
    }
    throw error;
  }
);

export default $api;

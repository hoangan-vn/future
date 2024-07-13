import axios from "axios";
import Cookies from "js-cookie";

const axiosService = axios.create({
  baseURL: "http://localhost:5500",
});
axiosService.interceptors.request.use(
  async function (config) {
    const token = Cookies.get("Authorization");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);
export default axiosService;

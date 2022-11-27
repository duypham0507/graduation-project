import axios from "axios";
import { ACCESS_TOKEN } from "constants/index";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/",
});

axiosInstance.interceptors.request.use((axiosConfig) => {
  axiosConfig.headers = {};
  if (ACCESS_TOKEN in localStorage) {
    axiosConfig.headers["Authorization"] = `Bearer ${localStorage.getItem(
      ACCESS_TOKEN
    )}`;
  }

  return axiosConfig;
});

export default axiosInstance;
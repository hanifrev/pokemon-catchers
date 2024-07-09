import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "", // Replace with your API base URL
  withCredentials: true, // Include cookies in the request headers
});

export default axiosInstance;

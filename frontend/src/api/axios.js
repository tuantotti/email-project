import axios from "axios";
import { getAccessToken } from "../utils/localStorage";
const axiosInstance = axios.create({
    baseURL: 'localhost:8080',
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
axiosInstance.interceptors.request.use((request) => {
    const accessToken = getAccessToken();
    const accessHeader = `Bearer ${accessToken}`;
    if (request.headers) {
        request.headers["Authorization"] = accessHeader;
    }
    return request;
});
export default axiosInstance;

import axios from "axios";
import { getAccessToken } from "../utils/localStorage";
import API from "./api";
const axiosInstance = axios.create({
    baseURL: API.BASE_API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
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

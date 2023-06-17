export const setAccessToken = (value) =>
    localStorage.setItem("accessToken", value);

export const getAccessToken = () => localStorage.getItem("accessToken");

export const removeAccessToken = () => localStorage.removeItem("accessToken");

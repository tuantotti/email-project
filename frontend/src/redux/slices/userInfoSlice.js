import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import API from "../../api/api.js";
import axiosInstance from "../../api/axios.js";


export const getUserInformation = createAsyncThunk(
    "userInfor/get",
    async () => {
        try {
            const response = await axiosInstance.get(API.GET_USER_INFO);
            return response.data;
        } catch (err) {
            throw new Error(err)
        }
    }
);

export const editUserInformation = createAsyncThunk(
    "userInfor/edit",
    async (user) => {
        try {
            const response = await axiosInstance.post(API.EDIT_USER_INFO, user);
            return response.data;
        } catch (err) {
            throw new Error(err)
        }
    }
);
export const changePassword = createAsyncThunk(
    "userInfor/edit/password",
    async ({ email, oldPassword, newPassword, confirmPassword }) => {
        try {
            const response = await axiosInstance.post(API.CHANGE_PASSWORD, { email, oldPassword, newPassword, confirmPassword });
            return response.data;
        } catch (err) {
            throw new Error(err)
        }
    }
);


export const getUserInformationSlice = createSlice({
    name: "getUserInfo",
    initialState: {
        error: false,
        loading: false,
        user: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            createAt: "",
            active: true
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInformation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserInformation.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(editUserInformation.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserInformation.fulfilled, (state) => {
                state.loading = false;
                toast.success('Change your information successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .addCase(editUserInformation.rejected, (state) => {
                state.loading = false;
                state.error = true;
                toast.error('Change your information error. Please try again!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                toast.success('Change password successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .addCase(changePassword.rejected, (state) => {
                state.loading = false;
                state.error = true;
                toast.error('Change password error. Please try again!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    },
});

export const { logout } = getUserInformationSlice.actions;
export default getUserInformationSlice.reducer;

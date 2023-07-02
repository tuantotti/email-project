import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
}

export const sendMailThunk = createAsyncThunk(
    "sendMail",
    async (formData) => {
        try {
            const response = await axiosInstance.post(API.SEND_MAIL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data.data;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const sendMailSlice = createSlice({
    name: "getMails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMailThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMailThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
                toast.error('Something wrong! Please try again!', {
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
            .addCase(sendMailThunk.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Mail was sent successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    },
});

export const { getMails } = sendMailSlice.actions;
export default sendMailSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api";
import axiosInstance from '../../api/axios';
import dataFake from "../../email.json";

const initialState = {
    loading: false,
    error: false,
}

export const sendMailThunk = createAsyncThunk(
    "getMails",
    async ({ toAddress, subject, body }) => {
        console.log({
            toAddress,
            subject,
            body
        })
        try {
            const response = await axiosInstance.post(API.SEND_MAIL, { toAddress, subject, body });
            return response.data.data;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const sendMailSlice = createSlice({
    name: "getMails",
    initialState,
    reducers: {
        getMails: (state) => {
            state.mails = dataFake;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMailThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMailThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(sendMailThunk.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getMails } = sendMailSlice.actions;
export default sendMailSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataFake from "../../email.json";
import axiosInstance from '../../api/axios'

const initialState = {
    mails: [],
    loading: false,
    error: false,
}

export const getMailsThunk = createAsyncThunk(
    "getMails",
    async ({status}) => {
        try {
            const response = await axiosInstance.get(`api/mail?status=${status}`);
            console.log(response)
            return response.data.mails;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const getMailsSlice = createSlice({
    name: "getMails",
    initialState,
    reducers: {
        getMails: (state) => {
            state.mails = dataFake;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMailsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMailsThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getMailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.mails = action.payload.mails;
            });
    },
});

export const { getMails } = getMailsSlice.actions;
export default getMailsSlice.reducer;
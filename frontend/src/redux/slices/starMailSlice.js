import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axios'
import API from "../../api/api";

const initialState = {
    loading: false,
    error: false,
}

export const starMailThunk = createAsyncThunk(
    "starMail",
    async ({ id, status }) => {
        try {
            const response = await axiosInstance.put(`${API.STAR_MAIL}`, {
                id,
                status
            });
            return response.data;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const starMailSlice = createSlice({
    name: "starMail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(starMailThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(starMailThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(starMailThunk.fulfilled, (state) => {
                state.loading = false;
            });
    },
});

export default starMailSlice.reducer;
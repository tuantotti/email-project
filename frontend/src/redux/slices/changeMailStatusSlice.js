import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axios'
import API from "../../api/api";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
}

export const changeMailStatusThunk = createAsyncThunk(
    "changeMailStatus",
    async ({ id, status }) => {
        try {
            const response = await axiosInstance.put(`${API.CHANGE_MAIL_STATUS}`, {
                id,
                status
            });
            return response.data;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const changeMailStatusBulkThunk = createAsyncThunk(
    "changeMailStatusBulk",
    async ({ ids, status }) => {
        try {
            const response = await axiosInstance.put(`${API.CHANGE_MAIL_STATUS_BULK}`, {
                ids,
                status
            });
            return response.data;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const changeMailStatusSlice = createSlice({
    name: "changeMailStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeMailStatusThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeMailStatusThunk.rejected, (state) => {
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
            .addCase(changeMailStatusThunk.fulfilled, (state) => {
                state.loading = false;
                toast.success('Change mail status successfully!', {
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
            .addCase(changeMailStatusBulkThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeMailStatusBulkThunk.rejected, (state) => {
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
            .addCase(changeMailStatusBulkThunk.fulfilled, (state) => {
                state.loading = false;
                toast.success('Change mail status bulk successfully!', {
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

export default changeMailStatusSlice.reducer;
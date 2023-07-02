import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axios'
import API from "../../api/api";

const initialState = {
    loading: false,
    error: false,
    mailDetail: {}
}

export const downloadFileThunk = createAsyncThunk(
    "downloadFile",
    async (name) => {
        try {
            const response = await axiosInstance.get(`${API.DOWNLOAD_FILE}/${name}`, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (err) {
            throw new Error("Error!");
        }
    }
);

export const viewMailSlice = createSlice({
    name: "viewMail",
    initialState,
    reducers: {
        setMailDetail: (state, action) => {
            state.mailDetail = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadFileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(downloadFileThunk.rejected, (state, action) => {
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
            .addCase(downloadFileThunk.fulfilled, (state) => {
                state.loading = false;
                toast.success('Download successfully!', {
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



export const { setMailDetail } = viewMailSlice.actions;
export default viewMailSlice.reducer;
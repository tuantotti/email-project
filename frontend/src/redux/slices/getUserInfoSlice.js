import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/api.js";
import axiosInstance from "../../api/axios.js";


export const getUserInformation = createAsyncThunk(
    "userInfor/get",
    async () => {
        try {
            const response = await axiosInstance.get(API.GET_USER_INFO+"/4");
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
            });
    },
});

export const { logout } = getUserInformationSlice.actions;
export default getUserInformationSlice.reducer;

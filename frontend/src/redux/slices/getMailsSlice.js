import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataFake from "../../email.json";
import axiosInstance from '../../api/axios'

const initialState = {
    mails: dataFake.slice(0, 30),
    loading: false,
    error: false,
    page: 1,
    size: 20,
    totalPages: 10,
    masterChecked: false,
    childChecked: dataFake.slice(0, 30).map(() => false),
    mailSelected: [],
}

export const getMailsThunk = createAsyncThunk(
    "getMails",
    async ({ status, page, size }) => {
        try {
            const response = await axiosInstance.get(`/api/mail?status=${status}&page=${page}&size=${size}`);
            console(response.data)
            return response.data;
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
        },
        nextPage: (state) => {
            state.page++;
        },
        prevPage: (state) => {
            state.page--;
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        handleMasterCheckboxChange: (state, action) => {
            const isChecked = action.payload;
            state.masterChecked = isChecked;

            if (isChecked) {
                state.childChecked = [...Array(state.childChecked.length)].map(() => true)
            } else {
                state.childChecked = [...Array(state.childChecked.length)].map(() => false)
            }

            state.mailSelected = state.mails.filter((item, index) => state.childChecked[index]);
        },
        handleChildCheckboxChange: (state, action) => {
            const { index, isChecked } = action.payload
            const updatedChildChecked = [...state.childChecked];
            updatedChildChecked[index] = isChecked;
            state.childChecked = updatedChildChecked;

            if (isChecked && updatedChildChecked.every((checked) => checked)) {
                state.masterChecked = true;
            } else {
                state.masterChecked = false;
            }
            state.mailSelected = state.mails.filter((item, index) => state.childChecked[index]);
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
                // state.mails = action.payload.content;
                // state.totalPages = action.payload.totalPages;
            });
    },
});

export const { getMails, nextPage, prevPage, setPage, handleMasterCheckboxChange, handleChildCheckboxChange } = getMailsSlice.actions;
export default getMailsSlice.reducer;
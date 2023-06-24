import { configureStore } from '@reduxjs/toolkit'
import getMailsReducer from './slices/getMailsSlice'
import authenticationSlice from './slices/authenticationSlice'
import getUserInfoSlice from './slices/getUserInfoSlice'
const reducer = {
    getMailsReducer,
    authenticationSlice,
    getUserInfoSlice,
};

export const store = configureStore({ reducer })
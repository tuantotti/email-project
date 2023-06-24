import { configureStore } from '@reduxjs/toolkit'
import getMailsReducer from './slices/getMailsSlice'
import authenticationSlice from './slices/authenticationSlice'
import sendMailSlice from './slices/sendMailSlice'
const reducer = {
    getMailsReducer,
    authenticationSlice,
    sendMailSlice,
};

export const store = configureStore({ reducer })
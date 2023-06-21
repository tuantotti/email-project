import { configureStore } from '@reduxjs/toolkit'
import getMailsReducer from './slices/getMailsSlice'
import authenticationSlice from './slices/authenticationSlice'
const reducer = {
    getMailsReducer,
    authenticationSlice
};

export const store = configureStore({ reducer })
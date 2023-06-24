import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
const reducer = {
    authenticationSlice,
    getMailsSlice,
};

export const store = configureStore({ reducer })
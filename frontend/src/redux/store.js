import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import starMailSlice from './slices/starMailSlice'
const reducer = {
    authenticationSlice,
    getMailsSlice,
    starMailSlice
};

export const store = configureStore({ reducer })
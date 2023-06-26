import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import starMailSlice from './slices/starMailSlice'
import viewMailSlice from './slices/viewMailSlice'
const reducer = {
    authenticationSlice,
    getMailsSlice,
    starMailSlice,
    viewMailSlice
};

export const store = configureStore({ reducer })
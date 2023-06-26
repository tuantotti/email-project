import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import starMailSlice from './slices/starMailSlice'
import sendMailSlice from './slices/sendMailSlice'

const reducer = {
    authenticationSlice,
    getMailsSlice,
    starMailSlice,
    sendMailSlice
};

export const store = configureStore({ reducer })
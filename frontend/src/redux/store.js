import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import starMailSlice from './slices/starMailSlice'
import sendMailSlice from './slices/sendMailSlice'
import viewMailSlice from './slices/viewMailSlice'
import userInfoSlice from './slices/userInfoSlice'

const reducer = {
    authenticationSlice,
    getMailsSlice,
    starMailSlice,
    sendMailSlice,
    viewMailSlice,
    userInfoSlice,
};

export const store = configureStore({ reducer })
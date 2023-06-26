import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import starMailSlice from './slices/starMailSlice'
import sendMailSlice from './slices/sendMailSlice'
import getUserInfoSlice from './slices/getUserInfoSlice'

const reducer = {
    authenticationSlice,
    getMailsSlice,
    starMailSlice,
    sendMailSlice,
    getUserInfoSlice
};

export const store = configureStore({ reducer })
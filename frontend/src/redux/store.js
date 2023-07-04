import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import changeMailStatusSlice from './slices/changeMailStatusSlice'
import sendMailSlice from './slices/sendMailSlice'
import viewMailSlice from './slices/viewMailSlice'
import userInfoSlice from './slices/userInfoSlice'

const reducer = {
    authenticationSlice,
    getMailsSlice,
    changeMailStatusSlice,
    sendMailSlice,
    viewMailSlice,
    userInfoSlice,
};

export const store = configureStore({ reducer })
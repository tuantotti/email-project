import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './slices/authenticationSlice'
import getMailsSlice from './slices/getMailsSlice'
import starMailSlice from './slices/starMailSlice'
import getUserInfoSlice from './slices/getUserInfoSlice'

const reducer = {
    authenticationSlice,
    getMailsSlice,
    starMailSlice,
    getUserInfoSlice
};

export const store = configureStore({ reducer })
import { configureStore } from '@reduxjs/toolkit'
import getMailsReducer from './slices/getMailsSlice'
const reducer = {
    getMailsReducer
};

export const store = configureStore({ reducer })
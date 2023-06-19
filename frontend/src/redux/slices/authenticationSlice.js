import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import API from "../../api/api.js";
import axiosInstance from "../../api/axios.js";
import { getAccessToken, removeAccessToken, setAccessToken } from "../../utils/localStorage.js";


export const signInThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await axiosInstance.post(API.LOGIN, {
        email,
        password
      });
      return response.data;
    } catch (err) {
      throw new Error(err)
    }
  }
);


export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    accessToken: getAccessToken(),
    error: false,
    loading: false,
    user: {
      name: "",
      surname: "",
      userName: "",
      emailAddress: "",
      avatarPath: "",
      id: 0,
    },
  },
  reducers: {
    logout: (state) => {
      state.accessToken = "";
      removeAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload['x-access-token'];
      setAccessToken(state.accessToken);
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      console.log(action)
      state.loading = false;
      state.error = true;
      toast.error('Something wrong! Please try again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;

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

export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    password
  }) => {
    console.log("signUpThunk")
    try {
      const response = await axiosInstance.post(API.SIGN_UP, {
        firstName,
        lastName,
        email,
        phoneNumber,
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
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload['x-access-token'];
        setAccessToken(state.accessToken);
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error('Something wrong! Please try again!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload['x-access-token'];
        setAccessToken(state.accessToken);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error('Something wrong! Please try again!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;

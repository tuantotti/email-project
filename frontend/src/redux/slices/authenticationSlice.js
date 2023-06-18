import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "api/axios";



export const signInThunk = createAsyncThunk(
  "auth/login",
  async ({ userNameOrEmailAddress, password, rememberClient }) => {
    try {
      const response = await axiosInstance.post("/api/TokenAuth/Authenticate", {
        userNameOrEmailAddress: userNameOrEmailAddress,
        password: password,
        rememberClient: rememberClient,
      });
      return response.data.result;
    } catch (err) {
      throw new Error("Error!");
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
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        setAccessToken(state.accessToken);
      });
    builder.addCase(getUserInformation.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;

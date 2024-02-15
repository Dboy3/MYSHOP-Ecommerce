import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPi";
import { updateUser } from "../User/userApi";

const initialState = {
  registeredUser: null,
  status: "idle",
  error: null,
};

// action creator
export const createNewUser = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const checkUserAction = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.registeredUser = action.payload;
      })
      .addCase(checkUserAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.registeredUser = action.payload;
      })
      .addCase(checkUserAction.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.registeredUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export const selectRegisteredUser = (state) => state.auth.registeredUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;

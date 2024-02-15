import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLoggedInUser,
  fetchRegisteredUserOrders,
  updateUser,
} from "./userApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders: [],
  status: "idle",
  userInfo: null, // this will have more info
};

export const fetchRegisteredUserOrderAsync = createAsyncThunk(
  "user/fetchRegisteredUser",
  async (userId) => {
    const response = await fetchRegisteredUserOrders(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegisteredUserOrderAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userOrders = action.payload;
      })
      // do check this out now
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userInfo = action.payload;
      });
  },
});

export const selectOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;


// NOTE : we use  selectRegisteredUser for ID only 
//        ans selectUserInfo for all the details of user 



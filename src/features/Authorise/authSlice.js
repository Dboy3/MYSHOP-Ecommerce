import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authAPi";
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

// making the signout wala data 
export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async (userID) => {
    const response = await signOut(userID);
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
      })
      .addCase ( signOutAsync.fulfilled , (state , action) => {
        // check this 
        state.status = "idle";
        console.log("i am inside the singout action");
        state.registeredUser = null;
        console.log(state.registeredUser);
      })
      .addCase ( signOutAsync.pending , (state) => {
        // check this as well 
        state.status = "loading";
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export const selectRegisteredUser = (state) => state.auth.registeredUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;

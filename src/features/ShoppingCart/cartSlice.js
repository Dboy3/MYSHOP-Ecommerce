import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchItemsbyUserId,
  resetCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

// action creator
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    // console.log({ item });
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const response = await deleteCartItem(id);
    return response.data;
  }
);

export const getItemsByUserId = createAsyncThunk(
  "cart/getItemsByUserId",
  async (userid) => {
    const response = await fetchItemsbyUserId(userid);
    return response.data;
  }
);

export const restCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userid) => {
    const response = await resetCart(userid);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(getItemsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemsByUserId.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        // means ki items mei index se 1 item hata do
        state.items.splice(index, 1);
      })
      .addCase(restCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectItem = (state) => state.cart.items;

export default cartSlice.reducer;

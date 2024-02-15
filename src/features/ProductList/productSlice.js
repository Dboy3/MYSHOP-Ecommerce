import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchAllProducts } from "./productlistAPI";
import {
  fetchProductsByFilters,
  fetchAllBrands,
  fetchCategories,
  fetchProductById,
} from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

// action creator

export const getAllBrands = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const getAllCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const getProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

// slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByFilters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByFilters.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;

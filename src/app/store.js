import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/ProductList/productSlice";
import authReducer from "../features/Authorise/authSlice";
import cartReducer from "../features/ShoppingCart/cartSlice";
import orderReducer from "../features/Order/orderSlice";
import userReducer from "../features/User/userSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});

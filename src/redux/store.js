// Create redux-toolkit || redux store

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers/auth";
import cartSlice from "./slicers/cart";


const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

export default store;

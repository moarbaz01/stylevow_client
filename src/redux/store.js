// Create redux-toolkit || redux store

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers/auth";
import cartSlice from "./slicers/cart";
import loadingSlice from "./slicers/loading";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    loading: loadingSlice,
  },
});

export default store;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/ApiService";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const getUserCart = createAsyncThunk("getUserCart", async () => {
  try {
    const res = await apiRequest.get("/user");
    return res.data.user.cart;
  } catch (error) {
    console.log(error);
  }
});

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, color, size, quantity, _id, totalAmount } =
        action.payload;
      const existingItem = state.items.find(
        (item) => item._id === _id && item.color === color && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          _id,
          color,
          size,
          totalAmount,
          quantity,
          product,
        });
      }
      state.totalPrice += product.price * quantity;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === id);

      if (itemIndex !== -1) {
        const { product, quantity } = state.items[itemIndex];
        state.totalPrice -= product.price * quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateCart: (state, action) => {
      const { _id, color, size, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item._id === _id && item.color === color && item.size === size
      );

      if (itemToUpdate) {
        const prevQuantity = itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        state.totalPrice +=
          (quantity - prevQuantity) * itemToUpdate.product.price;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      console.log(action.payload);
      state.items = action.payload;
      state.totalPrice = calculateTotalPrice(action.payload);
    });
  },
});

// Helper function to calculate total price
const calculateTotalPrice = (items) => {
  return items?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const { addToCart, removeFromCart, updateCart } = cart.actions;
export default cart.reducer;

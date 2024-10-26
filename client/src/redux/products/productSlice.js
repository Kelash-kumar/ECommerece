import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload._id); 
      if (index !== -1) {
        state.products[index] = action.payload; 
      }
    },
  },
});

export const { addProduct, setProducts, updateProduct } = productSlice.actions;
export default productSlice.reducer;

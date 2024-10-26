// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './products/productSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    products:productReducer
  },
});

export default store;

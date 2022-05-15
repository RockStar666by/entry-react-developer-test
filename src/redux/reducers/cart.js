import { createReducer } from '@reduxjs/toolkit';
import { SET_CART_QUANTITY } from '../actionTypes';

export const initialState = { productsQuantity: 0 };

export const currencyReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_CART_QUANTITY, (state, action) => {
    console.log(action.payload);
    state.productsQuantity = action.payload;
  });
});

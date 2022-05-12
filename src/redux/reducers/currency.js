import { createReducer } from '@reduxjs/toolkit';
import { SET_CURRENCY } from '../actionTypes';

export const initialState = { index: 0 };

export const currencyReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_CURRENCY, (state, action) => {
    const { index, label, symbol } = action.payload;
    console.log(index, label, symbol, action.payload);
    state.index = index;
    state.label = label;
    state.symbol = symbol;
    console.log(state);
  });
});

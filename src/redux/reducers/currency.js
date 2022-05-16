import { createReducer } from '@reduxjs/toolkit';
import { SET_CURRENCY } from '../actionTypes';

export const initialState = { index: 0, symbol: '$', label: 'USD' };

export const currencyReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_CURRENCY, (state, action) => {
    const { index, label, symbol } = action.payload;
    state.index = index;
    state.label = label;
    state.symbol = symbol;
  });
});

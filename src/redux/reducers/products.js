import { createReducer } from '@reduxjs/toolkit';
import { ADD_TO_CART, INCREASE_COUNT, DECREASE_COUNT, DELETE_FROM_CART, CLEAR_CART } from '../actionTypes';

export const initialState = {
  allIds: [],
  byIds: {}
};

export const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const { id, content } = action.payload;
      const products = Object.entries(state.byIds);
      let duplicate = false;
      if (Object.keys(state.byIds).length === 0) {
        state.allIds.push(id);
        state.byIds = {
          ...state.byIds,
          [id]: { ...content }
        };
      } else {
        for (let i = 0; i < products.length; i++) {
          if (products[i][1].id === content.id && JSON.stringify(products[i][1].options) === JSON.stringify(content.options)) {
            duplicate = true;
            state.byIds = {
              ...state.byIds,
              [products[i][0]]: { ...content, quantity: products[i][1].quantity + content.quantity }
            };
          }
        }
        if (!duplicate) {
          state.allIds.push(id);
          state.byIds = {
            ...state.byIds,
            [id]: { ...content }
          };
        }
      }
    })
    .addCase(INCREASE_COUNT, (state, action) => {
      const { payload } = action;
      state.byIds = {
        ...state.byIds,
        [payload]: { ...state.byIds[payload], quantity: state.byIds[payload].quantity + 1 }
      };
    })
    .addCase(DECREASE_COUNT, (state, action) => {
      const { payload } = action;

      state.byIds = {
        ...state.byIds,
        [payload]: { ...state.byIds[payload], quantity: state.byIds[payload].quantity - 1 }
      };
    })
    .addCase(DELETE_FROM_CART, (state, action) => {
      state.allIds = state.allIds.filter((item) => item !== action.payload);
      delete state.byIds[action.payload];
    })
    .addCase(CLEAR_CART, (state) => {
      state.allIds = [];
      state.byIds = {};
    });
});

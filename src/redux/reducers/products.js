import { createReducer, current } from '@reduxjs/toolkit';
import { ADD_TO_CART } from '../actionTypes';

export const initialState = {
  allIds: [],
  byIds: {}
};

export const productsReducer = createReducer(initialState, (builder) => {
  builder.addCase(ADD_TO_CART, (state, action) => {
    const { id, content } = action.payload;
    const products = Object.entries(state.byIds);
    console.log(current(state.byIds));
    let duplicate = false;

    if (Object.keys(state.byIds).length === 0) {
      state.allIds.push(id);
      state.byIds = {
        ...state.byIds,
        [id]: { ...content }
      };
      console.log('PRODUCT SUCCESSFULLY ADDED TO CART !!!');
    } else {
      for (let i = 0; i < products.length; i++) {
        console.log(products);
        if (products[i][1].id === content.id && JSON.stringify(products[i][1].options) === JSON.stringify(content.options)) {
          console.log('DUPLICATE !!!');
          duplicate = true;
          console.log('ADD +1');
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
        console.log('PRODUCT SUCCESSFULLY ADDED TO CART !!!');
      }
    }
  });
  // .addCase(CLEAR_CART, (state, action) => {
  //   const { id, content } = action.payload;
  //   state.allIds.push(id);
  //   state.byIds = {
  //     ...state.byIds,
  //     [id]: {
  //       content,
  //       completed: false
  //     }
  //   };
  // });
});

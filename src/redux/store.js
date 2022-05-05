import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
// import { cartReducer } from './reducers/cart';
import { productsReducer } from './reducers/products';
// import { currencyReducer } from './reducers/currency';
import { loadState } from './localStorage';

const rootReducer = combineReducers({
  // cart: cartReducer,
  products: productsReducer
  // currency: currencyReducer
});

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: loadState()
});

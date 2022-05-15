import { v4 as uuidv4 } from 'uuid';
import { ADD_TO_CART, INCREASE_COUNT, DECREASE_COUNT, SET_CURRENCY, SET_CART_QUANTITY } from './actionTypes';

export const addToCart = (content) => ({
  type: ADD_TO_CART,
  payload: {
    id: uuidv4(),
    content
  }
});

export const setCurrency = (content) => ({
  type: SET_CURRENCY,
  payload: content
});

export const setCartQuantity = (content) => ({
  type: SET_CART_QUANTITY,
  payload: content
});

export const increaseCount = (content) => ({
  type: INCREASE_COUNT,
  payload: content
});

export const decreaseCount = (content) => ({
  type: DECREASE_COUNT,
  payload: content
});

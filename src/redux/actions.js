import { v4 as uuidv4 } from 'uuid';
import { ADD_TO_CART } from './actionTypes';

export const addToCart = (content) => ({
  type: ADD_TO_CART,
  payload: {
    id: uuidv4(),
    content
  }
});

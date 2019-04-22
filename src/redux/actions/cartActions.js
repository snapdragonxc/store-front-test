
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART
} from '../constants/cart'

// Actions

export const addToCart = (productId, qty) => ({ type: ADD_TO_CART, data: { productId, qty } });

export const updateCart = (productId, qty) => ({ type: UPDATE_CART, data: { productId, qty } });

export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, data: { productId } });
  



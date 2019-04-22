import axios from 'axios';

import { 
  GET_PRODUCTS_START, 
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "../constants/products"

// Actions

export const getProductsStart = () => ({ type: GET_PRODUCTS_START });
export const getProductsSuccess = data => ({ type: GET_PRODUCTS_SUCCESS, data });
export const getProductsError = error => ({ type: GET_PRODUCTS_ERROR, error });


// Thunk Actions

export function getProducts(){ 
  return function(dispatch) {
    dispatch(getProductsStart());
    return axios.get('http://localhost:3000/products.json')
      .then(response => {
        dispatch(getProductsSuccess(response.data));
      }) 
      .catch(error =>  {
        dispatch(getProductsError(error.response.status));
        return (error);
    });
  }
};
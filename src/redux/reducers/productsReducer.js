import { 
  GET_PRODUCTS_START, 
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "../constants/products"


export const initialState = {
  products: [], 
  loading: false,
  productsError: ''
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PRODUCTS_START:
      return {
        ...state, 
        loading: true
      };

    case GET_PRODUCTS_SUCCESS:
      const stateLoaded = {

        ...state,
        products: action.data,
        loading: false
      }
      return stateLoaded;

 
    case GET_PRODUCTS_ERROR:

        return {
          ...state,
          productsError: action.error.message,
          loading: false
        };

    default:
      return state
  }
}

export default productsReducer
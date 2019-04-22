import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART
} from '../constants/cart'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const cartReducer = (state = initialState, action) => {
  const { addedIds, quantityById } = state;
  const { productId, qty } = action.data || {productId: -1, qty: -1};
  let mergedIds = []; 
  let mergedQuantity = {};

  switch (action.type) {
    case ADD_TO_CART:  
      mergedIds = addedIds.concat(); // get new array without altering state   
      if (addedIds.indexOf(productId) === -1) {
        mergedIds = [ ...addedIds, productId ];
      }      
      mergedQuantity = { ...quantityById, [productId] : (quantityById[productId] || 0) + qty };
      return { 
        addedIds: mergedIds,
        quantityById: mergedQuantity
      };

    case UPDATE_CART:
      if (addedIds.indexOf(productId) !== -1) {
        mergedQuantity = { ...state.quantityById, [productId] : qty };
      }   
      return { 
        ...state,
        quantityById: mergedQuantity
      };

    case REMOVE_FROM_CART:  
      mergedIds = addedIds.concat(); // get new array without altering state   
      const indexToRemove = addedIds.indexOf(productId);
      if ( indexToRemove !== -1) {
        mergedIds.splice(indexToRemove, 1);  
        mergedQuantity = { ...quantityById, [productId] :  0 };
      }

      return { 
        addedIds: mergedIds,
        quantityById: mergedQuantity
      };
    default:
      return state
  }
}

export default cartReducer;
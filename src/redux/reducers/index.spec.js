import { getCartQty, getCartState, findProduct } from './index';
import received from '../../mocks/productsMock';

describe('getCartQty', () => {
	it('should return quantity', () => {
    const state = {
      cartReducer: { 
      	addedIds: [],
        quantityById: {}
      },
      productsReducer: { 
      	products: received.data, 
			  loading: false,
			  productsError: ''
      }
    };
    expect(getCartQty(state)).toBe(0);
  })
});

describe('getCartState', () => {
  it('should return correct cart state', () => {
    const state = {
      cartReducer: { 
        addedIds: [],
        quantityById: {}
      },
      productsReducer: { 
        products: received.data, 
        loading: false,
        productsError: ''
      }
    };
    expect(getCartState(state)).toEqual({
      cartItems: [],
      total: 0
    });
  })
});

describe('findProduct', () => {
  it('should find the product', () => {  
    expect(findProduct()).toEqual({});
  })
});

describe('when cart contains items', () => {

	describe('getCartQty', () => {
		it('should return quantity', () => {
      const state = {
        cartReducer: { 
        	addedIds: [ 1, 2, 3 ],
          	quantityById: { 1: 4, 2: 2, 3: 1 }
        },
        productsReducer: { 
        	products: received.data, 
  			  loading: false,
  			  productsError: ''
        }
      }
      expect(getCartQty(state)).toBe(7);
	  });
	});

	describe('getCartState', () => {
		it('should return correct cart state', () => {
      const state = {
        cartReducer: { 
        	addedIds: [ 1, 2, 3 ],
          quantityById: { 1: 4, 2: 2, 3: 1 }
        },
        productsReducer: { 
        	products: received.data, 
  			  loading: false,
  			  productsError: ''
        }
      };
      expect(getCartState(state)).toEqual({
      	cartItems: [
	      		{ product: received.data[1], quantity: 4, subTotal: 112, productIndex: 1 },
            { product: received.data[2], quantity: 2, subTotal: 104, productIndex: 2 },
            { product: received.data[3], quantity: 1, subTotal: 28, productIndex: 3 }
	      	],
	      total: 244
      });
	  });
	});

  describe('findProduct', () => {
    it('should find the product', () => {
      const productIndex = 1;
      const products = received.data;   
      expect(findProduct(productIndex, products)).toEqual(received.data[1]);
    })
  });

});


import productsReducer from './productsReducer';

import received from '../../mocks/productsMock';


describe('the productsReducer', () => {

    const initialState = {
      	products: [], 
  		loading: false,
  		productsError: ''
    };

    it('should provide the initial state', () => {
    	expect(productsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_PRODUCTS_START action', () => {
		expect(productsReducer(initialState, { type: 'GET_PRODUCTS_START' })).toEqual({
			products: [],
			loading: true,
			productsError: ''
		});
    });

    it('should handle GET_PRODUCTS_SUCCESS action', () => {

		expect(productsReducer(initialState, { type: 'GET_PRODUCTS_SUCCESS', data: received.data })).toEqual({
			products: received.data,
			loading: false,
			productsError: ''
		});
    });

    it('should handle GET_PRODUCTS_ERROR action', () => {

		expect(productsReducer(initialState, { type: 'GET_PRODUCTS_ERROR', error: {message: 'an error occured'} })).toEqual({
			products: [],
			loading: false,
			productsError: 'an error occured'
		});
    });

    describe('when products are already loaded', () => {

    	it('should handle GET_PRODUCTS_START action', () => {
    		const state = {
				products: received.data, 
  				loading: false,
  				productsError: ''
			};
			expect(productsReducer(state, { type: 'GET_PRODUCTS_START' })).toEqual({
				products: received.data,
				loading: true,
				productsError: ''
			});
	    });

		it('should handle GET_PRODUCTS_SUCCESS action', () => {
			const state = {
				products: received.data, 
  				loading: false,
  				productsError: ''
			};

			expect(productsReducer(initialState, { type: 'GET_PRODUCTS_SUCCESS', data: received.data })).toEqual({
				products: received.data,
				loading: false,
				productsError: ''
			});
		});

		 it('should handle GET_PRODUCTS_ERROR action', () => {
		 	const state = {
				products: received.data, 
  				loading: false,
  				productsError: ''
			};

			expect(productsReducer(state, { type: 'GET_PRODUCTS_ERROR', error: {message: 'an error occured'} })).toEqual({
				products: received.data,
				loading: false,
				productsError: 'an error occured'
			});
	    });
    }); 

});

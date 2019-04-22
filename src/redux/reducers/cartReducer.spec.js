import cartReducer from './cartReducer';

describe('the cartReducer', () => {

    const initialState = {
      	addedIds: [],
      	quantityById: {}
    };

    it('should provide the initial state', () => {
      	expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_TO_CART action', () => {
		expect(cartReducer(initialState, { type: 'ADD_TO_CART', data: {productId: 1, qty: 2 }})).toEqual({
			addedIds: [ 1 ],
			quantityById: { 1: 2 }
		});
    });

    it('should handle UPDATE_CART action', () => {
		expect(cartReducer(initialState, { type: 'UPDATE_CART', data: {productId: 1, qty: 2 }})).toEqual(initialState);
	});

	it('should handle REMOVE_FROM_CART action', () => {
		expect(cartReducer(initialState, { type: 'REMOVE_FROM_CART', data: {productId: 2}})).toEqual(initialState);
	});

    describe('when product is already in cart', () => {

		it('should handle ADD_TO_CART action', () => {
			const state = {
				addedIds: [ 1, 2 ],
				quantityById: { 1: 1, 2: 1 }
			};

			expect(cartReducer(state, { type: 'ADD_TO_CART', data: {productId: 2, qty: 1 }})).toEqual({
				addedIds: [ 1, 2 ],
				quantityById: { 1: 1, 2: 2 }
			});
		});

		it('should handle UPDATE_CART action', () => {

			const state = {
				addedIds: [ 1, 2 ],
				quantityById: { 1: 1, 2: 1 }
			};

			expect(cartReducer(state, { type: 'UPDATE_CART', data: {productId: 2, qty: 3 }})).toEqual({
				addedIds: [ 1, 2 ],
				quantityById: { 1: 1, 2: 3 }
			});
		});

		it('should handle REMOVE_FROM_CART action', () => {

			const state = {
				addedIds: [ 1, 2 ],
				quantityById: { 1: 1, 2: 1 }
			};

			expect(cartReducer(state, { type: 'REMOVE_FROM_CART', data: {productId: 2}})).toEqual({
				addedIds: [ 1 ],
				quantityById: { 1: 1, 2: 0 }
			});
		});
    });

});

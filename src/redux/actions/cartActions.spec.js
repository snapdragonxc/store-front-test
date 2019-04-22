
import * as actions from './cartActions';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART
} from '../constants/cart'

describe('actions', () => {

	it('should create an action ADD_TO_CART', () => {

		const expectedAction = { type: ADD_TO_CART, data: { productId: 1, qty: 1 }};

		expect(actions.addToCart(1, 1)).toEqual(expectedAction);
	});

	it('should create an action REMOVE_FROM_CART', () => {

		const expectedAction = { type: REMOVE_FROM_CART, data: { productId: 1}};

		expect(actions.removeFromCart(1)).toEqual(expectedAction);
	});

	it('should create an action UPDATE_CART', () => {

		const expectedAction = { type: UPDATE_CART, data: { productId: 1, qty: 2 }};

		expect(actions.updateCart(1, 2)).toEqual(expectedAction);
	});
});


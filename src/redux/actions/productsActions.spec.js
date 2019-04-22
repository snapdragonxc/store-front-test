import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from './productsActions';

import received from '../../mocks/productsMock';

import { 
  GET_PRODUCTS_START, 
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "../constants/products"

// set up

const middlewares = [thunk];

const createProductsStore = configureMockStore(middlewares);

// Test action creators

describe('actions', () => {

	it('should create an action GET_PRODUCTS_START', () => {

		const expectedAction = { type: GET_PRODUCTS_START };

		expect(actions.getProductsStart()).toEqual(expectedAction);
	});

	it('should create an action GET_PRODUCTS_SUCCESS', () => {

		const expectedAction = { type: GET_PRODUCTS_SUCCESS, data: received.data};

		expect(actions.getProductsSuccess(received.data)).toEqual(expectedAction);
	});

	it('should create an action GET_PRODUCTS_ERROR', () => {

		const expectedAction = { type: GET_PRODUCTS_ERROR, error: { message: 'an error occurred'}};

		expect(actions.getProductsError({ message: 'an error occurred'})).toEqual(expectedAction);
	});
});

/* Test Thunk action functions */

describe('thunk actions', () => {

	beforeEach(function () {
		moxios.install();
	});

	afterEach(function () {
		moxios.uninstall();
	});

	it('creates GET_PRODUCTS_SUCCESS action after successfully fetching products', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
			status: 200,
			response: received,
			});
		});

		const expectedActions = [
			{ type: GET_PRODUCTS_START },
			{ type: GET_PRODUCTS_SUCCESS, data: received },
		];

		const ProductsStoreMock = createProductsStore({ data: {} });

		return ProductsStoreMock.dispatch(actions.getProducts()).then(() => {

			expect(ProductsStoreMock.getActions()).toEqual(expectedActions);
		});
	});


	it('create GET_PRODUCTS_ERROR after unsuccesfully fetching products', () => {

		moxios.wait(() => {
			const request = moxios.requests.mostRecent()
			request.respondWith({
				status: 500,
				response: '',
			})
		});

		const expectedActions = [
			{ type: GET_PRODUCTS_START },
			{type: GET_PRODUCTS_ERROR, error: 500 }
		];

		const ProductsStoreMock = createProductsStore({ data: {} });

		return ProductsStoreMock.dispatch(actions.getProducts()).then(() => {

			expect(ProductsStoreMock.getActions()).toEqual(expectedActions);

		});
	})
});


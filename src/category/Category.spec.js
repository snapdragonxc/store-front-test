import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});

import { Category } from './Category'

describe("The Category container", () => {

	describe("Component mounts successfully", () => {
		const state = {products: []};
		const props = {getProducts: jest.fn()};
		const  wrapper = shallow(<Category {...props} />);
		const instance = wrapper.instance();

		instance.state = state;

		it('should call getProducts function', () => {	

			jest.spyOn(props, 'getProducts');

			instance.componentDidMount();	

			expect(props.getProducts).toHaveBeenCalled();	
		});
	});

	describe("add to cart button", () => {
		const state = {products: []};
		const props = {
			getProducts: jest.fn(),
			addToCart: jest.fn()
		};
		const quantity = 1;
		const productIndex = 1;
		const event = {};
		const  wrapper = shallow(<Category {...props} />);
		const instance = wrapper.instance();

		instance.state = state;

		it('should not call addToCart action when the add to cart button is clicked with invalid index', () => {
			jest.clearAllMocks();
			jest.spyOn(props, 'addToCart');	
			instance.onAddToCart(event, undefined);
			expect(props.addToCart).not.toHaveBeenCalled();	
		});

		it('should call addToCart action when the add to cart button is clicked', () => {
			jest.clearAllMocks();
			jest.spyOn(props, 'addToCart');	
			instance.onAddToCart(event, productIndex);
			expect(props.addToCart).toHaveBeenCalled();	
		});

		it('should call addToCart action with the correct product index and quantity when the add to cart button is clicked', () => {
			jest.clearAllMocks();
			jest.spyOn(props, 'addToCart');	
			instance.onAddToCart(event, productIndex);
			expect(props.addToCart).toHaveBeenCalledWith(1, quantity);	
		});
	});

	describe("view details button", () => {

		const state = {products: []};
		const history = {
			push: jest.fn()
		}
		const props = {
			getProducts: jest.fn(),
			addToCart: jest.fn(),
			history: history
		};
		const productIndex = 1;
		const event = {};
		const  wrapper = shallow(<Category {...props} />);
		const instance = wrapper.instance();

		instance.state = state;

		it('should not redirect when the view details button is clicked without a valid product index', () => {		
			jest.clearAllMocks();
			jest.spyOn(history, 'push');
			instance.onViewDetails(event, undefined);
			expect(history.push).not.toHaveBeenCalled();	
		});

		it('should redirect when the view details button is clicked', () => {	
			jest.clearAllMocks();		
			jest.spyOn(history, 'push');
			instance.onViewDetails(event, productIndex);
			expect(history.push).toHaveBeenCalled();	
		});

		it('should redirect to the correct page when the view details button is clicked', () => {	
			jest.clearAllMocks();		
			jest.spyOn(history, 'push');
			instance.onViewDetails(event, productIndex);
			expect(history.push).toHaveBeenCalledWith('product/1');	
		});
	});

});


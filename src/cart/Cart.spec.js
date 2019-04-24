import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});

import { Cart } from './Cart'

describe("The Cart container", () => {

	describe("Cart functionality", () => {

		const props = {
			cart: {},
			updateCart: jest.fn(),
  			removeFromCart: jest.fn()
		};
		const event = {preventDefault: () => {}}

		const  wrapper = shallow(<Cart {...props} />);
		const instance = wrapper.instance();

		it('should not update the cart when the quantity button is clicked with invalid parameters', () => {	
			jest.spyOn(props, 'updateCart');
			const value = undefined;
			const productIndex = undefined;
			instance.onChange(value, productIndex);			// the quantity buttons	
			expect(props.updateCart).not.toHaveBeenCalled();	
		});

		it('should update the cart when the quantity button is clicked with product index 0', () => {
			jest.clearAllMocks();	
			jest.spyOn(props, 'updateCart');
			const value = 1;
			const productIndex = 0;
			instance.onChange(value, productIndex);			// the quantity buttons	
			expect(props.updateCart).toHaveBeenCalled();	
		});

		it('should update the cart when the quantity button is clicked', () => {	
			jest.spyOn(props, 'updateCart');
			const value = 3;
			const productIndex = 1;
			instance.onChange(value, productIndex);			// the quantity buttons	
			expect(props.updateCart).toHaveBeenCalled();	
		});

		it('should update the cart with the correct value and index when the quantity button is clicked', () => {	
			jest.spyOn(props, 'updateCart');
			const value = 3;
			const productIndex = 1;
			instance.onChange(value, productIndex);			// the quantity buttons	
			expect(props.updateCart).toHaveBeenCalledWith(productIndex, value);	
		});

		it('should not remove from the cart when the remove button is clicked with invalid product index', () => {	
			jest.spyOn(props, 'removeFromCart');
			const productIndex = undefined;
			instance.onRemove(event, productIndex);			// the remove button
			expect(props.removeFromCart).not.toHaveBeenCalled();	
		});

		it('should remove from the cart when the remove button is clicked with a product index of 0', () => {
			jest.clearAllMocks();	
			jest.spyOn(props, 'removeFromCart');
			const productIndex = 0;
			instance.onRemove(event, productIndex);			// the remove button
			expect(props.removeFromCart).toHaveBeenCalled();	
		});

		it('should remove from the cart when the remove button is clicked with valid product index', () => {	
			jest.spyOn(props, 'removeFromCart');
			const productIndex = 1;
			instance.onRemove(event, productIndex);			// the remove button
			expect(props.removeFromCart).toHaveBeenCalled();	
		});

		it('should remove from the cart with correct index when the remove button is clicked with valid product index', () => {	
			jest.spyOn(props, 'removeFromCart');
			const productIndex = 1;
			instance.onRemove(event, productIndex);			// the remove button
			expect(props.removeFromCart).toHaveBeenCalledWith(productIndex);	
		}); 
	});
});

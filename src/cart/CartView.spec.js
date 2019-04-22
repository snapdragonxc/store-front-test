import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});

import CartView from './CartView';

describe("The CartView", () => {

	describe("CartView when the cart is empty", () => {
		const props = {
			cart: { cartItems: [], total: 0 }
		};
		const  wrapper = shallow(<CartView {...props} />);
		const instance = wrapper.instance();

		it('should contain the empty message', () => {
    		expect(wrapper.find('.cart__empty-msg').text()).toEqual('There are no items in your cart');
  		});

  		it('should not contain the table', () => {
    		expect(wrapper.exists('.cart__table')).toBe(false);
  		});

  		it('should contain the return link', () => {
    		expect(wrapper.exists('.cart__link-container--return')).toBe(true);
  		});

	});

	describe("CartView when the cart contains products", () => {

		const items = [{
		    "title": "Hand Painted Blue Flat Dish",
		    "brand": "Kiriko",
		    "price": 28,
		    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.",
		    "image": "hand-painted-blue-flat-dish.jpg"
		 }, {
			"title": "Heme",
			"brand": "Dust & Form",
			"price": 52,
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.",
			"image": "heme.jpg"
		}];
		const cart = {
			cartItems: [
	      		{ product: items[0], quantity: 4, subTotal: 112, productIndex: 1 },
            	{ product: items[1], quantity: 2, subTotal: 104, productIndex: 2 },
	      	],
	      	total: 216
		}
		const props = {
			cart: cart,
		};
		const  wrapper = shallow(<CartView {...props} />);
		const instance = wrapper.instance();

		it('should contain the correct number of products', () => {
    		expect(wrapper.find('.cart__tr').length).toEqual(3);
  		});

  		it('should contain the product titles and quanity', () => {
    		expect(wrapper.find('.cart__title').at(0).text()).toEqual('Hand Painted Blue Flat Dish');
    		expect(wrapper.find('.cart__title').at(1).text()).toEqual('Heme');
  		});

  		it('should contain the product brands', () => {
    		expect(wrapper.find('.cart__brand').at(0).text()).toEqual('Kiriko');
    		expect(wrapper.find('.cart__brand').at(1).text()).toEqual('Dust & Form');
  		});

  		it('should contain the product subtotal prices', () => {
    		expect(wrapper.find('.cart__subtotal').at(0).text()).toEqual('$112.00');
    		expect(wrapper.find('.cart__subtotal').at(1).text()).toEqual('$104.00');
  		}); 

  		it('should contain the product total', () => {
    		expect(wrapper.find('.cart__total-bold').text()).toEqual('$216.00 CAD');
    		
  		}); 

  		it('should contain the continue shopping link', () => {
    		expect(wrapper.exists('.cart__link-container')).toBe(true);
  		});
	});	
});



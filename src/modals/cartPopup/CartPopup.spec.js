import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});

import { CartPopup } from './CartPopup'

describe("The CartPopup container", () => {

	describe("CartPopup functionality", () => {

		const props = {
			cart: { cartItems: [], total: 0 },
  			removeFromCart: jest.fn(),
  			setModalState: jest.fn()
		};

		const  wrapper = shallow(<CartPopup {...props} />);
		const instance = wrapper.instance();

		it('should call the close modal property when the user clicks outside', () => {	

			jest.spyOn(props, 'setModalState');
			instance.refs = {}; 
			instance.refs.modal = 'modal';
			instance.componentDidMount();
			const event = {target: 'modal'}
			window.onclick(event); 		// click outside the component
			expect(props.setModalState).toHaveBeenCalled();	
		});

		it('should call the close modal property with the correct parameter when the user clicks outside', () => {

			jest.clearAllMocks();	

			jest.spyOn(props, 'setModalState');
			instance.refs = {}; 
			instance.refs.modal = 'modal';
			instance.componentDidMount();
			const event = {target: 'modal'}
			window.onclick(event); 		// click outside the component
			expect(props.setModalState).toHaveBeenCalledWith(false);	
		});

		it('should not remove from the cart when the remove button is clicked with invalid product index', () => {	

			jest.clearAllMocks();

			jest.spyOn(props, 'removeFromCart');
			const productIndex = undefined;
			instance.onRemove(productIndex);			// the remove button
			expect(props.removeFromCart).not.toHaveBeenCalled();	
		});

		it('should remove from the cart when the remove button is clicked with valid product index', () => {	
			jest.clearAllMocks();
			jest.spyOn(props, 'removeFromCart');
			const productIndex = 1;
			instance.onRemove(productIndex);			// the remove button
			expect(props.removeFromCart).toHaveBeenCalled();	
		});

		it('should remove from the cart with correct index when the remove button is clicked with valid product index', () => {	
			jest.clearAllMocks();
			jest.spyOn(props, 'removeFromCart');
			const productIndex = 1;
			instance.onRemove(productIndex);			// the remove button
			expect(props.removeFromCart).toHaveBeenCalledWith(productIndex);	
		});
	});

	describe("CartPopup View when open", () => {
		const props = {
			cart: { cartItems: [], total: 0 },
  			removeFromCart: jest.fn(),
  			modalOpen: true
		};
		const  wrapper = shallow(<CartPopup {...props} />);
		const instance = wrapper.instance();

		it('should contain the modal open class', () => {
    		expect(wrapper.exists('.open')).toEqual(true);
  		});

  		it('should not contain the modal close class', () => {
    		expect(wrapper.exists('.close')).toEqual(false);
  		});
	});

	describe("CartPopup View when closed", () => {
		const props = {
			cart: { cartItems: [], total: 0 },
  			removeFromCart: jest.fn(),
  			modalOpen: false
		};
		const  wrapper = shallow(<CartPopup {...props} />);
		const instance = wrapper.instance();

		console.log('wr', wrapper.debug())

		it('should contain the modal close class', () => {
    		expect(wrapper.exists('.close')).toEqual(true);
  		});

  		it('should not contain the modal open class', () => {
    		expect(wrapper.exists('.open')).toEqual(false);
  		});

	});


	describe("CartPopup View when the cart is empty", () => {
		const props = {
			cart: { cartItems: [], total: 0 },
  			removeFromCart: jest.fn()
		};
		const  wrapper = shallow(<CartPopup {...props} />);
		const instance = wrapper.instance();

		it('should contain the empty message', () => {
    		expect(wrapper.find('.cart-popup__empty-msg').text()).toEqual('There are no items in your cart');
  		});

  		it('should not contain the table', () => {
    		expect(wrapper.exists('.cart-popup__table')).toBe(false);
  		});

  		it('should not contain the buttons', () => {
    		expect(wrapper.exists('.cart-popup__btns')).toBe(false);
  		});

  		it('should not contain the total', () => {
    		expect(wrapper.exists('.cart-popup__total')).toBe(false);
  		});

	});

	describe("CartPopup View when the cart contains products", () => {

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
  			removeFromCart: jest.fn()
		};
		const  wrapper = shallow(<CartPopup {...props} />);
		const instance = wrapper.instance();

		it('should contain the correct number of products', () => {
    		expect(wrapper.find('.cart-popup__tr').length).toEqual(2);
  		});

  		it('should contain the product titles and quanity', () => {
    		expect(wrapper.find('.cart-popup__title').at(0).text()).toEqual('Hand Painted Blue Flat Dish x 4');
    		expect(wrapper.find('.cart-popup__title').at(1).text()).toEqual('Heme x 2');
  		});

  		it('should contain the product quanity', () => {
    		expect(wrapper.find('.cart-popup__qty').at(0).text()).toEqual(' x 4');
    		expect(wrapper.find('.cart-popup__qty').at(1).text()).toEqual(' x 2');
  		});

  		it('should contain the product brands', () => {
    		expect(wrapper.find('.cart-popup__brand').at(0).text()).toEqual('Kiriko');
    		expect(wrapper.find('.cart-popup__brand').at(1).text()).toEqual('Dust & Form');
  		});

  		it('should contain the product prices', () => {
    		expect(wrapper.find('.cart-popup__price').at(0).text()).toEqual('$28.00');
    		expect(wrapper.find('.cart-popup__price').at(1).text()).toEqual('$52.00');
  		});

  		it('should contain the product total', () => {
    		expect(wrapper.find('.cart-popup__total').children().at(1).text()).toEqual('$216.00');
    		
  		});
	});
});



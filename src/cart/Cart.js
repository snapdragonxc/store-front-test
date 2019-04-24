//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartView from './CartView.js';
import { updateCart, removeFromCart } from '../redux/actions/cartActions';
import { getCartState } from '../redux/reducers';

type ProductType = {
    title: string,
    brand: string,
    price: number,
    description: string,
    image: string
};

type CartItem = {
    product: ProductType,
    quantity: number,
    subTotal: number,
    productIndex: number
};

type CartType = {
    cartItems: Array<CartItem>,
    total: number
};

type CartPropsType = {
    cart: CartType,
    updateCart: Function,
    removeFromCart: Function
};

type CartStateType = {};

export class Cart extends Component<CartPropsType, CartStateType> {

	constructor(props: CartPropsType) {
		super(props);
		this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
	}

    onChange: Function
	onChange(value: number, productIndex: number) {
        const { updateCart } = this.props;
		if ((productIndex || productIndex === 0) && value) updateCart(productIndex, value);
	}

    onRemove: Function
    onRemove(e: any, productIndex: number) {
        e.preventDefault();
        const { removeFromCart } = this.props;
        if (productIndex || productIndex === 0) removeFromCart(productIndex); 
    }

    render() {
    	const { cart } = this.props;
        return (
            <CartView
            	cart={cart}
            	onChange={this.onChange}
                onRemove={this.onRemove}
            />
        );
    }
}

const mapDispatchToProps = {
    updateCart,
    removeFromCart
};

const mapStateToProps = state => ({
    cart:  getCartState(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
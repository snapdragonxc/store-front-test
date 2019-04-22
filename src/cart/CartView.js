//@flow

import React from 'react';
import { Link } from 'react-router-dom';

import './Cart.css';

import Btn from '../components/btn/Btn.js';
import Counter from '../components/counter/Counter.js';

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

type CartViewPropsType = {
    cart: CartType,
    onChange: Function,
    onRemove: Function
};


const CartView = ({ cart, onChange, onRemove }: CartViewPropsType) => {

	const { cartItems, total } = cart;
	let items = [];

	if (cartItems.length !== 0) {
		items = cartItems.map((item, index) => {
			const { product, quantity, subTotal, productIndex } = item;
			return (
				<tr className="cart__tr" key={index} >
					<td className="cart__td">
						<div className="cart__img-container">
							<img alt="product" className="cart__img" src={`${process.env.PUBLIC_URL || ''}/media/${product.image}`}/>
						</div>
						<div className="cart__detail-container">
							<div className="cart__brand">{product.brand}</div>
							<div className="cart__title">
								{product.title}
							</div>						
						</div>
					</td>
					<td className="cart__td">
						<Counter 
							value={quantity}
							handleChange={value => onChange(value, productIndex)}
						/>
					</td>
					<td className="cart__td cart__subtotal">
						${Number(subTotal).toFixed(2)}
					</td>
					<td className="cart__td">
						<span className="cart__close" onClick={e => onRemove(productIndex)}></span>
					</td>
				</tr>
			)
		});
	}

	return (
		<div className="cart">
			<header className="cart__header">
				<h2 className="cart__page-title">Shopping Cart</h2>
			</header>
			<div className="cart__main">

			{ (cartItems.length === 0)? 
				<div className="cart__empty">
					<div className="cart__empty-msg">
						There are no items in your cart
					</div>	
					<div>				
						<div className="cart__link-container cart__link-container--return">
							<Link to="/" className="cart__link">CONTINUE SHOPPING</Link>
						</div>
					</div>
				</div>
				:
				<div>
					<table className="cart__table">
						<thead>
							<tr className="cart__tr">
								<th className="cart__th">
									Product
								</th>
								<th className="cart__th">
									Quantity
								</th>
								<th className="cart__th">
									Total
								</th>
								<th className="cart__th">
									Action
								</th>
							</tr>
						</thead>

						<tbody>
							{items}
						</tbody>
					</table>
					<div className="cart__overview">
						<div className="cart__total">CART OVERVIEW</div>
						<div className="cart__total"><span>SUBTOTAL</span><span>${total}.00</span></div>
						<div className="cart__total"><span>TOTAL</span><span className="cart__total-bold">${Number(total).toFixed(2)} CAD</span></div>
					</div>

					<div className="clear-fix"></div>

					<footer className="cart__footer">
						<div className="cart__link-container">
							<Link to="/" className="cart__link">CONTINUE SHOPPING</Link>
						</div>
						<Btn label={`checkout ($${Number(total).toFixed(2)})`} btnStyle={'no-margin'} btnClick={e => {}} />
					</footer>
				</div>
			}
			</div> 
		</div>
	);
}

export default CartView;
//@flow

import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import { getCartState } from '../../redux/reducers';
import './CartPopup.css';
import Btn from '../../components/btn/Btn.js';

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

type CartPopupPropsType = {
    cart: CartType,
    onViewCart: Function,
    removeFromCart: Function,
    setModalState: Function,
    modalOpen: boolean
};

type CartPopupStateType = {};

export class CartPopup extends Component<CartPopupPropsType, CartPopupStateType> {

	constructor(props: CartPopupPropsType) {
		super(props);
        this.onRemove = this.onRemove.bind(this);
	}
    
    componentDidMount() {
    	const { setModalState } = this.props;
    	window.onclick = (event) => {
			if (event.target === this.refs.modal) setModalState(false);
		}
    }

    onRemove: Function
    onRemove(productIndex: number) {
    	const { removeFromCart } = this.props;
        if (productIndex || productIndex === 0) removeFromCart(productIndex);  
    }

    render() {
    	const { cart, onViewCart, modalOpen } = this.props;
    	const { cartItems, total } = cart;
		let items = [];

		if (cartItems.length !== 0) {
			items = cartItems.map((item, index) => {
				const { product, quantity, productIndex } = item;
				return (
					<tr className="cart-popup__tr" key={index}>
						<td className="cart-popup__td">
							<div className="cart-popup__img-container">
								<img alt="product" className="cart-popup__img" src={`${process.env.PUBLIC_URL || ''}/media/${product.image}`}/>
							</div>
							<div>
								<div className="cart-popup__title">
									{product.title}
									<span className="cart-popup__qty"> x {quantity}</span>
								</div>
								<div className="cart-popup__brand">{product.brand}</div>
								<div className="cart-popup__price">${Number(product.price).toFixed(2)}</div>
							</div>
						</td>

						<td className="cart-popup__td">
							<a className="cart-popup__remove" onClick={e => this.onRemove(productIndex)}>&times;</a>
						</td>
					</tr>
				)
			});
		}

		return (
			<div ref="modal" className={modalOpen? 'modal open' : 'modal close'} >
			  <div className="modal-content">
			  	{ (cartItems.length === 0)? 
						<div className="cart-popup__empty">
							<div className="cart-popup__empty-msg">
								There are no items in your cart
							</div>	
						</div>
					:
						<div>
							<table className="cart-popup__table">
								<tbody>
									{items}
									
								</tbody>
							</table>

							<div className="cart-popup__total">
								<span>TOTAL</span>
								<span>${Number(total).toFixed(2)}</span>
							</div>

							<div className="cart-popup__btns">
								<Btn label={'view cart'} btnStyle={'reverse half-width'} btnClick={e => onViewCart(e)}/>
								<Btn label={'checkout'} btnStyle={'half-width'} btnClick={e => {}}/>
							</div>
						</div>
				}
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = {
  removeFromCart
};

const mapStateToProps = state => ({
  cart:  getCartState(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPopup);

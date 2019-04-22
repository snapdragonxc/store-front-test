//@flow
import React from 'react';
import CartPopup from "../modals/cartPopup/CartPopup";
import './Header.css';

type HeaderViewPropsType = {
    modalOpen: boolean, 
    onViewCart: Function, 
    setModalState: Function, 
    qty: number
};

const HeaderView = ({ modalOpen, onViewCart, setModalState, qty }: HeaderViewPropsType) => (
	<header className="header">
		<div className="row">
			<div className="header__logo sm-col-span-12 lg-col-span-3">
				<div className="logo">
					<img  alt="logo" className="logo__img" src={`${process.env.PUBLIC_URL || ''}/media/logo.png`} />
				</div>
			</div>

			<nav className="header__nav sm-col-span-12 lg-col-span-6">
				<ul className="header__list">
					<li className="header__item">HOME</li>
					<li className="header__item">SHOP <i className="fas fa-caret-down"></i></li>
					<li className="header__item">JOURNAL</li>
					<li className="header__item">MORE <i className="fas fa-caret-down"></i></li>
				</ul>
			</nav>

			<div className="header__cart sm-col-span-12 lg-col-span-3">
				<span onClick={e => setModalState(true)} className="header__cart-link">MY CART {(qty !== 0)? `(${qty})` : ''} <i className="fas fa-caret-down"></i></span>
			</div>
		</div>
		<div className="clear-fix"></div>

		<CartPopup onViewCart={onViewCart} modalOpen={modalOpen} setModalState={setModalState} />

	</header>
)

export default HeaderView;
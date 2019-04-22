//@flow
import React from 'react';
import Btn from '../components/btn/Btn.js';
import Counter from '../components/counter/Counter.js';
import './Product.css';

type ProductType = {
    title: string,
    brand: string,
    price: number,
    description: string,
    image: string
};

type ProductViewPropsType = {
    product: ProductType,
    addToCart: Function,
    onCnt: Function
};

const ProductView = ({ product, addToCart, onCnt }: ProductViewPropsType) => {
	let title = '';  
	let price = '';
	let description = '';
	let image = '';
	let brand = '';

	if (product) {
		title = product.title;
		price = product.price;
		description = product.description;
		image = product.image;
		brand = product.brand;
	}

	return (
	  <div className="product-detail">
	   
	  	<header className="product-detail__header">
			<div className="url">HOME / PLATES / <span className="url__name">{title}</span></div>
		</header>

		<div className="product-detail__main">
			<div className="detail row">
				<div className="detail__img-container sm-col-span-12 lg-col-span-7">
					<img alt="detail" className="detail__img" src={`${process.env.PUBLIC_URL || ''}/media/${image}`} />
				</div>
				<div className="detail__txt sm-col-span-12 lg-col-span-5">
					<div className="detail__brand">{brand}</div>
					<h3 className="detail__title">{title}</h3>
					<div className="detail__price">${Number(price).toFixed(2)}</div>
					<div className="detail__description">{description}</div>
					<div className="detail__ui">
						<Counter handleChange={onCnt} />
						<Btn label={'add to cart'} btnClick={addToCart}/> 
					</div>
				</div>
				<div className="clear-fix"></div>
			</div>
		</div>

	  </div>
	)
}

export default ProductView;
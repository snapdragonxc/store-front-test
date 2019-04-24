//@flow
import React from 'react';
import Btn from '../components/btn/Btn.js';
import './Category.css';

type ProductType = {
    title: string,
    brand: string,
    price: number,
    description: string,
    image: string
};

type CategoryViewPropsType = {
    products: Array<ProductType>,
    onViewDetails: Function,
    onAddToCart: Function,
};

const CategoryView = ({ 
	products, 
	onViewDetails,
	onAddToCart}: CategoryViewPropsType ) => {

	let items = [];

	if (products !== undefined ) {

		items = products.map((product, index) => {

			const { title, brand, price, image } = product;

			return (
				<React.Fragment key={index}>
					<li className="product  sm-col-span-12 lg-col-span-4">
						<div className="product__img-container">
							<img alt="product" className="product__img" src={`${process.env.PUBLIC_URL || ''}/media/${image}`}/>
							<div className="product-tile-overlay">	
								<Btn label={'view details'} btnStyle={'full-width'} btnClick={e => onViewDetails(e, index)} />
								<Btn label={'add to cart'} btnStyle={'full-width'} btnClick={e => onAddToCart(e, index)}/>
							</div>
						</div>
						<div className="product__brand">{brand}</div>
						<h3 className="product__title">{title}</h3>
						<div className="product__price">${Number(price).toFixed(2)}</div>
					</li>
					{
		               (index + 1) % 3 === 0
		                && <div className="clearfix"></div>
		            }
		        </React.Fragment>
			)

		});
	}

	return (
		<div className="category">
			<header className="category__products-header">
				<div className="row">
					<div className="sm-col-span-3 lg-col-span-3">
						<div className="products-header__bkgnd">
							<img alt="header" className="products-header__img" src={`${process.env.PUBLIC_URL || ''}/media/plates-header.jpg`} />
						</div>			
					</div>

					<div className="sm-col-span-6 lg-col-span-6">
						<div className="products-header__caption-container">
							<div className="products-header__caption">
								<h2 className="products-header__title">Plates</h2>
								<p className="products-header__description">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
									Aliquam at purus pulvinar, placerat turpis ac, interdum metus. 
									In eget massa sed enim hendrerit aucttor a eget arcu. Curabitur ac pharetra nisi sit.
								</p>
							</div>
						</div>
					</div>

					<div className="sm-col-span-3 lg-col-span-3">
						<div className="products-header__bkgnd">
							<img alt="header" className="products-header__img products-header__img--right" src={`${process.env.PUBLIC_URL || ''}/media/plates-header.jpg`} />
						</div>			
					</div>
				</div>
			</header>

			<div className="clear-fix"></div>
			
			<div className="category__products">
				<ul className="products row">
					{ items }
				</ul>
			</div>
		</div>
)}

export default CategoryView;
//@flow

import React, { Component } from 'react';
import CategoryView from './CategoryView.js';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/productsActions';
import { addToCart } from '../redux/actions/cartActions';

type RouterHistory = {
    push(path: string, state?: any): void
};

type ProductType = {
    title: string,
    brand: string,
    price: number,
    description: string,
    image: string
};

type CategoryPropsType = {
    products: Array<ProductType>,
    getProducts: Function,
    addToCart: Function,
    history: RouterHistory,
};

type CategoryStateType = {};


export class Category extends Component<CategoryPropsType, CategoryStateType> {

	constructor(props: CategoryPropsType) {
	    super(props);
	    this.onViewDetails = this.onViewDetails.bind(this);
	    this.onAddToCart = this.onAddToCart.bind(this);
	}

	componentDidMount() {
	    this.props.getProducts();
	}


	onViewDetails: Function
	onViewDetails(event: any, index: number) {
		const { history } = this.props;
		if ( index || index === 0) {
			let productIndex = index;
			history.push(`product/${productIndex}`);		
		}			
	}

	onAddToCart: Function
	onAddToCart(event: any, productIndex: number) {
		const { addToCart } = this.props;
		if (productIndex || productIndex === 0) addToCart(productIndex, 1);
	}

    render() {
    	const { products } = this.props;
        return (
           <CategoryView
           		products={products}
           		onViewDetails={this.onViewDetails}
           		onAddToCart={this.onAddToCart}
           />
        );
    }
}

const mapDispatchToProps = {
  getProducts,
  addToCart
};

const mapStateToProps = state => ({
  products: state.productsReducer.products
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);

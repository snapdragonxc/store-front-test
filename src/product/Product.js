//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/productsActions';
import { addToCart } from '../redux/actions/cartActions';
import { findProduct } from '../redux/reducers';
import ProductView from './ProductView.js';

type Match = {
    params: { [key: string]: ?string },  // <- here
    isExact: boolean,
    path: string,
    url: string
  }

type ProductType = {
    title: string,
    brand: string,
    price: number,
    description: string,
    image: string
};

type ProductPropsType = {
    products: Array<ProductType>,
    getProducts: Function,
    addToCart: Function,
    match: Match
};

type ProductStateType = {
  id: number,
  qty: number
};

export class Product extends Component<ProductPropsType, ProductStateType> {
    
    constructor(props: ProductPropsType) {
        super(props);
        this.state = {
            id: Number(props.match.params.id),
            qty: 1
        };
        this.addToCart=this.addToCart.bind(this);
        this.onCnt=this.onCnt.bind(this);
    }

    componentDidMount() {
        const { id } = this.state; 
        const { products }= this.props;
        if (findProduct(id, products)) return;      
        this.props.getProducts(); // call get products if not loaded
    }

    addToCart: Function
    addToCart(event: any) {         
        const { id, qty } = this.state; 
        this.props.addToCart(id, qty);
    }

    onCnt: Function
    onCnt(value: number) {
        if (value) this.setState({qty: value});
    }

    render() {
        const { id } = this.state; 
        const { products }= this.props;
        const product = findProduct(id, products);      
        return  (
            <ProductView 
                product={product} 
                addToCart={this.addToCart}
                onCnt={this.onCnt}
            />
        );
    }
}

const mapDispatchToProps = {
  getProducts,
  addToCart
};

const mapStateToProps = state => ({
  products: state.productsReducer.products,
  cart: state.cartReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);




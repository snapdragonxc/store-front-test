//@flow
import React, { Component } from 'react';
import HeaderView from './HeaderView.js';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { getCartQty } from '../redux/reducers';

type RouterHistory = {
    push(path: string, state?: any): void
};

type HeaderPropsType = {
    history: RouterHistory,
    qty: number
};

type HeaderStateType = {
  modalOpen: boolean
};

export class Header extends Component<HeaderPropsType, HeaderStateType> {

	constructor(props: HeaderPropsType) {
        super(props);
        this.state = { 
          modalOpen: false
        };
        this.setModalState = this.setModalState.bind(this);
        this.onViewCart = this.onViewCart.bind(this);
    }

    setModalState: Function
    setModalState(state: boolean ) {
        this.setState({modalOpen: state});
    }

    onViewCart: Function
    onViewCart(event: any) {
      this.setState({modalOpen: false});
    	this.props.history.push('/cart');
    }

    render() {
        const { modalOpen } = this.state;
        const { qty } = this.props;
        return (
           <HeaderView
           		setModalState={this.setModalState}
           		onViewCart={this.onViewCart}
              modalOpen={modalOpen}
              qty={qty}
           />
        );
    }
}

const mapStateToProps = state => ({
  qty: getCartQty(state)
});

export default connect(mapStateToProps)(withRouter(Header));

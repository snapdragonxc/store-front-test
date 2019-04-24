//@flow
import React, { Component } from 'react';
import './Counter.css';

type CounterPropsType = {
   value?: number,
   handleChange: (value: number) => {} 
};

type CounterStateType = {
    value: number
};

export class Counter extends Component<CounterPropsType, CounterStateType> {
    
    constructor(props: CounterPropsType) {
        super(props);
        this.state = {
        	value: props.value || 1
        }
        this.onMinus=this.onMinus.bind(this);
        this.onPlus=this.onPlus.bind(this);
    }

    onPlus: Function
    onPlus() {
    	let cnt = this.state.value;
    	cnt = cnt + 1;
    	this.setState({value: cnt});   	
    	this.props.handleChange(cnt); 	
    }

    onMinus: Function
    onMinus() {
    	let cnt = this.state.value;
    	cnt = cnt - 1;
    	if (cnt < 1) return;
    	this.setState({value: cnt});
    	this.props.handleChange(cnt);	
    }

	render() {
		const { value } = this.state;
		return (
		   <div className="counter">
				<span className="counter__display">{value}</span>
				<a href="#" className="counter__ctrl counter__ctrl--plus" onClick={e => this.onPlus()}>+</a>
				<a href="#" className="counter__ctrl counter__ctrl--minus" onClick={e => this.onMinus()}>-</a>
			</div> 
		)
	}
};

export default Counter;
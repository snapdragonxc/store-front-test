import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});

import { Btn } from './Btn'

describe("The Btn Component", () => {

	describe("The Btn view and functionality", () => {
		const label = 'myButton';
		const btnStyle = 'myStyle'
		const props = {
			label, 
			btnStyle, 
			btnClick: jest.fn()
		};
		const  wrapper = shallow(<Btn {...props} />);
		const instance = wrapper.instance();

		it('should mount with the correct label', () => {	
			expect(wrapper.find('button').text()).toEqual(label);
		});

		it('should mount with the correct style', () => {	
			expect(wrapper.exists('.myStyle')).toBe(true);
		});

		it('should call the btnClick function when the button is clicked', () => {	
			jest.spyOn(props, 'btnClick');
			wrapper.find('button').simulate('click');
			expect(props.btnClick).toHaveBeenCalled();	
		});
	});

	describe("The Btn view with no style input", () => {
		const label = 'myButton';
		const props = {
			label, 
			btnClick: jest.fn()
		};
		const  wrapper = shallow(<Btn {...props} />);
		const instance = wrapper.instance();

		it('should mount with the correct label', () => {	
			expect(wrapper.find('button').text()).toEqual(label);
		});
	});
});

import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});

import { Counter } from './Counter'

describe("The Counter", () => {

	describe("Counter mount functionality", () => {

		const props = {
			handleChange: jest.fn(),
			value: undefined
		};
		const  wrapper = shallow(<Counter {...props} />);
		const instance = wrapper.instance();

		it('should mount', () => {	
			expect(instance.state.value).toEqual(1);
		});
	});

	describe("Counter mount functionality", () => {

		const props = {
			handleChange: jest.fn(),
			value: 2
		};
		const  wrapper = shallow(<Counter {...props} />);
		const instance = wrapper.instance();

		it('should mount with the correct value', () => {	
			expect(instance.state.value).toEqual(2);
		});
	});

	describe("Counter plus & minus buttons", () => {

		const props = {
			handleChange: jest.fn(),
			value: 2
		};
		const  wrapper = shallow(<Counter {...props} />);
		const instance = wrapper.instance();

		it('should mount with the correct value', () => {	
			expect(instance.state.value).toEqual(2);
		});

		it('should call the handleChange function when the plus button is clicked', () => {	

			jest.spyOn(props, 'handleChange');

			wrapper.find('.counter__ctrl.counter__ctrl--plus').simulate('click');

			expect(instance.state.value).toEqual(3);

			expect(props.handleChange).toHaveBeenCalled();	
		});

		it('should call the handleChange function with the correct parameters when the plus button is clicked', () => {	

			jest.clearAllMocks();

			jest.spyOn(props, 'handleChange');

			wrapper.find('.counter__ctrl.counter__ctrl--plus').simulate('click');

			expect(instance.state.value).toEqual(4);	

			expect(props.handleChange).toHaveBeenCalledWith(4);	
		});

		it('should call the handleChange function when the minus button is clicked', () => {	

			jest.clearAllMocks();

			jest.spyOn(props, 'handleChange');

			wrapper.find('.counter__ctrl.counter__ctrl--minus').simulate('click');

			expect(instance.state.value).toEqual(3);

			expect(props.handleChange).toHaveBeenCalled();	
		});

		it('should call the handleChange function with the correct parameters when the minus button is clicked', () => {	

			jest.clearAllMocks();

			jest.spyOn(props, 'handleChange');

			wrapper.find('.counter__ctrl.counter__ctrl--minus').simulate('click');

			expect(instance.state.value).toEqual(2);	

			expect(props.handleChange).toHaveBeenCalledWith(2);
		}); 

		it('should not call the handleChange function when the value is 1 and when the minus button is clicked', () => {	

			jest.clearAllMocks();

			jest.spyOn(props, 'handleChange');

			instance.state.value = 1;

			wrapper.find('.counter__ctrl.counter__ctrl--minus').simulate('click');

			expect(instance.state.value).toEqual(1);

			expect(props.handleChange).not.toHaveBeenCalled();	
		});
	});
});

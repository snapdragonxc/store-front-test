import React from 'react'
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ProductView from './ProductView'


Enzyme.configure({ adapter: new Adapter()});

const testProduct = {
  "title": "Blue Stripe Stoneware Plate",
  "brand": "Kiriko",
  "price": 40,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
  "image": "blue-stripe-stoneware-plate.jpg"
};

describe("Product View", () => {

  let props = {
     product: testProduct
  }

  const  wrapper = shallow(<ProductView {...props}/>);

  it('should contain the title', () => {
    expect(wrapper.find('.detail__title').text()).toEqual('Blue Stripe Stoneware Plate');
  });

  it('should contain the url', () => {
    expect(wrapper.find('.url__name').text()).toEqual('Blue Stripe Stoneware Plate');
  });

  it('should contain the brand', () => {
    expect(wrapper.find('.detail__brand').text()).toEqual('Kiriko');
  });

  it('should contain the price', () => {
    expect(wrapper.find('.detail__price').text()).toEqual('$40.00');
  });

  it('should contain the description', () => {
    expect(wrapper.find('.detail__description').text()).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.');
  });

});



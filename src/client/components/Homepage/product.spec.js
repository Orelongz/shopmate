/* eslint no-undef: "off" */
import React from 'react';
import Product from './Product';

let props;
const setup = () => {
  props = {
    addToCart: jest.fn(() => Promise.resolve()),
    removeFromCart: jest.fn(() => Promise.resolve()),
    product: {},
    productsInCart: [],
    cart: [],
  };
  return shallow(<Product {...props} />);
};

describe('Product component', () => {
  it('should render the Reviews container successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('Link').length).to.eql(1);
    expect(wrapper.find('p').length).to.eql(2);
    expect(wrapper.find('button').length).to.eql(1);
    expect(wrapper.find('img').length).to.eql(1);
  });

  it('should expect handle click to be called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const handleClick = jest.spyOn(wrapper.instance(), 'handleClick');
    action.handleClick();
    jestExpect(handleClick).toBeCalled();
  });
});

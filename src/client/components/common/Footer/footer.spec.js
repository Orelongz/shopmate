/* eslint no-undef: "off" */
import React from 'react';
import Footer from './Footer';

const setup = () => shallow(<Footer />);

describe('Footer component', () => {
  it('should render the Footer component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('footer').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(5);
    expect(wrapper.find('ul').length).to.eql(3);
  });
});

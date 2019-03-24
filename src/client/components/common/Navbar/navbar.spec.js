/* eslint no-undef: "off" */
import React from 'react';
import connectedNavBar, { NavBar } from './NavBar';

let props;
const setup = () => {
  props = {
    email: 'drew@mail.com',
    name: 'Drew Leeds',
    search: 'some string',
    cart: [],
    logout: jest.fn(() => Promise.resolve()),
    setSearch: jest.fn(() => Promise.resolve()),
  };
  return shallow(<NavBar {...props} />);
};

let props2;
const setup2 = () => {
  props2 = {
    search: 'some string',
    cart: [],
    logout: jest.fn(() => Promise.resolve()),
    setSearch: jest.fn(() => Promise.resolve()),
  };
  return shallow(<NavBar {...props2} />);
};

describe('NavBar component', () => {
  describe('unconnected NavBar component', () => {
    it('should render the NavBar component successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('nav').length).to.eql(1);
      expect(wrapper.find('Link').length).to.eql(2);
      expect(wrapper.find('li').length).to.eql(8);
    });

    it('should render the NavBar component successfully', () => {
      const wrapper = setup2();
      expect(wrapper.find('nav').length).to.eql(1);
      expect(wrapper.find('Link').length).to.eql(4);
      expect(wrapper.find('li').length).to.eql(8);
    });
  });

  describe('Connected NavBar component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        userReducer: { email: 'drew@mail.com' }
      });
      const wrapper = shallow(<connectedNavBar store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});

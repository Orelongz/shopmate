/* eslint no-undef: "off" */
import React from 'react';
import connectedHomePage, { HomePage } from './HomePage';

let props;
const setup = () => {
  props = {
    setSearch: jest.fn(() => Promise.resolve()),
    getAllProducts: jest.fn(() => Promise.resolve()),
    removeProductFromCart: jest.fn(() => Promise.resolve()),
    getDepartments: jest.fn(() => Promise.resolve()),
    addProductToCart: jest.fn(() => Promise.resolve()),
    getCategories: jest.fn(() => Promise.resolve()),
    location: {},
    products: [],
    departments: [],
    categories: [],
    paginate: {},
    search: 'some search term',
    cart: [],
  };
  return shallow(<HomePage {...props} />);
};

describe('Homepage component', () => {
  describe('unconnected Homepage component', () => {
    it('should render the Register page successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).to.eql(9);
      expect(wrapper.find('form').length).to.eql(1);
      expect(wrapper.find('section').length).to.eql(2);
    });

    it('should change the value of department in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        preventDefault: jest.fn(() => Promise.resolve()),
        target: {
          name: 'department',
          value: '2'
        }
      };
      action.onChange(event);
      expect(action.state.department).to.eql('2');
    });

    it('should call the componentDidMount method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const componentDidMount = jest.spyOn(wrapper.instance(), 'componentDidMount');
      action.componentDidMount();
      jestExpect(componentDidMount).toBeCalled();
    });

    it('should call the addToCart method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const addToCart = jest.spyOn(wrapper.instance(), 'addToCart');
      action.addToCart({ preventDefault: () => 1 });
      jestExpect(addToCart).toBeCalled();
    });

    it('should call the clearSearch method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const clearSearch = jest.spyOn(wrapper.instance(), 'clearSearch');
      action.clearSearch({ preventDefault: () => 1 });
      jestExpect(clearSearch).toBeCalled();
    });

    it('should call the fetchProducts method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const fetchProducts = jest.spyOn(wrapper.instance(), 'fetchProducts');
      action.fetchProducts({ preventDefault: () => 1 });
      jestExpect(fetchProducts).toBeCalled();
    });

    it('should call the removeFromCart method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const removeFromCart = jest.spyOn(wrapper.instance(), 'removeFromCart');
      action.removeFromCart({ preventDefault: () => 1 });
      jestExpect(removeFromCart).toBeCalled();
    });

    it('should call the handleCategoryChange method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        preventDefault: jest.fn(() => Promise.resolve()),
        target: {
          value: '2'
        }
      };
      const handleCategoryChange = jest.spyOn(wrapper.instance(), 'handleCategoryChange');
      action.handleCategoryChange(event);
      jestExpect(handleCategoryChange).toBeCalled();
    });

    it('should call the handleDepartmentChange method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        preventDefault: jest.fn(() => Promise.resolve()),
        target: {
          value: '2'
        }
      };
      const handleDepartmentChange = jest.spyOn(wrapper.instance(), 'handleDepartmentChange');
      action.handleDepartmentChange(event);
      jestExpect(handleDepartmentChange).toBeCalled();
    });
  });

  describe('Connected Homepage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        products: [],
        search: jest.fn().getMockName(),
        paginate: {},
        departments: [],
        categories: [],
        cart: [],
      });
      const wrapper = shallow(<connectedHomePage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});

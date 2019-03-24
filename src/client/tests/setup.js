import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

const props = {
  history: {
    push: jest.fn()
  }
};

// Make Enzyme functions available in all test files without importing
global.props = props;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.jestExpect = global.expect;
global.expect = expect;
global.moxios = moxios;
global.mockStore = mockStore;

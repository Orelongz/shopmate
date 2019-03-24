import { combineReducers } from 'redux';
import userReducer from './user';
import productReducer from './product';
import loadingReducer from './loading';
import departmentReducer from './department';
import categoryReducer from './category';
import shippingReducer from './shipping';
import cartReducer from './cart';
import orderReducer from './order';

export default combineReducers({
  userReducer,
  productReducer,
  loadingReducer,
  departmentReducer,
  categoryReducer,
  cartReducer,
  shippingReducer,
  orderReducer,
});

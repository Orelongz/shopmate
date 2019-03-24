import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import 'rc-pagination/assets/index.css';
import App from './components/App';
import store from './store';
import { onPageLoad } from './services';

onPageLoad(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

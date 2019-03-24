import React, { Component, Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import jwt from 'jsonwebtoken';
import './CartPage.scss';
import {
  updateProductInCart,
  removeProductFromCart,
  clearProductsFromCart,
} from '../../actions/cart';
import { getShippingTypes } from '../../actions/shipping';
import { checkout } from '../../actions/order';
import Cart from './Cart';

const propTypes = {
  removeProductFromCart: PropTypes.func.isRequired,
  getShippingTypes: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
  clearProductsFromCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.string.isRequired,
  shipping: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  email: PropTypes.string.isRequired,
  checkedOut: PropTypes.bool.isRequired,
};

export class CartPage extends Component {
  constructor() {
    super();
    this.state = {
      shippingId: 1,
    };
    this.onToken = this.onToken.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    const { getShippingTypes } = this.props;
    getShippingTypes();
  }

  onChange(event) {
    this.setState({
      [event.target.name]: Number(event.target.value)
    });
  }

  onToken(token) {
    const {
      checkout, email, shipping, totalPrice
    } = this.props;
    const { shippingId } = this.state;
    const { cartId, shopmateToken: jwtToken } = localStorage;
    const taxId = 2; // hard coding for no tax
    const { payload } = jwt.decode(jwtToken, { complete: true });
    const customerId = payload.id;
    const shippingPrice = shipping.find(ship => ship.shipping_id === shippingId).shipping_cost;
    const amount = (Number(totalPrice) + Number(shippingPrice)).toFixed(2) * 100;
    checkout({
      cartId, customerId, shippingId, taxId, token, email, amount
    });
  }

  removeProduct(itemId) {
    const { removeProductFromCart } = this.props;
    removeProductFromCart(itemId);
  }

  updateCart(itemId, quantity) {
    const { updateProductInCart } = this.props;
    updateProductInCart({ itemId, quantity });
  }


  render() {
    const {
      cart, totalPrice, clearProductsFromCart,
      shipping, email, checkedOut,
    } = this.props;
    const { shippingId } = this.state;
    let shippingPrice;
    if (shipping.length > 0) {
      shippingPrice = shipping.find(ship => ship.shipping_id === shippingId).shipping_cost;
    }
    const grandTotal = (Number(totalPrice) + Number(shippingPrice)).toFixed(2);

    return (
      <Fragment>
        <h2 className="text-center mt-50">Cart page</h2>
        {
          checkedOut && !totalPrice
          && (
            <div className="container text-center">
              <p style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>
                Thank you for ordering on shopmate.
                Your order has been recorded and is currently been processed
              </p>
            </div>
          )
        }
        {
          totalPrice > 0
            ? (
              <Fragment>
                <table className="container text-center">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    cart.map(product => (
                      <tr key={shortId.generate()}>
                        <Cart
                          product={product}
                          updateCart={this.updateCart}
                          removeProduct={this.removeProduct}
                        />
                      </tr>
                    ))
                    }
                  </tbody>
                </table>

                <div className="container d-flex space-between mt-50">
                  <div>
                    <p>
                      Total:
                      {totalPrice}
                    </p>
                  </div>
                  <div>
                    <p>Choose shipping type</p>
                    <select name="shippingId" id="shippingId" onChange={this.onChange} value={shippingId}>
                      {
                        shipping.map(eachShippingType => (
                          <option key={shortId.generate()} value={eachShippingType.shipping_id}>
                            {eachShippingType.shipping_type}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <p>
                      Grand Total:
                      {grandTotal}
                    </p>
                  </div>

                  <button className="clear-cart" type="button" onClick={clearProductsFromCart}>Clear Cart</button>

                  <div>
                    <StripeCheckout
                      name="Shopmate"
                      stripeKey="pk_test_r3aQRWlHCHsVxvIYWCSvQ4wk00DB8DgFOK"
                      token={this.onToken}
                      amount={grandTotal * 100}
                      email={email}
                    />
                  </div>
                </div>
              </Fragment>
            )
            : (
              <div className="container text-center">
                <i className="far fa-folder-open fa-10x grey-icon"></i>
                <p style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>
                  You presently do not have anything in your cart
                </p>
              </div>
            )
        }
      </Fragment>
    );
  }
}

CartPage.propTypes = propTypes;

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  totalPrice: state.cartReducer.totalPrice,
  shipping: state.shippingReducer.shipping,
  email: state.userReducer.email,
  checkedOut: state.orderReducer.checkedOut,
});

export default connect(mapStateToProps, {
  updateProductInCart,
  removeProductFromCart,
  clearProductsFromCart,
  getShippingTypes,
  checkout,
})(CartPage);

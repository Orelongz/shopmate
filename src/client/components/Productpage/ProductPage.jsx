import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ProductPage.scss';
import { getProduct } from '../../actions/product';
import {
  addProductToCart,
  removeProductFromCart,
} from '../../actions/cart';

const images = require.context('../../product_images', true);

const propTypes = {
  removeProductFromCart: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  product: PropTypes.shape({}).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
};

export class ProductPage extends Component {
  constructor() {
    super();
    this.state = {};
    this.addToCart = this.addToCart.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    const { getProduct, match } = this.props;
    const { id } = match.params;
    getProduct(id);
  }

  handleClick() {
    const { product, cart } = this.props;
    const productsInCart = cart.map(eachProduct => eachProduct.name);

    if (productsInCart.includes(product.name)) {
      return this.removeFromCart();
    }
    return this.addToCart();
  }

  addToCart() {
    const { cartId } = localStorage;
    const { addProductToCart, product } = this.props;
    const productId = product.product_id;
    addProductToCart({ productId, cartId });
  }

  removeFromCart() {
    const { removeProductFromCart, cart, product } = this.props;
    const item = cart.find(eachProduct => eachProduct.name === product.name);
    removeProductFromCart(item.item_id);
  }

  render() {
    const { product, cart } = this.props;
    const imgUrl = product.image && images(`./${product.image}`);
    const imgUrl2 = product.image && images(`./${product.image_2}`);
    const productsInCart = cart.map(eachProduct => eachProduct.name);
    const label = productsInCart.includes(product.name) ? 'Remove from Cart' : 'Add to Cart';

    return (
      <div className="product-page">
        <div className="container">
          <div className="product-image-container">
            <img src={imgUrl2} alt="" className="product-image" />
            <img src={imgUrl} alt="" className="product-image" />
          </div>
          <div className="product-details">
            <p>
              <b>Price: </b>
              <s>{product.discounted_price}</s>
              /
              <b>{product.price}</b>
            </p>
            <p>
              <b>Name: </b>
              {product.name}
            </p>
            <p>
              <b>Description: </b>
              {product.description}
            </p>
            <button className="add-to-cart" type="button" onClick={this.handleClick}>
              {label}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProductPage.propTypes = propTypes;

const mapStateToProps = state => ({
  product: state.productReducer.product,
  cart: state.cartReducer.cart,
});

export default connect(mapStateToProps, {
  getProduct,
  addProductToCart,
  removeProductFromCart,
})(ProductPage);

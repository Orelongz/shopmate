import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const images = require.context('../../product_images', true);
const propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  product: PropTypes.shape({}).isRequired,
  productsInCart: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
};

class Product extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      addToCart, product, productsInCart,
      cart, removeFromCart
    } = this.props;

    if (productsInCart.includes(product.name)) {
      const item = cart.find(eachProduct => eachProduct.name === product.name);
      return removeFromCart(item.item_id);
    }
    return addToCart(product.product_id);
  }

  render() {
    const { product, productsInCart } = this.props;
    const imgUrl = images(`./${product.thumbnail}`);
    const label = productsInCart.includes(product.name) ? 'Remove from Cart' : 'Add to Cart';

    return (
      <Fragment>
        <Link to={`/products/${product.product_id}`} className="overflow">
          <img className="product-image" src={imgUrl} alt="product" />
          <p>{product.name}</p>
          <p>
            <s>{product.price}</s>
            &#47;
            <b>{product.discounted_price}</b>
          </p>
        </Link>
        <button type="button" onClick={this.handleClick} className="add-to-cart text-center">
          {label}
        </button>
      </Fragment>
    );
  }
}

Product.propTypes = propTypes;

export default Product;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  product: PropTypes.shape({}).isRequired,
  updateCart: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

class Cart extends Component {
  constructor() {
    super();
    this.reduceAmount = this.reduceAmount.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  handleUpdateCart(itemId, quantity) {
    const { updateCart } = this.props;
    updateCart(itemId, quantity);
  }

  reduceAmount() {
    const { product } = this.props;
    const { item_id: itemId, quantity } = product;
    this.handleUpdateCart(itemId, (quantity - 1));
  }

  increaseAmount() {
    const { product } = this.props;
    const { item_id: itemId, quantity } = product;
    this.handleUpdateCart(itemId, (quantity + 1));
  }

  handleRemoveProduct() {
    const { product, removeProduct } = this.props;
    const { item_id: itemId } = product;
    removeProduct(itemId);
  }

  render() {
    const { product } = this.props;
    return (
      <Fragment>
        <td>
          <span>{product.name}</span>
        </td>
        <td>{product.price}</td>
        <td>
          <button onClick={this.reduceAmount} type="button"> - </button>
          {product.quantity}
          <button onClick={this.increaseAmount} type="button"> + </button>
        </td>
        <td>{product.subtotal}</td>
        <td>
          <button type="button" onClick={this.handleRemoveProduct}>
            <i className="far fa-trash-alt"></i>
          </button>
        </td>
      </Fragment>
    );
  }
}

Cart.propTypes = propTypes;

export default Cart;

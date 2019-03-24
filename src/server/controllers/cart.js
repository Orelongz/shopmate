import { sequelize } from '../models';
import {
  handleValidation,
  handleErrorMessage
} from '../services';

const addToCart = async (req, res) => {
  try {
    const { productId, cartId, attribute } = req.body;

    const validationFailed = handleValidation(res, { cartId, productId });
    if (validationFailed) return validationFailed;

    const inAttribute = attribute || JSON.stringify({ size: 'M', color: 'Black' });

    await sequelize
      .query(`CALL shopping_cart_add_product('${cartId}', ${productId}, '${inAttribute}')`);

    const cart = await sequelize
      .query(`CALL shopping_cart_get_products('${cartId}')`);

    let totalPrice = await sequelize
      .query(`CALL shopping_cart_get_total_amount('${cartId}')`);

    totalPrice = totalPrice[0].total_amount;

    return res.status(200).json({
      cart,
      totalPrice
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await sequelize
      .query(`CALL shopping_cart_get_products('${cartId}')`);

    let totalPrice = await sequelize
      .query(`CALL shopping_cart_get_total_amount('${cartId}')`);

    totalPrice = totalPrice[0].total_amount || '0';

    return res.status(200).json({
      cart,
      totalPrice
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const { cartId } = req.params;

    await sequelize
      .query(`CALL shopping_cart_update('${itemId}', ${quantity})`);

    let totalPrice = await sequelize
      .query(`CALL shopping_cart_get_total_amount('${cartId}')`);

    const cart = await sequelize
      .query(`CALL shopping_cart_get_products('${cartId}')`);

    totalPrice = totalPrice[0].total_amount || '0';

    return res.status(200).json({
      cart,
      totalPrice
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    await sequelize
      .query(`CALL shopping_cart_remove_product(${itemId})`);

    const cart = await sequelize
      .query(`CALL shopping_cart_get_products('${cartId}')`);

    let totalPrice = await sequelize
      .query(`CALL shopping_cart_get_total_amount('${cartId}')`);

    totalPrice = totalPrice[0].total_amount || '0';

    return res.status(200).json({
      cart,
      totalPrice
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

const clearProductsFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    await sequelize
      .query(`CALL shopping_cart_empty('${cartId}')`);

    return res.status(200).json({
      cart: [],
      totalPrice: '0'
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearProductsFromCart,
};

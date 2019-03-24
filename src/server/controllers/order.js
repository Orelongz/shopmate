import { sequelize } from '../models';
import orderConfirmation from '../services/mails';
import { handleValidation, handleErrorMessage } from '../services';

const stripe = require('stripe')('sk_test_D811HJ90LCn2o3KelspFOMyu00rtUuXjwt');

const createOrder = async (req, res) => {
  try {
    const {
      cartId, customerId, shippingId,
      taxId, token, amount, email
    } = req.body;

    const validationFailed = handleValidation(res, {
      cartId, customerId, shippingId, taxId
    });
    if (validationFailed) return validationFailed;

    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: token.id,
      receipt_email: email
    });

    const customer = await sequelize.query(`CALL customer_get_customer(${customerId})`);

    // a better way would be to send using background jobs
    orderConfirmation(customer[0]);

    await sequelize
      .query(
        `CALL shopping_cart_create_order(
        '${cartId}', ${customerId}, ${shippingId}, ${taxId}, '${charge.id}')`
      );

    return res.status(201).json({ checkedOut: true });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export default createOrder;

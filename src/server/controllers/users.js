import { sequelize } from '../models';
import {
  encrypt,
  decrypt,
  handleValidation,
  handleErrorMessage,
} from '../services';
import { generateToken } from '../services/authToken';

const signup = async (req, res) => {
  const {
    name, email, password
  } = req.body;

  const validationFailed = handleValidation(res, {
    name, email, password
  });
  if (validationFailed) return validationFailed;

  try {
    const hashedPassword = encrypt(password);
    const signup = await sequelize
      .query(`CALL customer_add('${name}', '${email}', '${hashedPassword}')`);

    const id = signup[0]['LAST_INSERT_ID()'];
    const token = generateToken({ id, email });

    return res.status(201).json({
      customer: {
        name, email, token
      }
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password: inputPassword } = req.body;

    const validationFailed = handleValidation(res, { email, inputPassword });
    if (validationFailed) return validationFailed;

    const info = await sequelize
      .query(`CALL customer_get_login_info('${email}')`);

    const customer = await sequelize
      .query(`CALL customer_get_customer(${info[0].customer_id})`);

    const { name, password, customer_id: id } = customer[0];
    const unhashedPassword = decrypt(password);

    if (unhashedPassword !== inputPassword) throw Error();

    const token = generateToken({ id, email });
    return res.status(200).json({
      customer: {
        name, email, token
      }
    });
  } catch (error) {
    return res.status(400).json({ error: 'Wrong email or password' });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.decoded;
    const customer = await sequelize
      .query(`CALL customer_get_customer(${id})`);

    const { name, email } = customer[0];
    return res.status(200).json({
      customer: { name, email }
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export {
  login,
  signup,
  getUserDetails,
};

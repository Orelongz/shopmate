import { sequelize } from '../models';
import { handleErrorMessage } from '../services';

const allShippingType = async (req, res) => {
  try {
    const shipping = await sequelize
      .query('SELECT * FROM shipping', { type: sequelize.QueryTypes.SELECT });

    return res.status(200).json({ shipping });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export default allShippingType;

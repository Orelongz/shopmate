import { Op } from 'sequelize';
import { db, sequelize } from '../models';
import { handleErrorMessage } from '../services';

const { product } = db;

const fetchAllProducts = (req, res) => {
  const { search } = req.query;
  const limit = 12;
  const page = req.query.page || 1;
  const offset = limit * (page - 1);
  const currentPage = Math.floor(offset / limit) + 1;
  let dbQuery = {};

  if (search) {
    dbQuery = {
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ]
      }
    };
  }

  product.findAndCountAll({ ...dbQuery, limit, offset })
    .then(data => res.status(200).json({
      products: data.rows,
      paginate: {
        count: data.count,
        currentPage,
        limit
      }
    }))
    .catch(error => res.json({ error }));
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await sequelize
      .query(`CALL catalog_get_product_details(${id})`);

    return res.json({ product: product[0] });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export {
  fetchAllProducts,
  getProduct,
};

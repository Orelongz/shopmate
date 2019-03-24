import { sequelize } from '../models';
import { handleErrorMessage } from '../services';

const fetchCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await sequelize
      .query(`CALL catalog_get_department_categories(${id})`);

    return res.json({ categories });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

const fetchCategoryProducts = async (req, res, next) => {
  try {
    const { category: id } = req.query;

    if (!id) return next();

    const limit = 12;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);
    const currentPage = Math.floor(offset / limit) + 1;

    const products = await sequelize
      .query(`CALL catalog_get_products_in_category(${id}, 255, ${limit}, ${offset})`);
    const countObj = await sequelize
      .query(`CALL catalog_count_products_in_category(${id})`);
    const category = await sequelize
      .query(`CALL catalog_get_category_details(${id})`);

    return res.status(200).json({
      products,
      description: category[0].description,
      paginate: {
        count: countObj[0].categories_count,
        limit,
        currentPage
      }
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export {
  fetchCategories,
  fetchCategoryProducts
};

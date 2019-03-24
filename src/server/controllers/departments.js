import { sequelize } from '../models';
import { handleErrorMessage } from '../services';

const fetchDepartments = async (req, res) => {
  try {
    const departments = await sequelize
      .query('CALL catalog_get_departments()');

    return res.json({ departments });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};


const fetchDepartmentProducts = async (req, res, next) => {
  try {
    const { department: id } = req.query;

    if (!id) return next();

    const limit = 12;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);
    const currentPage = Math.floor(offset / limit) + 1;

    const products = await sequelize
      .query(`CALL catalog_get_products_on_department(${id}, 255, ${limit}, ${offset})`);
    const count = await sequelize
      .query(`CALL catalog_count_products_on_department(${id})`);
    const department = await sequelize
      .query(`CALL catalog_get_department_details(${id})`);

    return res.status(200).json({
      products,
      description: department[0].description,
      paginate: {
        count: count[0].products_on_department_count,
        limit,
        currentPage
      }
    });
  } catch (error) {
    return handleErrorMessage(res, error);
  }
};

export {
  fetchDepartments,
  fetchDepartmentProducts,
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import './HomePage.scss';
import { getAllProducts, setSearch } from '../../actions/product';
import { getDepartments } from '../../actions/department';
import { getCategories } from '../../actions/category';
import { addProductToCart, removeProductFromCart } from '../../actions/cart';
import Paginate from '../../utils/paginate';
import Product from './Product';

const propTypes = {
  setSearch: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  departments: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  paginate: PropTypes.shape({}).isRequired,
  search: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
};

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      department: 0,
      category: 0
    };
    this.onChange = this.onChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
    const { getDepartments } = this.props;
    getDepartments();
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props;
    if (prevProps.search !== search) {
      this.fetchProducts();
    }
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  onPageChange(page) {
    this.setState(prevState => (
      { ...prevState, page }
    ), () => this.fetchProducts());
  }

  handleDepartmentChange(event) {
    this.onChange(event);
    const { value: department } = event.target;
    const { getCategories } = this.props;
    getCategories(event.target.value);

    this.setState(prevState => (
      {
        ...prevState, department, category: 0, page: 1
      }
    ), () => {
      this.fetchProducts();
    });
  }

  handleCategoryChange(event) {
    const { value: category } = event.target;

    this.setState(prevState => (
      { ...prevState, category, page: 1 }
    ), () => {
      this.fetchProducts();
    });
  }

  fetchProducts() {
    const { page, department, category } = this.state;
    const { location, getAllProducts, search } = this.props;
    let query = `page=${page}`;
    if (search) query += `&search=${search}`;
    if (category) {
      query += `&category=${category}`;
    } else if (department) {
      query += `&department=${department}`;
    }

    if (location.search) query = `${location.search.slice(1)}`;
    getAllProducts(query);
  }

  addToCart(productId) {
    const { cartId } = localStorage;
    const { addProductToCart } = this.props;
    addProductToCart({ productId, cartId });
  }

  removeFromCart(itemId) {
    const { removeProductFromCart } = this.props;
    removeProductFromCart(itemId);
  }

  clearSearch(event) {
    event.preventDefault();

    const { setSearch } = this.props;
    setSearch('');
    this.setState(prevState => (
      { ...prevState, category: 0, department: 0 }
    ), () => {
      this.fetchProducts();
    });
  }

  render() {
    const {
      products, departments, categories,
      paginate, search, cart,
    } = this.props;
    const { currentPage, count, limit } = paginate;
    const { department, category } = this.state;
    const productsInCart = cart.map(eachProduct => eachProduct.name);

    return (
      <div className="home">
        <section className="header">
          <div className="desc">
            <div className="desc-text">
              <span>Shopmate</span>
              Taking the lead for ecommerce fineness
            </div>
            <div className="view-cart">
              <Link to="/cart">View Cart</Link>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="product-listing-container">
            <div className="container">
              {
                products && products.length
                  ? (
                    <div className="d-flex products-contatiner">
                      <div className="filter">
                        <h2>Filter</h2>
                        <div>
                          <h3>By department</h3>
                          <select onChange={this.handleDepartmentChange} name="department" value={department}>
                            <option value="0" disabled>Choose department</option>
                            {
                              departments.map(department => (
                                <option
                                  value={department.department_id}
                                  key={shortId.generate()}
                                >
                                  {department.name}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                        { categories.length
                          ? (
                            <div>
                              <h3>By category</h3>
                              <select onChange={this.handleCategoryChange} name="category" value={category}>
                                <option value="0" disabled>Choose category</option>
                                {
                                categories.map(category => (
                                  <option
                                    value={category.category_id}
                                    key={shortId.generate()}
                                  >
                                    {category.name}
                                  </option>
                                ))
                                }
                              </select>
                            </div>
                          ) : ''
                        }
                        {
                          (search || category > 0 || department > 0) && <button type="button" onClick={this.clearSearch} className="reset-filter">Clear</button>
                        }
                      </div>
                      <div className="products-listing">
                        {
                          products.map(product => (
                            <div className="product" key={shortId.generate()}>
                              <Product
                                cart={cart}
                                product={product}
                                addToCart={this.addToCart}
                                productsInCart={productsInCart}
                                removeFromCart={this.removeFromCart}
                              />
                            </div>
                          ))
                        }
                        {
                          count > limit
                            ? (
                              <div className="d-flex justify-center">
                                <div>
                                  <Paginate
                                    count={count}
                                    pageSize={limit}
                                    current={currentPage}
                                    onChange={this.onPageChange}
                                  />
                                </div>
                              </div>
                            ) : ''
                        }
                      </div>
                    </div>
                  )
                  : (
                    <div className="text-center">
                      <i className="far fa-images fa-10x grey-icon" />
                      <p style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>
                        There are currently no products to be displayed
                      </p>
                    </div>
                  )
              }
            </div>
          </div>
          <div className="discount">
            <div className="container discount-content">
              <h3>10% discount on subscription</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus harum iure maiores a veniam. Sed minus dolore architecto
                consequuntur rem illum nostrum veritatis distinctio, ipsam quaerat a,
                dicta fugit voluptates?
              </p>
              <form className="subscription-form">
                <input type="text" placeholder="Enter your email address" />
                <input type="submit" className="subscribe" value="Subscribe" />
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = propTypes;

const mapStateToProps = state => ({
  products: state.productReducer.products,
  search: state.productReducer.search,
  paginate: state.productReducer.paginate,
  departments: state.departmentReducer.departments,
  categories: state.categoryReducer.categories,
  cart: state.cartReducer.cart,
});

export default connect(mapStateToProps, {
  setSearch,
  getCategories,
  getAllProducts,
  getDepartments,
  addProductToCart,
  removeProductFromCart,
})(HomePage);

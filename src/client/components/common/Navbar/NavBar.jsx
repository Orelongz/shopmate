import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { logout } from '../../../actions/auth';
import { setSearch } from '../../../actions/product';

const propTypes = {
  logout: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  name: PropTypes.string.isRequired,
};

export class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();

    const { search } = this.state;
    const { setSearch } = this.props;
    if (search.length >= 2) setSearch(search);
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { name, cart, logout } = this.props;
    const cartCount = cart.length;

    return (
      <nav className="navbar" role="navigation">
        <ul className="container d-flex">
          <li>Women</li>
          <li>Men</li>
          <li>Kids</li>
          <li id="brand">
            <Link to="/">Shopmate</Link>
          </li>
          <li>
            <form id="search-form" onSubmit={this.handleSearch}>
              <input
                placeholder="Search"
                id="search"
                name="search"
                value={search}
                onChange={this.onChange}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </li>
          <li id="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
              { cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </li>
          { name
            ? (
              <Fragment>
                <li>{name}</li>
                <li>
                  <button type="button" onClick={logout}>Log out</button>
                </li>
              </Fragment>
            )
            : (
              <Fragment>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </Fragment>
            )
          }
        </ul>
      </nav>
    );
  }
}

NavBar.propTypes = propTypes;

const mapStateToProps = state => ({
  email: state.userReducer.email,
  name: state.userReducer.name,
  search: state.productReducer.search,
  cart: state.cartReducer.cart
});

export default connect(mapStateToProps, {
  logout,
  setSearch
})(NavBar);

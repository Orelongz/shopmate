import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup, login } from '../../actions/auth';
import { validate } from '../../services';
import Login from '../Forms/Login';
import Signup from '../Forms/Signup';
import './Auth.scss';

const propTypes = {
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  // isRequestLoading: PropTypes.bool.isRequired,
  // serverError: PropTypes.string,
  // userId: PropTypes.string
};

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      showing: 'login'
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const toShow = location.pathname === '/login' ? 'login' : 'signup';
    this.setState({ showing: toShow });
  }

  componentWillReceiveProps(previous) {
    const { location } = this.props;
    if (previous.location.pathname !== location.pathname) {
      this.toggleFormDisplay();
    }
  }

  onChange(event) {
    return this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const { login } = this.props;
    const errors = validate({ email, password });
    if (Object.keys(errors).length === 0) {
      return login({ email, password }, this.props);
    }
    return this.setState({ errors });
  }

  handleSignup(event) {
    event.preventDefault();
    const {
      name, email, password, confirmPassword
    } = this.state;
    const { signup } = this.props;
    const errors = validate({
      name, email, password, confirmPassword
    });
    if (Object.keys(errors).length === 0) {
      return signup({ name, email, password }, this.props);
    }
    return this.setState({ errors });
  }

  toggleFormDisplay() {
    const { showing } = this.state;
    const newShow = showing === 'login' ? 'signup' : 'login';
    this.setState({
      name: '',
      email: '',
      password: '',
      showing: newShow,
      confirmPassword: '',
    });
  }

  render() {
    const {
      name, email, password, confirmPassword, showing,
      errors,
    } = this.state;
    const { isLoading } = this.props;
    const text = showing === 'login' ? 'Signup' : 'Login';
    const url = showing === 'login' ? '/signup' : '/login';

    return (
      <div>
        {
          showing === 'login'
            ? (
              <Login
                email={email}
                errors={errors}
                password={password}
                isLoading={isLoading}
                onChange={this.onChange}
                handleLogin={this.handleLogin}
              />
            )
            : (
              <Signup
                name={name}
                email={email}
                errors={errors}
                password={password}
                isLoading={isLoading}
                onChange={this.onChange}
                handleSignup={this.handleSignup}
                confirmPassword={confirmPassword}
              />
            )
        }
        <div>
          <Link to={url}>
            {text}
          </Link>
        </div>
      </div>
    );
  }
}

Auth.propTypes = propTypes;

const mapStateToProps = state => ({
  isLoading: state.loadingReducer.requestLoading,
});

export default connect(mapStateToProps, {
  signup, login
})(Auth);

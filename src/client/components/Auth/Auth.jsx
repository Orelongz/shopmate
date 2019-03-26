import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  serverError: PropTypes.string.isRequired,
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
    const { isLoading, serverError } = this.props;
    const text = showing === 'login' ? 'Signup' : 'Login';
    const url = showing === 'login' ? '/signup' : '/login';

    return (
      <div className="auth">
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
                newRoute={text}
                url={url}
                serverError={serverError}
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
                newRoute={text}
                url={url}
                serverError={serverError}
              />
            )
        }
      </div>
    );
  }
}

Auth.propTypes = propTypes;

const mapStateToProps = state => ({
  isLoading: state.loadingReducer.requestLoading,
  serverError: state.userReducer.error,
});

export default connect(mapStateToProps, {
  signup, login
})(Auth);

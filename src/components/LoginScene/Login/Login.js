import React, { Component } from 'react'
import './Login.css'
import { loginUser } from '../../../actions/auth/loginActions';

class Login extends Component {

  state = {
    email: '',
    password: '',
    hasEmailError: false,
    hasPasswordError: false
  }

  loginSubmit = (e) => {
    e.preventDefault();
    this.setState({
      hasEmailError: !this.validateEmail(this.state.email),
      hasPasswordError: !this.validatePassword(this.state.password)
    });

    if (this.validateForm()) {
      this.props.dispatch(loginUser({ email: this.state.email, password: this.state.password }));
    }
  }

  onEmailChange = (e) => {
    const value = e.target.value;
    const hasEmailError = !this.validateEmail(value);
    this.setState({ email: e.target.value, hasEmailError })
  }

  onPasswordChange = (e) => {
    const value = e.target.value;
    const hasPasswordError = !this.validatePassword(value);
    this.setState({ password: value, hasPasswordError })
  }

  validateEmail = (value) => {
    return value.includes('@');
  }

  validatePassword = (value) => {
    return value.length > 5;
  }

  validateForm = () => {
    if (!this.validateEmail(this.state.email)) return false;
    if (!this.validatePassword(this.state.password)) return false;

    return true;
  }

  render() {
    const renderError = (errorMessage, isVisible) => {
      if (isVisible) {
        return (
          <div className="col-md-3">
            <div className="form-control-feedback">
              <span className="text-danger align-middle">
                <i className="fa fa-close"></i> {errorMessage}</span>
            </div>
          </div>
        )
      }
      return (null);
    }

    return (
      <div className="container login">
        <form className="form-horizontal" noValidate={true} onSubmit={this.loginSubmit}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h2>Please Login</h2>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="form-group has-danger">
                <label className="sr-only" htmlFor="email">E-Mail Address</label>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div className="input-group-addon login__email-addon"><span className="oi oi-person"></span></div>
                  <input type="text" name="email" id="email" className="form-control" placeholder="you@example.com" required
                    value={this.state.email} onChange={this.onEmailChange} autoFocus={true} />
                </div>
              </div>
            </div>
            {renderError('Email is invalid', this.state.hasEmailError)}
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div className="input-group-addon login__password-addon"><span className="oi oi-key"></span></div>
                  <input type="password" name="password" id="password" className="form-control" placeholder="Password" required
                    value={this.state.password} onChange={this.onPasswordChange} />
                </div>
              </div>
            </div>
            {renderError('Password is weak', this.state.hasPasswordError)}
          </div>
          <div className="row form-group">
            <div className="offset-md-3 col-md-6">
              <button type="submit" className="btn btn-success"><span className="oi oi-account-login"></span> Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login

import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class Private extends Component {
  renderComponent = props => {
    const { component: Component, isAuthenticated } = this.props;
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: LOGIN_ROUTE,
          state: { from: props.location }
        }}
      />
    );
  };

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return <Route {...rest} render={this.renderComponent} />;
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return {
    isAuthenticated
  };
};

const PrivateRoute = connect(mapStateToProps)(Private);
export default PrivateRoute;

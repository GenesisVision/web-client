import AppLayout from "components/app-layout/app-layout";
import { LOGIN_ROUTE } from "pages/login/login.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class AppRoute extends Component {
  renderComponent = props => {
    const { component: Component, isAuthenticated } = this.props;
    return isAuthenticated ? (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    ) : (
      <Redirect
        to={{ pathname: LOGIN_ROUTE, state: { from: props.location } }}
      />
    );
  };

  render() {
    const { component, isAuthenticated, ...rest } = this.props;
    return <Route {...rest} render={this.renderComponent} />;
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return {
    isAuthenticated
  };
};

const AppPrivateRoute = connect(mapStateToProps)(AppRoute);
export default AppPrivateRoute;

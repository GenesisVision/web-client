import React from "react";
import { connect } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const Authenticated = ({ component: Component, isAuthenticated, ...props }) => {
  return isAuthenticated ? <Component {...props} /> : null;
};

const AuthenticatedContainer = connect(state => ({
  isAuthenticated: isAuthenticatedSelector(state)
}))(Authenticated);

const isAuthenticated = Component => props => {
  return <AuthenticatedContainer component={Component} {...props} />;
};

export const withAuthenticated = Component => {
  return connect(state => ({
    isAuthenticated: isAuthenticatedSelector(state)
  }))(Component);
};

export default isAuthenticated;

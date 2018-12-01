import React from "react";
import { connect } from "react-redux";

const Authenticated = ({ component: Component, isAuthenticated, ...props }) => {
  return isAuthenticated ? <Component {...props} /> : null;
};

const AuthenticatedContainer = connect(state => ({
  isAuthenticated: state.authData.isAuthenticated
}))(Authenticated);

const isAuthenticated = Component => props => (
  <AuthenticatedContainer component={Component} {...props} />
);

export default isAuthenticated;

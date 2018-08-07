import React, { Component } from "react";
import { connect } from "react-redux";

const Authenticated = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated && <Component />;
};

const AuthenticatedContainer = connect(state => ({
  isAuthenticated: state.authData.isAuthenticated
}))(Authenticated);

const isAuthenticated = Component => {
  return () => {
    return <AuthenticatedContainer component={Component} />;
  };
};

export default isAuthenticated;

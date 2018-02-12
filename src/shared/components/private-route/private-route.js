import { Redirect, Route } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return {
    isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);

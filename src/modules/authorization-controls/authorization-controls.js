import React from "react";
import { connect } from "react-redux";
import loginService from "../../modules/login/service/login-service";
import Button from "../../components/button/button";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";

const SignOut = ({ onClick, ...props }) => (
  <Button label="Sign Out" secondary onClick={onClick} {...props} />
);

const SignIn = props => (
  <Button label="Sign In" secondary href={LOGIN_ROUTE} {...props} />
);

const AuthorizationControls = ({ isAuthenticated, signOut, ...props }) => {
  return isAuthenticated ? (
    <SignOut onClick={signOut} {...props} />
  ) : (
    <SignIn {...props} />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authData.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(loginService.logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthorizationControls
);

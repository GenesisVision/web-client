import React from "react";
import { connect } from "react-redux";
import loginService from "../../modules/login/service/login-service";
import Button from "../../components/button/button";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";

const SignOut = ({ onClick }) => (
  <Button label="Sign Out" secondary onClick={onClick} />
);

const SignIn = () => <Button label="Sign In" secondary href={LOGIN_ROUTE} />;

const AuthorizationControls = ({ isAuthenticated, signOut }) => {
  return (
    <ul className="navbar-nav flex-row">
      <li className="nav-item text-nowrap">
        {isAuthenticated ? <SignOut onClick={signOut} /> : <SignIn />}
      </li>
    </ul>
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

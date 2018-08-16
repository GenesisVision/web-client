import { GVButton } from "gv-react-components";
import { LOGIN_ROUTE } from "pages/login/login.routes";
import { REGISTER_ROUTE } from "pages/signup/signup.routes";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AuthorizationControls = ({ isAuthenticated, className = "" }) => {
  return (
    isAuthenticated || (
      <div className={className}>
        <Link to={LOGIN_ROUTE}>
          <GVButton variant="outlined" color="secondary">
            Login
          </GVButton>
        </Link>
        <Link to={REGISTER_ROUTE}>
          <GVButton variant="contained" color="primary">
            Sign up
          </GVButton>
        </Link>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authData.isAuthenticated
});

const AuthorizationControlsContainer = connect(mapStateToProps)(
  AuthorizationControls
);

export default AuthorizationControlsContainer;

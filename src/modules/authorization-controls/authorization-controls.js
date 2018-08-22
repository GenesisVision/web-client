import { GVButton } from "gv-react-components";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

const AuthorizationControls = ({ t, isAuthenticated, className = "" }) => {
  return (
    isAuthenticated || (
      <div className={className}>
        <Link to={LOGIN_ROUTE}>
          <GVButton variant="outlined" color="secondary">
            {t("login-page.login.title")}
          </GVButton>
        </Link>
        <Link to={SIGNUP_ROUTE}>
          <GVButton variant="contained" color="primary">
            {t("login-page.signup.title")}
          </GVButton>
        </Link>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authData.isAuthenticated
});

const AuthorizationControlsContainer = compose(
  translate(),
  connect(mapStateToProps)
)(AuthorizationControls);

export default AuthorizationControlsContainer;

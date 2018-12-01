import "shared/components/auth/login/login/login.scss";

import { HOME_ROUTE } from "pages/app/app.routes";
import React from "react";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import LoginFormContainer from "shared/components/auth/login/login/login-form-container";
import * as loginService from "../services/login.service";

const LoginPage = ({ location }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  return (
    <div className="login">
      <AuthTabs />
      <LoginFormContainer from={from} loginService={loginService} />
    </div>
  );
};

export default LoginPage;

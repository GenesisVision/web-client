import "shared/components/auth/login/login/login.scss";

import React from "react";
import LoginFormContainer from "shared/components/auth/login/login/login-form-container";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import { MANAGER } from "shared/constants/constants";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";

const LoginPage = ({ location }) => {
  const from = location.state || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} />
      <LoginFormContainer
        from={from}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
        role={MANAGER}
      />
    </div>
  );
};

export default LoginPage;

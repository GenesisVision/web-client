import "./login.scss";

import AuthTabs from "components/auth-tabs/auth-tabs";
import LoginContainer from "modules/login/components/login/login-container";
import React from "react";
import { translate } from "react-i18next";
import { HOME_ROUTE } from "routes/root.routes";

const LoginPage = ({ t, location }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  return (
    <div className="login">
      <div className="login__header">
        <h1 className="login__heading">{t("auth.login.title")}</h1>
        <AuthTabs />
      </div>
      <LoginContainer from={from} />
    </div>
  );
};

export default translate()(LoginPage);

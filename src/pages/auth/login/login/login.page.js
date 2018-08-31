import "./login.scss";

import { HOME_ROUTE } from "pages/app/app.routes";
import React from "react";
import { translate } from "react-i18next";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import LoginFormContainer from "./components/login-form-container";

const LoginPage = ({ t, location }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  return (
    <div className="login">
      <div className="login__header">
        <h1 className="login__heading">{t("auth.login.title")}</h1>
        <AuthTabs />
      </div>
      <LoginFormContainer from={from} />
    </div>
  );
};

export default translate()(LoginPage);

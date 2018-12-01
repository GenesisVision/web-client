import "./login.scss";

import { HOME_ROUTE } from "pages/app/app.routes";
import React from "react";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import LoginFormContainer from "./components/login-form-container";

const LoginPage = ({ location }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  return (
    <div className="login">
      <AuthTabs />
      <LoginFormContainer from={from} />
    </div>
  );
};

export default LoginPage;

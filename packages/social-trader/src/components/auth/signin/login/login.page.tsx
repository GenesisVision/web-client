import "./login.scss";

import React from "react";

import SignInContainer from "../signin.container";
import LoginForm from "./login-form";

const _LoginPage: React.FC<Props> = ({ redirectFrom }) => (
  <SignInContainer
    redirectFrom={redirectFrom}
    className="login"
    renderForm={(handle, email, errorMessage) => (
      <LoginForm onSubmit={handle} error={errorMessage} />
    )}
  />
);

interface Props {
  redirectFrom: string;
}

const LoginPage = React.memo(_LoginPage);
export default LoginPage;

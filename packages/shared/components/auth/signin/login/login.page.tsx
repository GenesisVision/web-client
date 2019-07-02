import "./login.scss";

import * as React from "react";

import SignInContainer from "../signin.container";
import LoginForm from "./login-form";

const _LoginPage: React.FC = () => (
  <SignInContainer
    className="login"
    renderForm={(handle, email, errorMessage) => (
      <LoginForm onSubmit={handle} error={errorMessage} />
    )}
  />
);

const LoginPage = React.memo(_LoginPage);
export default LoginPage;

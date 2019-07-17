import "./login.scss";

import { LocationState } from "history";
import * as React from "react";

import SignInContainer from "../signin.container";
import LoginForm from "./login-form";

const _LoginPage: React.FC<LocationProps> = ({ redirectFrom }) => (
  <SignInContainer
    redirectFrom={redirectFrom}
    className="login"
    renderForm={(handle, email, errorMessage) => (
      <LoginForm onSubmit={handle} error={errorMessage} />
    )}
  />
);

interface LocationProps {
  redirectFrom: string;
}

const LoginPage = React.memo(_LoginPage);
export default LoginPage;

import "./login.scss";

import { LocationState } from "history";
import * as React from "react";

import SignInContainer from "../signin.container";
import LoginForm from "./login-form";

const _LoginPage: React.FC<LocationProps> = ({ location }) => (
  <SignInContainer
    location={location}
    className="login"
    renderForm={(handle, email, errorMessage) => (
      <LoginForm onSubmit={handle} error={errorMessage} />
    )}
  />
);

interface LocationProps {
  location: LocationState;
}

const LoginPage = React.memo(_LoginPage);
export default LoginPage;

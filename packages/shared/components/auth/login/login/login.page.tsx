import "shared/components/auth/login/login/login.scss";

import { LocationState } from "history";
import * as React from "react";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import CaptchaContainer from "shared/components/auth/login/captcha-container";
import LoginForm from "shared/components/auth/login/login/login-form";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

const LoginPage: React.FC<Props> = ({ location }) => {
  const from = (location.state && location.state.pathname) || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} />
      <CaptchaContainer
        from={from}
        renderForm={(handle, errorMessage) => (
          <LoginForm onSubmit={handle} error={errorMessage} />
        )}
      />
    </div>
  );
};

interface Props {
  location: LocationState;
}

export default React.memo(LoginPage);

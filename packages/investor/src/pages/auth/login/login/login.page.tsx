import "shared/components/auth/login/login/login.scss";

import * as React from "react";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { ROLE } from "shared/constants/constants";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { LocationState } from "history";
import CaptchaContainer from "shared/components/auth/login/captcha-container";
import LoginForm from "shared/components/auth/login/login/login-form";

const LoginPage: React.FC<Props> = ({ location }) => {
  const from = (location.state && location.state.pathname) || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} role={ROLE.INVESTOR} />
      <CaptchaContainer
        from={from}
        role={ROLE.INVESTOR}
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

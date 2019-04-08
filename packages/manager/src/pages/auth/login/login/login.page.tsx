import "shared/components/auth/login/login/login.scss";

import * as React from "react";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import { ROLE } from "shared/constants/constants";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { LocationState } from "history";
import LoginForm from "shared/components/auth/login/login/login-form";
import CaptchaContainer from "shared/components/auth/login/captcha-container";

const LoginPage: React.FC<Props> = ({ location }) => {
  const from = location.state || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} role={ROLE.MANAGER} />
      <CaptchaContainer
        from={from}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
        role={ROLE.MANAGER}
        renderForm={(handle, errorMessage, FORGOT_PASSWORD_ROUTE) => (
          <LoginForm
            onSubmit={handle}
            error={errorMessage}
            FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE!}
          />
        )}
      />
    </div>
  );
};

interface Props {
  location: LocationState;
}

export default React.memo(LoginPage);

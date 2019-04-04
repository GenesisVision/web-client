import "shared/components/auth/login/login/login.scss";

import * as React from "react";
import LoginFormContainer from "shared/components/auth/login/login/login-form-container";

import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import { ROLE } from "shared/constants/constants";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { LocationState } from "history";

const LoginPage: React.FC<Props> = ({ location }) => {
  const from = location.state || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} role={ROLE.INVESTOR} />
      <LoginFormContainer
        from={from}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
        role={ROLE.INVESTOR}
      />
    </div>
  );
};

interface Props {
  location: LocationState;
}

export default React.memo(LoginPage);

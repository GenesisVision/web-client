import "shared/components/auth/login/login/login.scss";

import * as React from "react";
import LoginFormContainer from "shared/components/auth/login/login/login-form-container";

import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import { ROLE } from "shared/constants/constants";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { LocationState } from "history";
import LoginContainer from "shared/components/auth/login/login-container";
import {
  login,
  SetSubmittingFuncType
} from "shared/components/auth/login/login.service";
import LoginForm from "shared/components/auth/login/login/login-form";

const LoginPage: React.FC<Props> = ({ location }) => {
  const from = location.state || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} role={ROLE.INVESTOR} />
      <LoginContainer
        from={from}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
        role={ROLE.INVESTOR}
        requestFunc={login}
        renderForm={(
          handle: (
            loginFormData: Object,
            setSubmitting: SetSubmittingFuncType
          ) => void,
          errorMessage: string,
          FORGOT_PASSWORD_ROUTE: string
        ) => (
          <LoginForm
            onSubmit={handle}
            error={errorMessage}
            FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
          />
        )}
      />
      {/*<LoginFormContainer
        from={from}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
        role={ROLE.INVESTOR}
      />*/}
    </div>
  );
};

interface Props {
  location: LocationState;
}

export default React.memo(LoginPage);

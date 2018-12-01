import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import qs from "qs";
import React from "react";
import { translate } from "react-i18next";

import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import EmailConfirmContainer from "shared/components/auth/email-confirm/email-confirm-container";
import { HOME_ROUTE } from "pages/app/app.routes";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import * as emailConfirmService from "./service/email-confirm.service";

export const EMAIL_CONFIRM_ROUTE = `/email-confirm`;

const EmailConfirmPage = ({ t, location }) => {
  const queryParams = qs.parse(location.search.slice(1));

  return (
    <AuthLayout
      title={t("auth.email-confirm.title")}
      Footer={SignUpFooter}
      HOME_ROUTE={HOME_ROUTE}
      LOGIN_ROUTE={LOGIN_ROUTE}
    >
      <div className="email-confirm-page">
        <EmailConfirmContainer
          queryParams={queryParams}
          emailConfirmService={emailConfirmService}
        />
      </div>
    </AuthLayout>
  );
};

export default translate()(EmailConfirmPage);

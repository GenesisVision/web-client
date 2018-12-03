import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import qs from "qs";
import React from "react";
import { translate } from "react-i18next";

import AuthLayout from "../components/auth-layout/auth-layout";
import EmailConfirmContainer from "./components/email-confirm-container";

export const EMAIL_CONFIRM_ROUTE = `/email-confirm`;

const EmailConfirmPage = ({ t, location }) => {
  const queryParams = qs.parse(location.search.slice(1));

  return (
    <AuthLayout title={t("auth.email-confirm.title")} Footer={SignUpFooter}>
      <div className="email-confirm-page">
        <EmailConfirmContainer queryParams={queryParams} />
      </div>
    </AuthLayout>
  );
};

export default translate()(EmailConfirmPage);

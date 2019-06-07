import qs from "qs";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import EmailConfirmContainer from "shared/components/auth/email-confirm/email-confirm-container";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";

export const EMAIL_CONFIRM_ROUTE = `/email-confirm`;

const _EmailConfirmPage: React.FC<Props> = ({ t, location }) => (
  <AuthLayout
    title={t("auth.email-confirm.title")}
    Footer={SignUpFooter}
    LOGIN_ROUTE={LOGIN_ROUTE}
  >
    <div className="email-confirm-page">
      <EmailConfirmContainer queryParams={qs.parse(location.search.slice(1))} />
    </div>
  </AuthLayout>
);

interface Props extends InjectedTranslateProps {
  location: Location;
}

const EmailConfirmPage = translate()(React.memo(_EmailConfirmPage));
export default EmailConfirmPage;

import AuthLayout from "components/auth/components/auth-layout/auth-layout";
import SignUpFooter from "components/auth/components/signup-footer/signup-footer";
import EmailConfirmContainer from "components/auth/email-confirm/email-confirm-container";
import qs from "qs";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { LOGIN_ROUTE } from "routes/app.routes";

export const EMAIL_CONFIRM_ROUTE = `/email-confirm`;

const _EmailConfirmPage: React.FC<Props> = ({ t, location }) => (
  <AuthLayout
    quoteNo={0}
    titleKey={t("auth.email-confirm.title")}
    Footer={SignUpFooter}
    footerAuthRoute={LOGIN_ROUTE}
  >
    <div className="email-confirm-page">
      <EmailConfirmContainer queryParams={qs.parse(location.search.slice(1))} />
    </div>
  </AuthLayout>
);

interface Props extends WithTranslation {
  location: Location;
}

const EmailConfirmPage = translate()(React.memo(_EmailConfirmPage));
export default EmailConfirmPage;

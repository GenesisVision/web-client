import { NextPage } from "next";
import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import RecoveryPage from "shared/components/auth/signin/recovery/recovery.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const RecoveryCodes: NextPage<Props> = ({ redirectFrom }) => {
  return <RecoveryPage redirectFrom={redirectFrom} />;
};

RecoveryCodes.getInitialProps = async () => {
  return {
    redirectFrom: HOME_ROUTE
  };
};

interface Props {
  redirectFrom: string;
}

export default withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(RecoveryCodes);

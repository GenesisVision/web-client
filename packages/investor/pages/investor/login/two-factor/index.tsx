import { NextPage } from "next";
import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import TwoFactorPage from "shared/components/auth/signin/two-factor/two-factor.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const Login2FA: NextPage<Props> = ({ redirectFrom }) => {
  return <TwoFactorPage redirectFrom={redirectFrom} />;
};

Login2FA.getInitialProps = async () => {
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
})(Login2FA);

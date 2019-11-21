import LoginFooter from "components/auth/components/login-footer/login-footer";
import TwoFactorPage from "components/auth/signin/two-factor/two-factor.page";
import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import React from "react";
import { HOME_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

const Page: NextPage<Props> = ({ redirectFrom }) => {
  return <TwoFactorPage redirectFrom={redirectFrom} />;
};

Page.getInitialProps = async () => {
  return {
    redirectFrom: HOME_ROUTE
  };
};

interface Props {
  redirectFrom: string;
}

export const Login2FA = withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(Page);

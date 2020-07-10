import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import RecoveryPage from "pages/auth/signin/recovery/recovery.page";
import React from "react";
import { HOME_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

const Page: NextPage<Props> = ({ redirectFrom }) => {
  return <RecoveryPage redirectFrom={redirectFrom} />;
};

Page.getInitialProps = async () => {
  return {
    namespacesRequired: ["auth"],
    redirectFrom: HOME_ROUTE
  };
};

interface Props {
  redirectFrom: string;
}

export default withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth:login.title"
})(Page);

import useHistoryContext from "decorators/history-provider/use-history-context";
import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import TwoFactorPage from "pages/auth/signin/two-factor/two-factor.page";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";

const Page: NextPage = () => {
  const { from } = useHistoryContext();
  return <TwoFactorPage redirectFrom={from || OVERVIEW_ROUTE} />;
};

export default withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(Page);

import LoginFooter from "components/auth/components/login-footer/login-footer";
import LoginPage from "components/auth/signin/login/login.page";
import useHistoryContext from "decorators/history-provider/use-history-context";
import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";

const Page: NextPage = () => {
  const { from } = useHistoryContext();
  return <LoginPage redirectFrom={from || OVERVIEW_ROUTE} />;
};

export default withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(Page);

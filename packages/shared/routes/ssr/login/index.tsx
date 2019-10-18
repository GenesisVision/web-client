import { NextPage } from "next";
import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import LoginPage from "shared/components/auth/signin/login/login.page";
import useHistoryContext from "shared/decorators/history-provider/use-history-context";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { HOME_ROUTE, SIGNUP_ROUTE } from "shared/routes/app.routes";

const Page: NextPage = () => {
  const { from } = useHistoryContext();
  return <LoginPage redirectFrom={from || HOME_ROUTE} />;
};

export const Login = withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(Page);

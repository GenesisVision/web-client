import useHistoryContext from "decorators/history-provider/use-history-context";
import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { NextPage } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import TwoFactorPage from "pages/auth/signin/two-factor/two-factor.page";
import React from "react";
import { compose } from "redux";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import { initializeStore } from "store";

const Page: NextPage = () => {
  const { from } = useHistoryContext();
  return <TwoFactorPage redirectFrom={from || OVERVIEW_ROUTE} />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["auth"]
});

export default compose(
  withReduxStore(initializeStore),
  withAuthLayout({
    footerAuthRoute: SIGNUP_ROUTE,
    Footer: LoginFooter,
    titleKey: "auth:login.title"
  })
)(Page);

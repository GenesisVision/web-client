import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import LoginPage from "pages/auth/signin/login/login.page";
import React from "react";
import { compose } from "redux";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import { initializeStore } from "store";

const Page: NextPage = () => {
  const { query } = useRouter();
  return <LoginPage redirectFrom={(query.from as string) || OVERVIEW_ROUTE} />;
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

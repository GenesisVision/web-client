import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { NextPage } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import ForgotPasswordPage from "pages/auth/forgot-password/forgot-password/forgot-password.page";
import React from "react";
import { compose } from "redux";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { initializeStore } from "store";

const Page: NextPage = () => {
  return <ForgotPasswordPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["auth"]
});

export default compose(
  withReduxStore(initializeStore),
  withAuthLayout({
    titleKey: "auth:password-restore.title",
    footerAuthRoute: SIGNUP_ROUTE,
    Footer: LoginFooter
  })
)(Page);

import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import ForgotPasswordPage from "pages/auth/forgot-password/forgot-password/forgot-password.page";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";

const Page: NextPage = () => {
  return <ForgotPasswordPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["auth"]
});

export default withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);

import LoginFooter from "components/auth/components/login-footer/login-footer";
import ForgotPasswordPage from "components/auth/forgot-password/forgot-password/forgot-password.page";
import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";

const Page: NextPage = () => {
  return <ForgotPasswordPage />;
};

export default withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);

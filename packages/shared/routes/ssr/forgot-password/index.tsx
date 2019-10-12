import { NextPage } from "next";
import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import ForgotPasswordPage from "shared/components/auth/forgot-password/forgot-password/forgot-password.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { SIGNUP_ROUTE } from "shared/routes/app.routes";

const Page: NextPage = () => {
  return <ForgotPasswordPage />;
};

export const ForgotPassword = withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);

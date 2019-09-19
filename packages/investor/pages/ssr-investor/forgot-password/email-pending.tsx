import { NextPage } from "next";
import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import EmailPendingPage from "shared/components/auth/forgot-password/email-pending/email-pending.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { SIGNUP_ROUTE } from "shared/routes/app.routes";

const EmailPending: NextPage = () => {
  return <EmailPendingPage />;
};

export default withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(EmailPending);

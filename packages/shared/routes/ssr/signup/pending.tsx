import { NextPage } from "next";
import React from "react";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import EmailPending from "shared/components/auth/signup/signup-email-pending/signup-email-pending.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

const Page: NextPage = () => {
  return <EmailPending />;
};

export const SignUpPending = withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);

import LoginFooter from "components/auth/components/login-footer/login-footer";
import EmailPendingPage from "components/auth/forgot-password/email-pending/email-pending.page";
import withAuthLayout from "decorators/with-auth-layout";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { redirect } from "routes/redirect.helper";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <EmailPendingPage />;
};

Page.getInitialProps = async ctx => {
  const { email } = ctx.reduxStore.getState().emailPending;
  redirect(ctx, email.length === 0);
};

export const EmailPending = withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);

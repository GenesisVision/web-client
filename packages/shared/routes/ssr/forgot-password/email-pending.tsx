import React from "react";
import LoginFooter from "shared/components/auth/components/login-footer/login-footer";
import EmailPendingPage from "shared/components/auth/forgot-password/email-pending/email-pending.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { SIGNUP_ROUTE } from "shared/routes/app.routes";
import { redirect } from "shared/routes/redirect.helper";
import { NextPageWithRedux } from "shared/utils/types";

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

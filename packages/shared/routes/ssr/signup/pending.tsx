import React from "react";
import SignUpFooter from "shared/components/auth/components/signup-footer/signup-footer";
import EmailPending from "shared/components/auth/signup/signup-email-pending/signup-email-pending.page";
import withAuthLayout from "shared/decorators/with-auth-layout";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { redirect } from "shared/routes/redirect.helper";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <EmailPending />;
};

Page.getInitialProps = async ctx => {
  const { email } = ctx.reduxStore.getState().emailPending;
  redirect(ctx, email.length === 0);
};

export const SignUpPending = withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);

import withAuthLayout from "decorators/with-auth-layout";
import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import EmailPending from "pages/auth/signup/signup-email-pending/signup-email-pending.page";
import React from "react";
import { LOGIN_ROUTE } from "routes/app.routes";
import { redirect } from "routes/redirect.helper";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <EmailPending />;
};

Page.getInitialProps = async ctx => {
  const { email } = ctx.reduxStore.getState().emailPending;
  redirect(ctx, email.length === 0);
};

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);

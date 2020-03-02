import withAuthLayout from "decorators/with-auth-layout";
import { useEmailPendingState } from "pages/auth/auth.service";
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getEmailPendingState } = useEmailPendingState(ctx);
  const { email } = getEmailPendingState();
  redirect(ctx, email.length === 0);
};

export default withAuthLayout({
  footerAuthRoute: LOGIN_ROUTE,
  Footer: SignUpFooter,
  titleKey: "auth.signup.title"
})(Page);
